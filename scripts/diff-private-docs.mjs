// docs:diff-private — local-only plaintext review of encrypted docs.
//
// Decrypts the committed encrypted store into .private-review/ (GITIGNORED) so
// a reviewer can read/diff internal markdown locally. NEVER upload this folder
// anywhere (GitHub, Actions artifacts, PR comments).
//
// If docs/protected/ also has working plaintext, prints a unified diff
// (committed ciphertext -> current working copy) per changed file.

import fs from 'node:fs';
import path from 'node:path';
import {
  ENC_ROOT,
  MANIFEST_PATH,
  PLAINTEXT_DIR,
  REVIEW_DIR,
} from './lib/format.mjs';
import {deriveMasterKey, decryptString, decryptBuffer, fromB64} from './lib/crypto.mjs';
import {decryptManifest} from './lib/docs.mjs';
import {askPassword, getUsernameFromArgs} from './lib/prompt.mjs';

const fail = (msg) => {
  console.error(`\n✖ ${msg}`);
  process.exit(1);
};

// Minimal LCS-based unified-ish line diff (no deps).
function lineDiff(aStr, bStr) {
  const a = aStr.split('\n');
  const b = bStr.split('\n');
  const n = a.length;
  const m = b.length;
  const dp = Array.from({length: n + 1}, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--)
    for (let j = m - 1; j >= 0; j--)
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const out = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      out.push(`  ${a[i]}`);
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      out.push(`- ${a[i++]}`);
    } else {
      out.push(`+ ${b[j++]}`);
    }
  }
  while (i < n) out.push(`- ${a[i++]}`);
  while (j < m) out.push(`+ ${b[j++]}`);
  return out.join('\n');
}

async function main() {
  if (!fs.existsSync(MANIFEST_PATH)) fail('manifest.json missing.');
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));

  const username = getUsernameFromArgs();
  const password = await askPassword();
  const masterKey = deriveMasterKey(username, password, fromB64(manifest.kdf.salt));

  let entries;
  try {
    entries = decryptManifest(masterKey, {
      v: manifest.format,
      alg: manifest.cipher,
      info: manifest.body.info,
      salt: manifest.body.salt,
      iv: manifest.body.iv,
      ct: manifest.body.ct,
    });
  } catch {
    fail('Unable to unlock. Check the username/password.');
  }

  fs.rmSync(REVIEW_DIR, {recursive: true, force: true});
  let changed = 0;
  for (const entry of entries) {
    const env = JSON.parse(fs.readFileSync(path.join(ENC_ROOT, entry.file), 'utf8'));
    const outPath = path.join(REVIEW_DIR, entry.path);
    fs.mkdirSync(path.dirname(outPath), {recursive: true});

    // Images: decrypt to bytes, no text diff.
    if (entry.type === 'asset') {
      fs.writeFileSync(outPath, decryptBuffer(masterKey, env));
      continue;
    }

    const committed = decryptString(masterKey, env);
    fs.writeFileSync(outPath, committed);

    const workingPath = path.join(PLAINTEXT_DIR, entry.path);
    if (fs.existsSync(workingPath)) {
      const working = fs.readFileSync(workingPath, 'utf8');
      if (working !== committed) {
        changed++;
        console.log(`\n=== ${entry.path} ===`);
        console.log(lineDiff(committed, working));
      }
    }
  }

  console.log(
    `\n✔ Decrypted ${entries.length} doc(s) into ${path.relative(process.cwd(), REVIEW_DIR)}/ (gitignored).`,
  );
  if (fs.existsSync(PLAINTEXT_DIR)) {
    console.log(changed ? `  ${changed} file(s) differ from committed ciphertext.` : '  No working-copy changes.');
  }
  console.log('  ⚠ Never upload .private-review/ anywhere.');
}

main().catch((e) => fail(e.message || String(e)));

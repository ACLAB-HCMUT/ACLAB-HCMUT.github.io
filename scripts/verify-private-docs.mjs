// docs:verify — integrity check of the encrypted store.
//
// Without a password: structural checks (manifest parses, every referenced
// .enc exists with valid metadata, no orphan .enc files).
// With a password (prompted): full round-trip decryption of the manifest and
// every document. A wrong password reports a single generic failure.

import fs from 'node:fs';
import path from 'node:path';
import {ENC_ROOT, ENC_DOCS_DIR, MANIFEST_PATH} from './lib/format.mjs';
import {deriveMasterKey, decryptBuffer, isValidEnvelope, fromB64} from './lib/crypto.mjs';
import {decryptManifest} from './lib/docs.mjs';
import {askPassword, getUsernameFromArgs} from './lib/prompt.mjs';

const fail = (msg) => {
  console.error(`\n✖ ${msg}`);
  process.exit(1);
};

function allEncFiles() {
  if (!fs.existsSync(ENC_DOCS_DIR)) return [];
  return fs
    .readdirSync(ENC_DOCS_DIR, {recursive: true})
    .map(String)
    .filter((f) => f.endsWith('.enc'))
    .map((f) => `docs/${f.split(path.sep).join('/')}`);
}

async function main() {
  if (!fs.existsSync(MANIFEST_PATH)) fail('manifest.json missing.');
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));

  if (!manifest.kdf?.salt || !(manifest.kdf.iterations > 0) || !manifest.body?.ct) {
    fail('manifest.json has invalid crypto metadata.');
  }

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
    fail('Unable to unlock manifest. Check the username/password.');
  }

  const referenced = new Set(entries.map((e) => e.file));
  let okCount = 0;

  // Every manifest entry: exists, valid envelope, decrypts.
  for (const entry of entries) {
    const encPath = path.join(ENC_ROOT, entry.file);
    if (!fs.existsSync(encPath)) fail(`Missing encrypted file: ${entry.file}`);
    const env = JSON.parse(fs.readFileSync(encPath, 'utf8'));
    if (!isValidEnvelope(env)) fail(`Invalid envelope metadata: ${entry.file}`);
    try {
      decryptBuffer(masterKey, env); // auth-checks docs and image assets alike
    } catch {
      fail(`Failed to decrypt: ${entry.file}`);
    }
    okCount++;
  }

  // Orphans: .enc on disk not referenced by the manifest.
  const orphans = allEncFiles().filter((f) => !referenced.has(f));
  if (orphans.length) {
    fail(`Orphan encrypted file(s) not in manifest:\n  ${orphans.join('\n  ')}`);
  }

  console.log(`✔ Verified ${okCount} document(s). Manifest, files, and metadata are consistent.`);
}

main().catch((e) => fail(e.message || String(e)));

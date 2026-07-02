// docs:decrypt — restore private plaintext locally for editing/preview.
//
// Reads the encrypted manifest + docs from static/protected/ and writes
// plaintext into docs/protected/ (GITIGNORED + excluded from the docs build).
// Password is prompted
// interactively and never stored/logged. A wrong password fails on the FIRST
// authenticated decrypt (the manifest) with a single generic error.

import fs from 'node:fs';
import path from 'node:path';
import {
  ENC_ROOT,
  MANIFEST_PATH,
  PLAINTEXT_DIR,
} from './lib/format.mjs';
import {deriveMasterKey, decryptString, fromB64} from './lib/crypto.mjs';
import {askPassword, getUsernameFromArgs} from './lib/prompt.mjs';
import {decryptManifest} from './lib/docs.mjs';

const fail = (msg) => {
  console.error(`\n✖ ${msg}`);
  process.exit(1);
};

async function main() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    fail('No encrypted docs found (static/protected/manifest.json missing).');
  }
  console.log('Internal docs are encrypted.\n');

  const username = getUsernameFromArgs();
  const password = await askPassword();

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const masterKey = deriveMasterKey(
    username,
    password,
    fromB64(manifest.kdf.salt),
  );

  console.log('Decrypting private documents...');
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
    fail('Unable to unlock. Check the username/password and try again.');
  }

  let count = 0;
  for (const entry of entries) {
    const encPath = path.join(ENC_ROOT, entry.file);
    if (!fs.existsSync(encPath)) {
      fail(`Missing encrypted file for "${entry.path}" (${entry.file}).`);
    }
    const env = JSON.parse(fs.readFileSync(encPath, 'utf8'));
    let plaintext;
    try {
      plaintext = decryptString(masterKey, env);
    } catch {
      fail(`Unable to decrypt "${entry.path}" — file may be corrupt.`);
    }
    const outPath = path.join(PLAINTEXT_DIR, entry.path);
    fs.mkdirSync(path.dirname(outPath), {recursive: true});
    fs.writeFileSync(outPath, plaintext);
    count++;
  }

  console.log(`\n✔ Private docs restored successfully (${count} file(s)).`);
  console.log(`  ${path.relative(process.cwd(), PLAINTEXT_DIR)}/  (gitignored)`);
  console.log('  Edit them, then run "npm run docs:encrypt" before committing.');
}

main().catch((e) => fail(e.message || String(e)));

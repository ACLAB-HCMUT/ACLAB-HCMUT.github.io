// docs:encrypt — encrypt private plaintext docs into committable ciphertext.
//
// Flow (safe by construction — plaintext is only removed after a verified
// round-trip of every file):
//   1. Detect all private plaintext files (docs/protected/**).
//   2. Encrypt each into a TEMP file, then verify it decrypts back exactly.
//   3. Atomically move temp -> static/protected/docs/<path>.enc.
//   4. Rebuild the encrypted manifest.
//   5. Remove orphan .enc files whose source no longer exists.
//   6. Remove the local plaintext files.
//   7. Run the plaintext check; print git status.
//
// Password is prompted interactively (and confirmed). Never stored/logged.

import fs from 'node:fs';
import path from 'node:path';
import {
  ENC_DOCS_DIR,
  ENC_ROOT,
  MANIFEST_PATH,
  PLAINTEXT_DIR,
  KDF,
  mimeFor,
} from './lib/format.mjs';
import {
  deriveMasterKey,
  newMasterSalt,
  encryptString,
  decryptString,
  encryptBuffer,
  decryptBuffer,
  b64,
} from './lib/crypto.mjs';
import {askPasswordConfirmed, getUsernameFromArgs} from './lib/prompt.mjs';
import {
  listPlaintextDocs,
  listPlaintextAssets,
  titleFor,
  encFileFor,
  buildManifestEnvelope,
  printGitStatus,
} from './lib/docs.mjs';
import {runChecks} from './lib/checks.mjs';

const fail = (msg) => {
  console.error(`\n✖ ${msg}`);
  process.exit(1);
};

async function main() {
  console.log('Checking private documentation changes...');
  const docs = listPlaintextDocs();
  const assets = listPlaintextAssets();
  if (docs.length === 0 && assets.length === 0) {
    fail(
      `No plaintext docs found in ${path.relative(process.cwd(), PLAINTEXT_DIR)}/.\n` +
        `  Run "npm run docs:decrypt" first, or add .md files there.`,
    );
  }
  console.log(
    `${docs.length} document(s) + ${assets.length} image(s) found.\n`,
  );

  const username = getUsernameFromArgs();
  const password = await askPasswordConfirmed();

  // Fresh master salt on every full re-encryption (password rotation friendly).
  const masterSalt = newMasterSalt();
  const masterKey = deriveMasterKey(username, password, masterSalt);

  fs.mkdirSync(ENC_DOCS_DIR, {recursive: true});

  console.log('\nEncrypting files...');
  const entries = [];
  const written = new Set();
  for (const rel of docs) {
    const raw = fs.readFileSync(path.join(PLAINTEXT_DIR, rel), 'utf8');
    const env = encryptString(masterKey, raw, rel);

    // Verify BEFORE touching the committed file.
    if (decryptString(masterKey, env) !== raw) {
      fail(`Verification failed for ${rel} — aborting, nothing was changed.`);
    }

    const encRel = encFileFor(rel);
    const outPath = path.join(ENC_DOCS_DIR, encRel);
    const tmpPath = `${outPath}.tmp`;
    fs.mkdirSync(path.dirname(outPath), {recursive: true});
    fs.writeFileSync(tmpPath, JSON.stringify(env));
    fs.renameSync(tmpPath, outPath); // atomic replace
    written.add(encRel);
    entries.push({
      type: 'doc',
      path: rel,
      title: titleFor(rel, raw),
      file: `docs/${encRel}`,
    });
  }

  // Encrypt private images as binary (round-trip verified before replacing).
  for (const rel of assets) {
    const raw = fs.readFileSync(path.join(PLAINTEXT_DIR, rel));
    const env = encryptBuffer(masterKey, raw, rel);
    if (!decryptBuffer(masterKey, env).equals(raw)) {
      fail(`Verification failed for ${rel} — aborting, nothing was changed.`);
    }
    const encRel = encFileFor(rel);
    const outPath = path.join(ENC_DOCS_DIR, encRel);
    const tmpPath = `${outPath}.tmp`;
    fs.mkdirSync(path.dirname(outPath), {recursive: true});
    fs.writeFileSync(tmpPath, JSON.stringify(env));
    fs.renameSync(tmpPath, outPath);
    written.add(encRel);
    entries.push({type: 'asset', path: rel, mime: mimeFor(rel), file: `docs/${encRel}`});
  }

  console.log('Verifying encrypted output...');
  // Rebuild manifest (also verified via round-trip).
  const manifestEnv = buildManifestEnvelope(masterKey, entries);
  const manifest = {
    format: manifestEnv.v,
    cipher: manifestEnv.alg,
    kdf: {name: KDF.name, hash: KDF.hash, iterations: KDF.iterations, salt: b64(masterSalt)},
    subkdf: manifestEnv.kdf,
    body: {info: manifestEnv.info, salt: manifestEnv.salt, iv: manifestEnv.iv, ct: manifestEnv.ct},
  };
  const tmpManifest = `${MANIFEST_PATH}.tmp`;
  fs.writeFileSync(tmpManifest, JSON.stringify(manifest, null, 2));
  fs.renameSync(tmpManifest, MANIFEST_PATH);

  // Remove orphan .enc files (source deleted since last encrypt).
  removeOrphans(ENC_DOCS_DIR, written);

  console.log('Removing local plaintext files...');
  fs.rmSync(PLAINTEXT_DIR, {recursive: true, force: true});

  // Final guard: ensure nothing plaintext is staged.
  const {ok, problems} = runChecks({requireManifest: true});
  if (!ok) {
    console.error('\n✖ Post-encrypt check found problems:');
    for (const p of problems) console.error(`  - ${p}`);
    process.exit(1);
  }

  console.log('\n✔ Encryption completed successfully.');
  console.log(
    `  ${docs.length} document(s) + ${assets.length} image(s) -> ${path.relative(process.cwd(), ENC_ROOT)}/`,
  );
  console.log('  Commit only the encrypted output:');
  console.log('    git add static/protected/ && git commit -m "docs: update internal docs"');
  printGitStatus();
}

function removeOrphans(dir, keep) {
  const walk = (d) => {
    if (!fs.existsSync(d)) return;
    for (const entry of fs.readdirSync(d, {withFileTypes: true})) {
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        if (fs.readdirSync(full).length === 0) fs.rmdirSync(full);
      } else if (entry.name.endsWith('.enc')) {
        const rel = path.relative(dir, full).split(path.sep).join('/');
        if (!keep.has(rel)) {
          fs.rmSync(full);
          console.log(`  removed orphan: docs/${rel}`);
        }
      }
    }
  };
  walk(dir);
}

main().catch((e) => fail(e.message || String(e)));

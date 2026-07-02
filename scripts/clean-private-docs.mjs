// docs:clean — remove all local plaintext private workspaces.
//
// Deletes the gitignored scratch dirs so no decrypted content lingers on disk.
// Encrypted output under static/protected/ is NOT touched.

import fs from 'node:fs';
import path from 'node:path';
import {ROOT, PLAINTEXT_DIR, REVIEW_DIR} from './lib/format.mjs';

const targets = [
  PLAINTEXT_DIR,
  REVIEW_DIR,
  path.join(ROOT, '.private-workspace'),
  path.join(ROOT, 'private-docs'),
];

let removed = 0;
for (const dir of targets) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, {recursive: true, force: true});
    console.log(`  removed ${path.relative(process.cwd(), dir)}/`);
    removed++;
  }
}

console.log(
  removed
    ? `\n✔ Cleaned ${removed} local plaintext workspace(s).`
    : '✔ Nothing to clean — no local plaintext present.',
);

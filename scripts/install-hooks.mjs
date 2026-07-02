// Wire git to use the repo's .githooks/ dir (dependency-free alternative to
// husky). Runs via the "prepare" npm lifecycle script on `npm install`.
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

try {
  // Only if we're inside a git work tree (skip in CI tarball installs).
  execFileSync('git', ['rev-parse', '--is-inside-work-tree'], {cwd: ROOT, stdio: 'ignore'});
  execFileSync('git', ['config', 'core.hooksPath', '.githooks'], {cwd: ROOT});
  // Best-effort executable bit (no-op on Windows).
  try {
    fs.chmodSync(path.join(ROOT, '.githooks', 'pre-commit'), 0o755);
  } catch {}
  console.log('✔ Git pre-commit hook installed (core.hooksPath=.githooks).');
} catch {
  // Not a git repo or git unavailable — nothing to do.
}

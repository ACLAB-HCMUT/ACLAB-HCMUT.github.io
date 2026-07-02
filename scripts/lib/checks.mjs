// Shared verification logic for docs:check and the pre-commit hook / post-encrypt guard.
// Pure detection — never decrypts, never needs a password.

import fs from 'node:fs';
import path from 'node:path';
import {
  ROOT,
  ENC_DOCS_DIR,
  MANIFEST_PATH,
  PLAINTEXT_DIR,
  PRIVATE_DIR_PATTERNS,
  SECRET_FILE_PATTERNS,
  PRIVATE_PLAINTEXT_EXT,
} from './format.mjs';
import {stagedFiles, toPosix} from './docs.mjs';

const BUILD_DIR = path.join(ROOT, 'build');

const inPrivateDir = (p) => PRIVATE_DIR_PATTERNS.some((d) => p.includes(d));
const isSecretFile = (p) => SECRET_FILE_PATTERNS.some((re) => re.test(p));
const isPrivateExt = (p) =>
  PRIVATE_PLAINTEXT_EXT.includes(path.extname(p).toLowerCase());

/**
 * @param {{requireManifest?: boolean}} opts
 * @returns {{ok: boolean, problems: string[]}}
 */
export function runChecks(opts = {}) {
  const problems = [];

  // 1. No private plaintext / secret files staged for commit.
  for (const f of stagedFiles()) {
    const p = toPosix(f);
    if (isSecretFile(p)) problems.push(`staged secret file: ${p}`);
    else if (inPrivateDir(p) && isPrivateExt(p))
      problems.push(`staged private plaintext: ${p}`);
  }

  // 2. No plaintext internal docs leaked into the build output. The private
  //    source lives under docs/protected/, which is excluded from the docs
  //    plugin — so build/docs/protected/ must not exist at all.
  const buildProtected = path.join(BUILD_DIR, 'docs', 'protected');
  if (fs.existsSync(buildProtected)) {
    problems.push(
      'build/docs/protected/ exists — private docs were rendered into the build output',
    );
  }

  // 3. No private search index shipped.
  for (const rel of ['build/search/private-index.json', 'build/protected/index.json']) {
    if (fs.existsSync(path.join(ROOT, rel)))
      problems.push(`private search index present: ${rel}`);
  }

  // 4. Encrypted manifest metadata is well-formed.
  if (fs.existsSync(MANIFEST_PATH)) {
    try {
      const m = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
      const okMeta =
        m.format >= 1 &&
        m.kdf &&
        typeof m.kdf.salt === 'string' &&
        m.kdf.iterations > 0 &&
        m.body &&
        typeof m.body.iv === 'string' &&
        typeof m.body.ct === 'string' &&
        typeof m.body.salt === 'string';
      if (!okMeta) problems.push('manifest.json has invalid/missing crypto metadata');
    } catch {
      problems.push('manifest.json is not valid JSON');
    }
  } else if (opts.requireManifest) {
    problems.push('manifest.json is missing');
  }

  // 5. No leftover plaintext workspace with committable content.
  //    (Informational — the dir is gitignored, but warn if non-empty.)
  if (fs.existsSync(PLAINTEXT_DIR) && !opts.allowPlaintextWorkspace) {
    const count = fs
      .readdirSync(PLAINTEXT_DIR, {recursive: true})
      .filter((f) => /\.mdx?$/i.test(String(f))).length;
    if (count > 0 && stagedFiles().some((f) => toPosix(f).includes('docs/protected/')))
      problems.push('docs/protected/ plaintext is staged');
  }

  return {ok: problems.length === 0, problems, encDocsDir: ENC_DOCS_DIR};
}

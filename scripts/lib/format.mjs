// Shared constants + path layout for the encrypted-docs system.
// Keep these in sync with src/lib/protectedCrypto.ts (browser side).

import path from 'node:path';
import {fileURLToPath} from 'node:url';

export const ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '..',
);

// Plaintext working directory (GITIGNORED — never committed; also EXCLUDED
// from the Docusaurus docs build so it is never rendered or indexed).
export const PLAINTEXT_DIR = path.join(ROOT, 'docs', 'protected');

// Encrypted output, served as static assets by Docusaurus at /protected/*.
export const ENC_ROOT = path.join(ROOT, 'static', 'protected');
export const ENC_DOCS_DIR = path.join(ENC_ROOT, 'docs');
export const MANIFEST_PATH = path.join(ENC_ROOT, 'manifest.json');

// Local review scratch (GITIGNORED).
export const REVIEW_DIR = path.join(ROOT, '.private-review');

// Encryption format. Bump `FORMAT_VERSION` for on-disk migrations.
export const FORMAT_VERSION = 3;
export const KDF = {name: 'PBKDF2', hash: 'SHA-256', iterations: 210000};
export const SUBKDF = {name: 'HKDF', hash: 'SHA-256'};
export const CIPHER = 'AES-256-GCM';
export const DEFAULT_USERNAME = 'aclab';

// File extensions treated as private plaintext (never committable as-is).
export const PRIVATE_PLAINTEXT_EXT = [
  '.md',
  '.mdx',
  '.pdf',
  '.docx',
  '.xlsx',
  '.kicad_sch',
  '.kicad_pcb',
  '.png',
  '.jpg',
  '.jpeg',
];

// Private/secret path fragments (POSIX-style) that must never be committed.
export const PRIVATE_DIR_PATTERNS = [
  'docs/protected/',
  '.private-workspace/',
  '.private-review/',
  'private-docs/',
];

export const SECRET_FILE_PATTERNS = [
  /\.key$/i,
  /\.agekey$/i,
  /\.secret$/i,
  /(^|\/)\.env$/i,
  /(^|\/)credentials\.json$/i,
];

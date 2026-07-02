// Shared helpers: recursive markdown discovery, front-matter parsing,
// manifest read/write, and git helpers used by the docs:* scripts.

import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {ROOT, PLAINTEXT_DIR} from './format.mjs';
import {encryptString, decryptString} from './crypto.mjs';

/** POSIX-style relative path from a base dir (stable across OSes). */
export const toPosix = (p) => p.split(path.sep).join('/');

/** All *.md / *.mdx under PLAINTEXT_DIR, as POSIX paths relative to it. */
export function listPlaintextDocs() {
  if (!fs.existsSync(PLAINTEXT_DIR)) return [];
  const out = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.mdx?$/i.test(entry.name))
        out.push(toPosix(path.relative(PLAINTEXT_DIR, full)));
    }
  };
  walk(PLAINTEXT_DIR);
  return out.sort();
}

/** Split a leading `---\n...\n---` YAML-ish front matter block from body. */
export function splitFrontMatter(raw) {
  const m = raw.match(/^﻿?---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return {data: {}, body: raw};
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (kv) data[kv[1]] = kv[2].replace(/^["']|["']$/g, '').trim();
  }
  return {data, body: raw.slice(m[0].length)};
}

/** Human title for a doc: front-matter title → first `# ` → slug from path. */
export function titleFor(relPath, raw) {
  const {data, body} = splitFrontMatter(raw);
  if (data.title) return data.title;
  const h1 = body.match(/^\s*#\s+(.+)$/m);
  if (h1) return h1[1].trim();
  return relPath.replace(/\.mdx?$/i, '').split('/').pop();
}

/** The .enc filename for a doc (path preserved, made filesystem-flat-safe). */
export const encFileFor = (relPath) => `${relPath}.enc`;

// ---- manifest --------------------------------------------------------------

/** Encrypt the manifest (list of {path,title,file}) into an envelope. */
export function buildManifestEnvelope(masterKey, entries) {
  return encryptString(masterKey, JSON.stringify(entries), 'manifest');
}

export function decryptManifest(masterKey, env) {
  return JSON.parse(decryptString(masterKey, env));
}

// ---- git --------------------------------------------------------------------

function git(args) {
  return execFileSync('git', args, {cwd: ROOT, encoding: 'utf8'});
}

export function stagedFiles() {
  try {
    return git(['diff', '--cached', '--name-only', '--diff-filter=ACMR'])
      .split(/\r?\n/)
      .filter(Boolean);
  } catch {
    return [];
  }
}

export function trackedFiles() {
  try {
    return git(['ls-files']).split(/\r?\n/).filter(Boolean);
  } catch {
    return [];
  }
}

export function printGitStatus() {
  try {
    process.stdout.write('\n' + git(['status', '--short']) + '\n');
  } catch {
    /* not a git repo — ignore */
  }
}

// Authenticated encryption for private docs (Node side).
//
//   passphrase = "username:password"
//        │  PBKDF2-SHA256 (210k iters, random 16-byte master salt)
//        ▼
//   masterKey (256-bit)  ── cached; PBKDF2 runs ONCE per session
//        │  HKDF-SHA256 (random 16-byte per-file salt, info = file path)
//        ▼
//   perFileKey (256-bit)
//        │  AES-256-GCM (random 12-byte IV, 128-bit auth tag)
//        ▼
//   ciphertext (tag appended)
//
// Every file gets a UNIQUE salt and UNIQUE IV. The GCM tag authenticates the
// content: a wrong password (or tampered file) fails to decrypt and THROWS,
// which callers surface as a single generic error — never "wrong password"
// vs "corrupt file".
//
// Mirrors src/lib/protectedCrypto.ts (browser, Web Crypto). Keep them in sync.

import crypto from 'node:crypto';
import {KDF, SUBKDF, FORMAT_VERSION, CIPHER} from './format.mjs';

export const b64 = (buf) => Buffer.from(buf).toString('base64');
export const fromB64 = (s) => Buffer.from(s, 'base64');

/** Random master salt for PBKDF2 (16 bytes). */
export const newMasterSalt = () => crypto.randomBytes(16);

/** PBKDF2 master key from "username:password". Run once per session. */
export function deriveMasterKey(username, password, masterSalt) {
  return crypto.pbkdf2Sync(
    `${username}:${password}`,
    masterSalt,
    KDF.iterations,
    32,
    'sha256',
  );
}

/** HKDF per-file key bound to the file's logical path (info). */
function deriveFileKey(masterKey, fileSalt, info) {
  return Buffer.from(
    crypto.hkdfSync(
      'sha256',
      masterKey,
      fileSalt,
      Buffer.from(info, 'utf8'),
      32,
    ),
  );
}

/**
 * Encrypt arbitrary bytes (text OR binary, e.g. images). `info` binds the
 * ciphertext to a logical path so a file cannot be silently swapped for
 * another. Returns a self-describing envelope safe to commit.
 */
export function encryptBuffer(masterKey, buf, info) {
  const fileSalt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12);
  const key = deriveFileKey(masterKey, fileSalt, info);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const enc = Buffer.concat([cipher.update(buf), cipher.final()]);
  const tag = cipher.getAuthTag();
  return {
    v: FORMAT_VERSION,
    alg: CIPHER,
    kdf: SUBKDF.name,
    info,
    salt: b64(fileSalt),
    iv: b64(iv),
    ct: b64(Buffer.concat([enc, tag])), // tag appended (matches Web Crypto)
  };
}

/** Decrypt an envelope back to raw bytes. Throws on wrong key / tamper. */
export function decryptBuffer(masterKey, env) {
  const key = deriveFileKey(masterKey, fromB64(env.salt), env.info);
  const buf = fromB64(env.ct);
  const tag = buf.subarray(buf.length - 16);
  const data = buf.subarray(0, buf.length - 16);
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, fromB64(env.iv));
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(data), decipher.final()]);
}

/** Encrypt a UTF-8 string (thin wrapper over encryptBuffer). */
export function encryptString(masterKey, plaintext, info) {
  return encryptBuffer(masterKey, Buffer.from(plaintext, 'utf8'), info);
}

/** Decrypt an envelope back to a UTF-8 string. Throws on wrong key / tamper. */
export function decryptString(masterKey, env) {
  return decryptBuffer(masterKey, env).toString('utf8');
}

/** Structural sanity check for an envelope (no decryption). */
export function isValidEnvelope(env) {
  return (
    env &&
    typeof env === 'object' &&
    env.v === FORMAT_VERSION &&
    env.alg === CIPHER &&
    typeof env.salt === 'string' &&
    typeof env.iv === 'string' &&
    typeof env.ct === 'string' &&
    typeof env.info === 'string'
  );
}

// Client-side decryption for private docs (Web Crypto). Runs only in browser.
//
// Mirrors scripts/lib/crypto.mjs exactly:
//   passphrase "username:password"
//     -> PBKDF2-SHA256 (210k, master salt)  -> masterKey (once)
//     -> HKDF-SHA256 (per-file salt, info=path) -> per-file AES-256-GCM key
//     -> AES-256-GCM decrypt (per-file IV, 128-bit tag)
//
// AES-GCM is authenticated: a wrong password or tampered file causes
// decrypt() to REJECT. Callers must surface a single generic error and never
// distinguish "wrong password" from "corrupt file".

export type EncEnvelope = {
  v: number;
  alg: string;
  info: string;
  salt: string; // base64 per-file HKDF salt
  iv: string; // base64 96-bit GCM IV
  ct: string; // base64 ciphertext || 128-bit tag
};

export type Manifest = {
  format: number;
  cipher: string;
  kdf: {name: string; hash: string; iterations: number; salt: string};
  subkdf: {name: string; hash: string} | string;
  body: EncEnvelope | {info: string; salt: string; iv: string; ct: string};
};

export type ManifestEntry = {
  type?: 'doc' | 'asset';
  path: string;
  title?: string;
  file: string;
  mime?: string;
};

function b64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

/**
 * PBKDF2 master key material as an HKDF key. Derive once, keep in memory.
 *
 * NOTE: we must PBKDF2 -> deriveBits -> importKey('HKDF'). Deriving an HKDF
 * CryptoKey directly with PBKDF2 `deriveKey` fails in Web Crypto ("length
 * cannot be null"), because HKDF keys have no intrinsic length. This mirrors
 * Node's pbkdf2Sync (32 raw bytes) used as HKDF IKM in scripts/lib/crypto.mjs.
 */
export async function deriveMasterKey(
  username: string,
  password: string,
  kdf: Manifest['kdf'],
): Promise<CryptoKey> {
  const base = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(`${username}:${password}`),
    'PBKDF2',
    false,
    ['deriveBits'],
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: b64ToBytes(kdf.salt) as BufferSource,
      iterations: kdf.iterations,
      hash: kdf.hash,
    },
    base,
    256,
  );
  return crypto.subtle.importKey('raw', bits, 'HKDF', false, ['deriveKey']);
}

async function deriveFileKey(
  masterKey: CryptoKey,
  saltB64: string,
  info: string,
): Promise<CryptoKey> {
  return crypto.subtle.deriveKey(
    {
      name: 'HKDF',
      hash: 'SHA-256',
      salt: b64ToBytes(saltB64) as BufferSource,
      info: new TextEncoder().encode(info) as BufferSource,
    },
    masterKey,
    {name: 'AES-GCM', length: 256},
    false,
    ['decrypt'],
  );
}

/** Decrypt one envelope to raw bytes. Rejects on wrong key / tamper. */
export async function decryptEnvelopeBytes(
  masterKey: CryptoKey,
  env: EncEnvelope,
): Promise<ArrayBuffer> {
  const key = await deriveFileKey(masterKey, env.salt, env.info);
  return crypto.subtle.decrypt(
    {name: 'AES-GCM', iv: b64ToBytes(env.iv) as BufferSource, tagLength: 128},
    key,
    b64ToBytes(env.ct) as BufferSource,
  );
}

/** Decrypt one envelope to a UTF-8 string. Rejects on wrong key / tamper. */
export async function decryptEnvelope(
  masterKey: CryptoKey,
  env: EncEnvelope,
): Promise<string> {
  return new TextDecoder().decode(await decryptEnvelopeBytes(masterKey, env));
}

/** Decrypt the manifest body into its entry list. Rejects on wrong password. */
export async function decryptManifest(
  masterKey: CryptoKey,
  manifest: Manifest,
): Promise<ManifestEntry[]> {
  const b = manifest.body;
  const env: EncEnvelope = {
    v: manifest.format,
    alg: manifest.cipher,
    info: b.info,
    salt: b.salt,
    iv: b.iv,
    ct: b.ct,
  };
  const json = await decryptEnvelope(masterKey, env);
  return JSON.parse(json) as ManifestEntry[];
}

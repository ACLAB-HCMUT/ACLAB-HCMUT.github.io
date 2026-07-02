// /internal — client-side encrypted internal documentation viewer.
//
// SSR-safe: all crypto/DOM work is inside <BrowserOnly>. The deployed site
// ships only ciphertext (static/protected/*); this page fetches + decrypts it
// in memory after the user unlocks. Nothing is persisted:
//   - reload / new tab / closed tab => locked again
//   - no password, key, or decrypted markdown in localStorage / IndexedDB
// Documents are decrypted ON DEMAND when opened and cached only in a React ref
// (memory) for the session.

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Translate, {translate} from '@docusaurus/Translate';
import {
  deriveMasterKey,
  decryptManifest,
  decryptEnvelope,
  decryptEnvelopeBytes,
  type Manifest,
  type ManifestEntry,
  type EncEnvelope,
} from '../lib/protectedCrypto';
import styles from './internal.module.css';

/** Resolve a relative image src against a doc's directory (POSIX, normalized). */
function resolveRelative(docPath: string, src: string): string {
  const baseParts = docPath.split('/').slice(0, -1);
  for (const seg of src.split('/')) {
    if (seg === '' || seg === '.') continue;
    if (seg === '..') baseParts.pop();
    else baseParts.push(seg);
  }
  return baseParts.join('/');
}

// True for srcs we must NOT rewrite (already absolute / external / inline).
const isExternalSrc = (src: string) =>
  /^(https?:|data:|blob:|mailto:|#|\/)/i.test(src);

// Move relative <img src> to data-enc-src so the browser doesn't 404 before we
// swap in the decrypted blob URL.
function deferEncryptedImages(html: string): string {
  return html.replace(
    /<img\b([^>]*?)\ssrc="([^"]*)"([^>]*)>/gi,
    (m, pre, src, post) =>
      isExternalSrc(src) ? m : `<img${pre} data-enc-src="${src}"${post}>`,
  );
}

const GENERIC_ERROR = translate({
  id: 'internal.error.generic',
  message: 'Unable to unlock this documentation. Check the password and try again.',
});

function stripFrontMatter(raw: string): string {
  const m = raw.match(/^﻿?---\r?\n[\s\S]*?\r?\n---\r?\n?/);
  return m ? raw.slice(m[0].length) : raw;
}

type Session = {
  masterKey: CryptoKey;
  entries: ManifestEntry[];
};

function InternalDocsApp(): JSX.Element {
  const manifestUrl = useBaseUrl('/protected/manifest.json');
  const protectedBase = useBaseUrl('/protected/');

  const [username, setUsername] = useState('aclab');
  const [password, setPassword] = useState('');
  const [reveal, setReveal] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const [session, setSession] = useState<Session | null>(null);
  const [activePath, setActivePath] = useState<string | null>(null);
  const [html, setHtml] = useState('');
  const [docBusy, setDocBusy] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // In-memory only decrypted-doc cache (rendered HTML by path).
  const docCache = useRef<Map<string, string>>(new Map());
  // In-memory blob URLs for decrypted images (by asset path). Revoked on lock.
  const assetUrls = useRef<Map<string, string>>(new Map());
  const articleRef = useRef<HTMLElement | null>(null);

  // Encrypted image assets, keyed by their path for relative-src lookup.
  const assetMap = useMemo(() => {
    const m = new Map<string, ManifestEntry>();
    for (const e of session?.entries ?? [])
      if (e.type === 'asset') m.set(e.path, e);
    return m;
  }, [session]);

  const docEntries = useMemo(
    () => (session?.entries ?? []).filter((e) => e.type !== 'asset'),
    [session],
  );

  const revokeAssets = useCallback(() => {
    for (const url of assetUrls.current.values()) URL.revokeObjectURL(url);
    assetUrls.current.clear();
  }, []);

  // Decrypt one image asset to an in-memory blob URL (cached for the session).
  const assetUrl = useCallback(
    async (assetPath: string): Promise<string | null> => {
      if (!session) return null;
      const cached = assetUrls.current.get(assetPath);
      if (cached) return cached;
      const entry = assetMap.get(assetPath);
      if (!entry) return null;
      const res = await fetch(protectedBase + entry.file.replace(/^docs\//, 'docs/'), {
        cache: 'no-store',
      });
      if (!res.ok) return null;
      const env = (await res.json()) as EncEnvelope;
      const bytes = await decryptEnvelopeBytes(session.masterKey, env);
      const url = URL.createObjectURL(
        new Blob([bytes], {type: entry.mime || 'application/octet-stream'}),
      );
      assetUrls.current.set(assetPath, url);
      return url;
    },
    [session, assetMap, protectedBase],
  );

  const unlock = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      if (busy) return;
      setError('');
      setBusy(true);
      try {
        const res = await fetch(manifestUrl, {cache: 'no-store'});
        if (!res.ok) throw new Error('manifest');
        const manifest = (await res.json()) as Manifest;
        const masterKey = await deriveMasterKey(username, password, manifest.kdf);
        // First authenticated decrypt — wrong password rejects here.
        const entries = await decryptManifest(masterKey, manifest);
        setSession({masterKey, entries});
        setPassword(''); // drop the password from state immediately
      } catch {
        setError(GENERIC_ERROR);
      } finally {
        setBusy(false);
      }
    },
    [busy, manifestUrl, username, password],
  );

  const openDoc = useCallback(
    async (entry: ManifestEntry) => {
      if (!session) return;
      setActivePath(entry.path);
      setMenuOpen(false);
      const cached = docCache.current.get(entry.path);
      if (cached) {
        setHtml(cached);
        return;
      }
      setDocBusy(true);
      setHtml('');
      try {
        const res = await fetch(protectedBase + entry.file.replace(/^docs\//, 'docs/'), {
          cache: 'no-store',
        });
        if (!res.ok) throw new Error('fetch');
        const env = (await res.json()) as EncEnvelope;
        const markdown = await decryptEnvelope(session.masterKey, env);
        const {marked} = await import('marked');
        // Content is authored by trusted admins (same people who hold the
        // password); rendered as HTML in memory only.
        const rendered = deferEncryptedImages(
          await marked.parse(stripFrontMatter(markdown)),
        );
        docCache.current.set(entry.path, rendered);
        setHtml(rendered);
      } catch {
        setHtml('');
        setError(GENERIC_ERROR);
      } finally {
        setDocBusy(false);
      }
    },
    [session, protectedBase],
  );

  // After doc HTML mounts, decrypt & swap in each deferred image (in memory).
  useEffect(() => {
    const root = articleRef.current;
    if (!root || !activePath) return;
    let cancelled = false;
    const imgs = Array.from(
      root.querySelectorAll<HTMLImageElement>('img[data-enc-src]'),
    );
    for (const img of imgs) {
      const rel = img.getAttribute('data-enc-src') || '';
      const resolved = resolveRelative(activePath, rel);
      assetUrl(resolved)
        .then((url) => {
          if (!cancelled && url) {
            img.src = url;
            img.removeAttribute('data-enc-src');
          }
        })
        .catch(() => {});
    }
    return () => {
      cancelled = true;
    };
  }, [html, activePath, assetUrl]);

  // Revoke all blob URLs when the component unmounts.
  useEffect(() => () => revokeAssets(), [revokeAssets]);

  const lockNow = useCallback(() => {
    // Clear derived key, entries, decrypted caches, blob URLs, and nav state.
    docCache.current.clear();
    revokeAssets();
    setSession(null);
    setActivePath(null);
    setHtml('');
    setMenuOpen(false);
    setPassword('');
    setError('');
  }, [revokeAssets]);

  const clearCache = useCallback(() => {
    docCache.current.clear();
    revokeAssets();
    setHtml('');
    setActivePath(null);
    setMenuOpen(false);
  }, [revokeAssets]);

  // ---- locked: unlock screen ----
  if (!session) {
    return (
      <div className={styles.unlockOuter}>
        <form className={styles.card} onSubmit={unlock}>
          <div className={styles.lockBadge} aria-hidden>
            🔒
          </div>
          <h1>
            <Translate id="internal.title">Internal Documentation</Translate>
          </h1>
          <p className={styles.blurb}>
            <Translate id="internal.blurb">
              This content is encrypted and can only be decrypted locally in your
              browser. Your password is not sent to a server or stored by this
              website.
            </Translate>
          </p>

          {error && (
            <div className={styles.error} role="alert">
              {error}
            </div>
          )}

          <div className={styles.field}>
            <label htmlFor="int-user">
              <Translate id="internal.username">Username</Translate>
            </label>
            <input
              id="int-user"
              className={styles.input}
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="int-pw">
              <Translate id="internal.password">Password</Translate>
            </label>
            <div className={styles.pwRow}>
              <input
                id="int-pw"
                className={styles.input}
                type={reveal ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                autoFocus
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className={styles.reveal}
                onClick={() => setReveal((v) => !v)}
                aria-label={reveal ? 'Hide password' : 'Show password'}
              >
                {reveal ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button className={styles.submit} type="submit" disabled={busy || !password}>
            {busy ? (
              <Translate id="internal.unlocking">
                Decrypting securely in your browser...
              </Translate>
            ) : (
              <Translate id="internal.unlock">Unlock internal docs</Translate>
            )}
          </button>

          <p className={styles.hint}>
            <Translate id="internal.contact">
              Need access? Contact an ACLAB admin for the documentation password.
            </Translate>
          </p>
        </form>
      </div>
    );
  }

  // ---- unlocked ----
  const active = docEntries.find((e) => e.path === activePath) ?? null;
  return (
    <div className={styles.wrap}>
      <div className={styles.topbar}>
        <span className={styles.unlockedTag}>🔓 <Translate id="internal.unlocked">Internal unlocked</Translate></span>
        <div className={styles.menu}>
          <button className={styles.menuBtn} onClick={() => setMenuOpen((v) => !v)}>
            🔒 <Translate id="internal.menu">Menu</Translate> ▾
          </button>
          {menuOpen && (
            <div className={styles.menuList}>
              <button onClick={lockNow}>
                <Translate id="internal.lockNow">Lock now</Translate>
              </button>
              <button onClick={clearCache}>
                <Translate id="internal.clearCache">Clear decrypted cache</Translate>
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  window.alert(
                    translate({
                      id: 'internal.about',
                      message:
                        'These docs are client-side encrypted. Anyone with the password can decrypt them. Contact an ACLAB admin for access.',
                    }),
                  );
                }}
              >
                <Translate id="internal.aboutAccess">About access</Translate>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={styles.grid}>
        <nav className={styles.sidebar}>
          <h2>
            <Translate id="internal.sidebar">Internal Docs</Translate>
          </h2>
          {docEntries.map((entry) => (
            <button
              key={entry.path}
              className={`${styles.navItem} ${
                entry.path === activePath ? styles.navActive : ''
              }`}
              onClick={() => openDoc(entry)}
            >
              {entry.title}
            </button>
          ))}
        </nav>

        <div className={styles.content}>
          {docBusy && (
            <p className={styles.placeholder}>
              <Translate id="internal.decrypting">
                Decrypting securely in your browser...
              </Translate>
            </p>
          )}
          {!docBusy && !active && (
            <p className={styles.placeholder}>
              <Translate id="internal.pick">
                Select a document from the sidebar to decrypt and read it.
              </Translate>
            </p>
          )}
          {!docBusy && active && (
            <article
              ref={articleRef}
              className="markdown"
              dangerouslySetInnerHTML={{__html: html}}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function InternalPage(): JSX.Element {
  return (
    <Layout
      title={translate({id: 'internal.pageTitle', message: 'Internal Docs'})}
      description="Encrypted internal documentation — decrypted client-side."
      noFooter={false}
    >
      <BrowserOnly
        fallback={
          <div className={styles.unlockOuter}>
            <div className={styles.card}>
              <div className={styles.lockBadge} aria-hidden>
                🔒
              </div>
              <h1>Internal Documentation</h1>
              <p className={styles.blurb}>Loading secure viewer…</p>
            </div>
          </div>
        }
      >
        {() => <InternalDocsApp />}
      </BrowserOnly>
    </Layout>
  );
}

// /internal — client-side encrypted internal documentation viewer.
//
// SSR-safe: all crypto/DOM work is inside <BrowserOnly>. The deployed site
// ships only ciphertext (static/protected/*); this page fetches + decrypts it
// in memory after the user unlocks. Nothing is persisted:
//   - reload / new tab / closed tab => locked again
//   - no password, key, or decrypted markdown in localStorage / IndexedDB
// Documents are decrypted ON DEMAND when opened and cached only in a React ref
// (memory) for the session.

import React, {useCallback, useEffect, useRef, useState} from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Translate, {translate} from '@docusaurus/Translate';
import {
  deriveMasterKey,
  decryptManifest,
  decryptEnvelope,
  type Manifest,
  type ManifestEntry,
  type EncEnvelope,
} from '../lib/protectedCrypto';
import styles from './internal.module.css';

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
        const rendered = await marked.parse(stripFrontMatter(markdown));
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

  const lockNow = useCallback(() => {
    // Clear derived key, entries, decrypted cache, and navigation state.
    docCache.current.clear();
    setSession(null);
    setActivePath(null);
    setHtml('');
    setMenuOpen(false);
    setPassword('');
    setError('');
  }, []);

  const clearCache = useCallback(() => {
    docCache.current.clear();
    setHtml('');
    setActivePath(null);
    setMenuOpen(false);
  }, []);

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
  const active = session.entries.find((e) => e.path === activePath) ?? null;
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
          {session.entries.map((entry) => (
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
            <article className="markdown" dangerouslySetInnerHTML={{__html: html}} />
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

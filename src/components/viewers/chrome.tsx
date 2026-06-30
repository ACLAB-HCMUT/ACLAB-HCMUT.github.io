import React from 'react';
import clsx from 'clsx';
import BrowserOnly from '@docusaurus/BrowserOnly';

import styles from './viewers.module.css';

/**
 * Shared "chrome" for the hardware viewers — the framing, status overlays and
 * the client-only/lazy boundary. Keeping these in one place means every viewer
 * (3D, Gerber, future ones) looks and behaves consistently.
 */

export function LoadingOverlay({label = 'Loading…'}: {label?: string}) {
  return (
    <div className={styles.overlay}>
      <span className={styles.spinner} aria-hidden />
      <span>{label}</span>
    </div>
  );
}

export function ErrorOverlay({children}: {children: React.ReactNode}) {
  return (
    <div className={styles.overlay}>
      <span className={styles.errIcon} aria-hidden>
        ⚠
      </span>
      <span>{children}</span>
    </div>
  );
}

/**
 * Frames viewer content. In `bare` mode it renders children only, so a parent
 * (a page layout or DeviceModel card) can own the chrome.
 */
export function ViewerFrame({
  bare = false,
  height,
  caption,
  grid = true,
  controls,
  children,
}: {
  bare?: boolean;
  height?: number;
  caption?: string;
  grid?: boolean;
  controls?: React.ReactNode;
  children: React.ReactNode;
}) {
  if (bare) return <>{children}</>;
  return (
    <figure className={styles.figure}>
      <div className={clsx(styles.viewerFrame, grid && styles.grid)} style={{height}}>
        {children}
      </div>
      {controls}
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}

/**
 * Render lazy, browser-only content with a single shared fallback. Wraps the
 * BrowserOnly + Suspense boilerplate so heavy 3D/render libs never touch SSR.
 */
export function ClientLazy({
  fallback,
  children,
}: {
  fallback: React.ReactElement;
  children: () => React.ReactElement;
}) {
  return (
    <BrowserOnly fallback={fallback}>
      {() => <React.Suspense fallback={fallback}>{children()}</React.Suspense>}
    </BrowserOnly>
  );
}

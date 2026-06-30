import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './viewers.module.css';
import type {Side} from './GerberViewerImpl';

export type {Side};

export type GerberViewerProps = {
  /** Site-absolute path to a Gerber zip, e.g. "/assets/ExamplePCB/board.zip". */
  src: string;
  height?: number;
  caption?: string;
  /** Render only the board (no frame/caption/controls) so a parent owns the chrome. */
  bare?: boolean;
  /** Controlled side. If omitted, the component manages its own Top/Bottom state. */
  side?: Side;
  /** Show the built-in Top/Bottom toggle (default true; ignored when controlled). */
  showControls?: boolean;
};

const LazyImpl = React.lazy(() => import('./GerberViewerImpl'));

/**
 * SSR-safe wrapper around the Gerber viewer. Usable from .tsx pages and,
 * via MDXComponents, from any .md / .mdx doc:
 *   <GerberViewer src="/assets/ExamplePCB/board.zip" caption="…" />
 */
export default function GerberViewer(props: GerberViewerProps): JSX.Element {
  const resolvedSrc = useBaseUrl(props.src);
  const spinner = (
    <div className={styles.overlay}>
      <span className={styles.spinner} aria-hidden />
      <span>Loading viewer…</span>
    </div>
  );
  const fallback = props.bare ? (
    spinner
  ) : (
    <div className={styles.viewerFrame} style={{height: props.height ?? 440}}>
      {spinner}
    </div>
  );

  return (
    <BrowserOnly fallback={fallback}>
      {() => (
        <React.Suspense fallback={fallback}>
          <LazyImpl {...props} src={resolvedSrc} />
        </React.Suspense>
      )}
    </BrowserOnly>
  );
}

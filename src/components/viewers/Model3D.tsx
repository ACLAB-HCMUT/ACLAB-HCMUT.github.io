import React, {useState} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';

import styles from './viewers.module.css';

export type Model3DProps = {
  /** Site-absolute path to a model file, e.g. "/assets/3D/part.STEP". */
  src: string;
  height?: number;
  caption?: string;
  /** Render only the canvas (no frame/caption) so a parent can own the chrome. */
  bare?: boolean;
  /**
   * Static image shown first; the heavy 3D viewer only loads after the user
   * clicks "View in 3D". Recommended for large models.
   */
  poster?: string;
  posterAlt?: string;
};

const LazyImpl = React.lazy(() => import('./Model3DImpl'));

/**
 * SSR-safe wrapper around the 3D model viewer. Usable from .tsx pages and,
 * via MDXComponents, from any .md / .mdx doc:
 *   <Model3D src="/assets/3D/part.STEP" poster="/assets/IMG/part.jpg" />
 */
export default function Model3D(props: Model3DProps): JSX.Element {
  const {src, height = 480, caption, bare = false, poster, posterAlt} = props;
  const [activated, setActivated] = useState(false);

  const resolvedSrc = useBaseUrl(src);
  // Hook must run unconditionally; result is only used when a poster is set.
  const resolvedPoster = useBaseUrl(poster ?? '');

  const spinner = (
    <div className={styles.overlay}>
      <span className={styles.spinner} aria-hidden />
      <span>Loading viewer…</span>
    </div>
  );

  const frame = (content: React.ReactNode) =>
    bare ? (
      <>{content}</>
    ) : (
      <figure className={styles.figure}>
        <div className={clsx(styles.viewerFrame, styles.grid)} style={{height}}>
          {content}
        </div>
        {caption && (
          <figcaption className={styles.caption}>{caption}</figcaption>
        )}
      </figure>
    );

  // Poster gate — defer the heavy 3D load until the user opts in.
  if (poster && !activated) {
    return frame(
      <button
        type="button"
        className={styles.poster}
        onClick={() => setActivated(true)}
        aria-label="Load interactive 3D model">
        <img
          className={styles.posterImg}
          src={resolvedPoster}
          alt={posterAlt ?? 'Static preview of the 3D model'}
          loading="lazy"
        />
        <span className={styles.posterScrim}>
          <span className={styles.playBtn}>
            <span className={styles.playIcon} aria-hidden>
              ▶
            </span>
            View in 3D
          </span>
          <span className={styles.posterNote}>
            Loads an interactive model — may take a few seconds
          </span>
        </span>
      </button>,
    );
  }

  return frame(
    <BrowserOnly fallback={spinner}>
      {() => (
        <React.Suspense fallback={spinner}>
          <LazyImpl {...props} bare src={resolvedSrc} />
        </React.Suspense>
      )}
    </BrowserOnly>,
  );
}

import React, {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import * as OV from 'online-3d-viewer';

import styles from './viewers.module.css';

export type Model3DImplProps = {
  /** Already-resolved (base-url prefixed) URL to a model file (STEP/STL/GLB/OBJ…). */
  src: string;
  height?: number;
  caption?: string;
  /** Render only the canvas (no frame/figure/caption) so a parent can own the chrome. */
  bare?: boolean;
};

/**
 * Client-only 3D model viewer powered by online-3d-viewer (OCCT WASM).
 * Loads STEP/IGES/STL/GLB/OBJ directly in the browser — no conversion needed.
 * NOTE: STEP decoding fetches the OCCT decoder from a CDN at runtime, so it
 * needs network access on first view.
 */
export default function Model3DImpl({
  src,
  height = 480,
  caption,
  bare = false,
}: Model3DImplProps): JSX.Element {
  const hostRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(
    'loading',
  );

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    setStatus('loading');

    let viewer: any;
    try {
      viewer = new OV.EmbeddedViewer(host, {
        backgroundColor: new OV.RGBAColor(0, 0, 0, 0),
        defaultColor: new OV.RGBColor(120, 132, 145),
        edgeSettings: new OV.EdgeSettings(true, new OV.RGBColor(28, 32, 40), 1),
        onModelLoaded: () => setStatus('ready'),
        onModelLoadFailed: () => setStatus('error'),
      });
      viewer.LoadModelFromUrlList([src]);
    } catch {
      setStatus('error');
    }

    return () => {
      try {
        viewer?.Destroy?.();
      } catch {
        /* ignore */
      }
      if (host) host.innerHTML = '';
    };
  }, [src]);

  const inner = (
    <>
      <div ref={hostRef} className={styles.canvasHost} />
      {status === 'loading' && (
        <div className={styles.overlay}>
          <span className={styles.spinner} aria-hidden />
          <span>Loading 3D model…</span>
        </div>
      )}
      {status === 'error' && (
        <div className={styles.overlay}>
          <span className={styles.errIcon} aria-hidden>
            ⚠
          </span>
          <span>
            Could not load the model. The STEP decoder is fetched from a CDN —
            check your network connection.
          </span>
        </div>
      )}
    </>
  );

  if (bare) return inner;

  return (
    <figure className={styles.figure}>
      <div className={clsx(styles.viewerFrame, styles.grid)} style={{height}}>
        {inner}
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}

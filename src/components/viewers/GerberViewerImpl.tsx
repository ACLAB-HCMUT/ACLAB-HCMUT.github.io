import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import JSZip from 'jszip';
// Prebuilt, fully browserified UMD bundle — avoids Node-core polyfills in the build.
import pcbStackup from 'pcb-stackup/dist/pcb-stackup.min.js';

import styles from './viewers.module.css';

export type Side = 'top' | 'bottom';

export type GerberViewerImplProps = {
  /** Already-resolved URL to a .zip of Gerber + Excellon drill files. */
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

/**
 * Client-only PCB Gerber viewer. Fetches a Gerber zip, renders top & bottom
 * board images to SVG with the tracespace pcb-stackup engine.
 */
export default function GerberViewerImpl({
  src,
  height = 440,
  caption,
  bare = false,
  side: controlledSide,
  showControls = true,
}: GerberViewerImplProps): JSX.Element {
  const [top, setTop] = useState('');
  const [bottom, setBottom] = useState('');
  const [internalSide, setInternalSide] = useState<Side>('top');
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(
    'loading',
  );
  const [err, setErr] = useState('');

  const isControlled = controlledSide !== undefined;
  const side = isControlled ? controlledSide : internalSide;

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');

    (async () => {
      try {
        const res = await fetch(src);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buf = await res.arrayBuffer();
        const zip = await JSZip.loadAsync(buf);
        const entries = Object.values(zip.files).filter((f) => !f.dir);
        const layers = await Promise.all(
          entries.map(async (f) => ({
            filename: (f.name.split('/').pop() ?? f.name) as string,
            gerber: await f.async('string'),
          })),
        );
        const stackup = await pcbStackup(layers);
        if (cancelled) return;
        setTop(stackup.top.svg);
        setBottom(stackup.bottom.svg);
        setStatus('ready');
      } catch (e: any) {
        if (!cancelled) {
          setErr(String(e?.message ?? e));
          setStatus('error');
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [src]);

  const inner = (
    <>
      {status === 'loading' && (
        <div className={styles.overlay}>
          <span className={styles.spinner} aria-hidden />
          <span>Rendering Gerber layers…</span>
        </div>
      )}
      {status === 'error' && (
        <div className={styles.overlay}>
          <span className={styles.errIcon} aria-hidden>
            ⚠
          </span>
          <span>Could not render Gerbers: {err}</span>
        </div>
      )}
      {status === 'ready' && (
        <div
          className={styles.gerberStage}
          // SVG is produced by pcb-stackup from the user's own Gerber files.
          dangerouslySetInnerHTML={{__html: side === 'top' ? top : bottom}}
        />
      )}
    </>
  );

  const controls = !isControlled && showControls && (
    <div className={styles.controls}>
      <button
        type="button"
        className={clsx(styles.segBtn, side === 'top' && styles.segBtnActive)}
        onClick={() => setInternalSide('top')}
        disabled={status !== 'ready'}>
        Top
      </button>
      <button
        type="button"
        className={clsx(
          styles.segBtn,
          side === 'bottom' && styles.segBtnActive,
        )}
        onClick={() => setInternalSide('bottom')}
        disabled={status !== 'ready'}>
        Bottom
      </button>
    </div>
  );

  if (bare) return inner;

  return (
    <figure className={styles.figure}>
      <div className={clsx(styles.viewerFrame, styles.grid)} style={{height}}>
        {inner}
      </div>
      {controls}
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}

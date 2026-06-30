import React from 'react';
import clsx from 'clsx';

import Model3D from './Model3D';
import styles from './viewers.module.css';

export type DeviceModelProps = {
  /** Site-absolute path to a model file, e.g. "/assets/3D/board.STEP". */
  src: string;
  title: string;
  subtitle?: string;
  /** Short spec/highlight pills shown under the viewer. */
  chips?: string[];
  height?: number;
  caption?: string;
  /** Override the corner badge text (default "3D · STEP"). */
  badge?: string;
  /** Static preview image; the 3D viewer loads only after the user clicks it. */
  poster?: string;
  posterAlt?: string;
};

/**
 * Reusable "device showcase" card: a titled, framed 3D model viewer with
 * optional spec chips. Registered as a global MDX component, so any docs page
 * can embed an interactive part with no import:
 *
 *   <DeviceModel
 *     src="/assets/3D/RASPBERRY_PI_5.STEP"
 *     title="Raspberry Pi 5"
 *     chips={['BCM2712 @ 2.4 GHz', '4 / 8 GB']}
 *   />
 */
export default function DeviceModel({
  src,
  title,
  subtitle,
  chips,
  height = 460,
  caption,
  badge = '3D · STEP',
  poster,
  posterAlt,
}: DeviceModelProps): JSX.Element {
  return (
    <div className={styles.card}>
      <div className={styles.cardHead}>
        <div>
          <div className={styles.cardTitle}>{title}</div>
          {subtitle && <div className={styles.cardSub}>{subtitle}</div>}
        </div>
        {badge && <span className={styles.badge}>{badge}</span>}
      </div>

      <div
        className={clsx(styles.cardStage, styles.grid)}
        style={{['--vh']: `${height}px`} as React.CSSProperties}>
        <Model3D bare src={src} poster={poster} posterAlt={posterAlt} />
      </div>

      {chips && chips.length > 0 && (
        <div className={styles.chipRow}>
          {chips.map((c) => (
            <span key={c} className={styles.chip}>
              {c}
            </span>
          ))}
        </div>
      )}

      {caption && <div className={styles.caption}>{caption}</div>}
    </div>
  );
}

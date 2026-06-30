import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

import styles from './hero3d.module.css';

export type Hero3DProps = {
  className?: string;
  count?: number;
  pointColor?: number;
  lineColor?: number;
  pointSize?: number;
  pointOpacity?: number;
  lineOpacity?: number;
};

const LazyField = React.lazy(() => import('./ParticleField'));

/**
 * SSR-safe interactive 3D hero background (three.js). Drop it as an absolutely
 * positioned layer behind hero content:
 *   <div style={{position:'relative'}}><Hero3D /> ...overlay... </div>
 */
export default function Hero3D(props: Hero3DProps): JSX.Element {
  const fallback = <div className={styles.fallback} />;
  return (
    <BrowserOnly fallback={fallback}>
      {() => (
        <React.Suspense fallback={fallback}>
          <LazyField {...props} />
        </React.Suspense>
      )}
    </BrowserOnly>
  );
}

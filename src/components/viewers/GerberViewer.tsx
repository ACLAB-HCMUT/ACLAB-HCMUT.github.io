import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

import {ViewerFrame, LoadingOverlay, ClientLazy} from './chrome';
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
  const {src, height = 440, caption, bare = false} = props;
  const resolvedSrc = useBaseUrl(src);

  const fallback = (
    <ViewerFrame bare={bare} height={height} caption={caption}>
      <LoadingOverlay label="Loading viewer…" />
    </ViewerFrame>
  );

  return (
    <ClientLazy fallback={fallback}>
      {() => <LazyImpl {...props} src={resolvedSrc} />}
    </ClientLazy>
  );
}

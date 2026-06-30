import MDXComponents from '@theme-original/MDXComponents';
import {Model3D, GerberViewer, DeviceModel} from '@site/src/components/viewers';

// Make the hardware viewers usable in any .md / .mdx doc without an import:
//   <DeviceModel src="/assets/3D/part.STEP" title="…" chips={[…]} />
//   <Model3D src="/assets/3D/part.STEP" />
//   <GerberViewer src="/assets/ExamplePCB/board.zip" />
export default {
  ...MDXComponents,
  Model3D,
  GerberViewer,
  DeviceModel,
};

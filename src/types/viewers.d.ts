// Ambient module declarations for 3rd-party hardware viewers that don't ship
// (resolvable) TypeScript types.

// online-3d-viewer ships a .d.ts next to its build, but no package "types"
// field — treat as untyped (the small API we use is guarded at runtime).
declare module 'online-3d-viewer';

// pcb-stackup ships a prebuilt, fully browserified UMD bundle. We import that
// path directly to avoid pulling Node core polyfills into the Docusaurus build.
declare module 'pcb-stackup/dist/pcb-stackup.min.js' {
  export interface GerberLayerInput {
    filename: string;
    gerber: string;
  }
  export interface StackupSide {
    svg: string;
    width: number;
    height: number;
    units: string;
  }
  export interface Stackup {
    top: StackupSide;
    bottom: StackupSide;
  }
  export default function pcbStackup(
    layers: GerberLayerInput[],
  ): Promise<Stackup>;
}

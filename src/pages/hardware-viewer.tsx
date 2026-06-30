import React, {useState} from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';

import {PageHero, Section, Container} from '../components';
import {Model3D, GerberViewer} from '../components/viewers';
import styles from './hardware-viewer.module.css';

const STEP_SRC = '/assets/3D/RJ45-TH_HR911130A.STEP';
const GERBER_SRC = '/assets/ExamplePCB/PC_ExtensionBoard.zip';

type View = '3d' | 'top' | 'bottom';
const VIEWS: {id: View; label: string}[] = [
  {id: '3d', label: '3D Component'},
  {id: 'top', label: 'PCB Top'},
  {id: 'bottom', label: 'PCB Bottom'},
];

const TABS = ['Overview', 'Specifications', 'Files', 'Layers'] as const;
type Tab = (typeof TABS)[number];

// Real, verifiable metadata about the two files in /static/assets.
const SPECS: [string, string][] = [
  ['Board source', 'KiCad Gerber + Excellon export'],
  ['Copper layers', '8 (F.Cu, In1–In6, B.Cu)'],
  ['Gerber format', 'RS-274X'],
  ['Drill format', 'Excellon (PTH + NPTH)'],
  ['3D component', 'RJ45 jack HR911130A'],
  ['CAD format', 'STEP AP214 (SolidWorks)'],
];

const FILES: {name: string; size: string}[] = [
  {name: 'PC_ExtensionBoard.zip', size: '163 KB'},
  {name: 'RJ45-TH_HR911130A.STEP', size: '4.3 MB'},
];

// Layer set as present in the Gerber zip (real).
const LAYERS: {name: string; type: string; color: string}[] = [
  {name: 'F.Silkscreen', type: '.gto', color: '#e8e8e8'},
  {name: 'F.Mask', type: '.gts', color: '#1f6f43'},
  {name: 'F.Cu', type: '.gtl', color: '#c08a2e'},
  {name: 'In1–In6.Cu', type: '.g1–.g6', color: '#a87a28'},
  {name: 'B.Cu', type: '.gbl', color: '#c08a2e'},
  {name: 'B.Mask', type: '.gbs', color: '#1f6f43'},
  {name: 'B.Silkscreen', type: '.gbo', color: '#e8e8e8'},
  {name: 'Edge.Cuts', type: '.gm1', color: '#6b7280'},
  {name: 'Drill (PTH/NPTH)', type: '.drl', color: '#111827'},
];

export default function HardwareViewer(): JSX.Element {
  const [view, setView] = useState<View>('3d');
  const [tab, setTab] = useState<Tab>('Overview');
  const gerberSide = view === 'bottom' ? 'bottom' : 'top';

  return (
    <Layout
      title="Hardware Viewer — Proof of Concept"
      description="Interactive in-browser viewer for a real PCB (Gerber) and a 3D CAD component (STEP), built from open-source frameworks.">
      <PageHero
        kicker="Proof of Concept · Open Hardware"
        title="PC Extension Board"
        subtitle="An interactive hardware explorer — rotate the 3D CAD component, flip between PCB copper sides, and inspect the real fabrication data. Built from open-source viewers, reusable on any docs page."
        breadcrumb={[{label: 'Home', to: '/'}, {label: 'Hardware Viewer'}]}
      />

      <Section variant="surface">
        <Container>
          <div className={styles.chips}>
            <span className={styles.chip}>8-layer PCB</span>
            <span className={styles.chip}>RS-274X Gerber</span>
            <span className={styles.chip}>STEP AP214</span>
            <span className={styles.chip}>In-browser render</span>
          </div>

          <div className={styles.app}>
            {/* ---- Viewer ---- */}
            <section className={styles.viewerCol}>
              <div className={styles.viewToolbar}>
                <div className={styles.switch} role="tablist" aria-label="View">
                  {VIEWS.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      role="tab"
                      aria-selected={view === v.id}
                      className={clsx(
                        styles.switchBtn,
                        view === v.id && styles.switchBtnActive,
                      )}
                      onClick={() => setView(v.id)}>
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.stage}>
                <div
                  className={clsx(
                    styles.layer,
                    view !== '3d' && styles.layerHidden,
                  )}>
                  <Model3D bare src={STEP_SRC} />
                </div>
                <div
                  className={clsx(
                    styles.layer,
                    view === '3d' && styles.layerHidden,
                  )}>
                  <GerberViewer bare src={GERBER_SRC} side={gerberSide} />
                </div>
              </div>

              <p className={styles.hint}>
                {view === '3d'
                  ? 'Drag to orbit · scroll to zoom · right-drag to pan.'
                  : 'Rendered from the board’s own Gerber + drill files.'}
              </p>
            </section>

            {/* ---- Info panel ---- */}
            <aside className={styles.panel}>
              <div className={styles.tabs} role="tablist">
                {TABS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    role="tab"
                    aria-selected={tab === t}
                    className={clsx(styles.tab, tab === t && styles.tabActive)}
                    onClick={() => setTab(t)}>
                    {t}
                  </button>
                ))}
              </div>

              <div className={styles.tabBody}>
                {tab === 'Overview' && (
                  <>
                    <p>
                      This page renders two real engineering files straight in
                      the browser — no server, no conversion:
                    </p>
                    <p>
                      <strong>3D Component</strong> — a STEP CAD model decoded
                      with OpenCascade (WASM) via <code>online-3d-viewer</code>.
                    </p>
                    <p>
                      <strong>PCB Top/Bottom</strong> — the board’s Gerber +
                      Excellon set, unzipped in-browser and plotted to SVG with
                      the <code>tracespace</code> engine.
                    </p>
                  </>
                )}

                {tab === 'Specifications' && (
                  <table className={styles.specTable}>
                    <tbody>
                      {SPECS.map(([k, v]) => (
                        <tr key={k}>
                          <th>{k}</th>
                          <td>{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {tab === 'Files' && (
                  <ul className={styles.fileList}>
                    {FILES.map((f) => (
                      <li key={f.name}>
                        <span className={styles.fileName}>{f.name}</span>
                        <span className={styles.fileSize}>{f.size}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {tab === 'Layers' && (
                  <ul className={styles.layerList}>
                    {LAYERS.map((l) => (
                      <li key={l.name}>
                        <span
                          className={styles.swatch}
                          style={{background: l.color}}
                          aria-hidden
                        />
                        {l.name}
                        <span className={styles.layerType}>{l.type}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <Section variant="alt">
        <Container>
          <h2>Reuse anywhere</h2>
          <p>
            Both viewers are registered as global MDX components — drop them into
            any knowledge-base, course or project page with no import:
          </p>
          <pre>
            <code>{`<Model3D src="/assets/3D/part.STEP" caption="…" />
<GerberViewer src="/assets/ExamplePCB/board.zip" caption="…" />`}</code>
          </pre>
        </Container>
      </Section>
    </Layout>
  );
}

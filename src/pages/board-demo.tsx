import React, {useState} from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';

import styles from './board-demo.module.css';

/* ---- Demo data (placeholder — UI demo only, inspired by Antmicro Open Hardware) ---- */

type Feature = {
  id: string;
  n: number;
  name: string;
  desc: string;
  x: number; // hotspot position, % of board width
  y: number; // % of board height
};

const FEATURES: Feature[] = [
  {id: 'com', n: 1, name: 'COM Express Type 7 connector', desc: '220-pin module connector — server-class CPU module mounts here.', x: 50, y: 52},
  {id: 'sfp', n: 2, name: '10 GbE SFP+ cage', desc: 'High-speed networking over a fiber/DAC module.', x: 14, y: 24},
  {id: 'rj45', n: 3, name: '2× 1 GbE (RJ45)', desc: 'Gigabit Ethernet with integrated magnetics.', x: 13, y: 60},
  {id: 'usb', n: 4, name: '4× USB 3.0', desc: 'SuperSpeed host ports on the rear edge.', x: 14, y: 82},
  {id: 'pcie', n: 5, name: 'PCIe x16 slot', desc: 'Expansion for GPUs / accelerators / capture cards.', x: 78, y: 30},
  {id: 'atx', n: 6, name: 'ATX power input', desc: '12 V main rail with on-board regulation.', x: 86, y: 72},
  {id: 'mcu', n: 7, name: 'Board management MCU', desc: 'Supervises power sequencing, fans and status.', x: 64, y: 80},
];

const VIEWS = [
  {id: 'top', label: 'Top'},
  {id: 'top-ortho', label: 'Top ortho'},
  {id: 'perspective', label: 'Perspective'},
  {id: 'bottom', label: 'Bottom'},
] as const;
type ViewId = (typeof VIEWS)[number]['id'];

const TABS = ['Features', 'Specifications', 'Files', 'Components'] as const;
type Tab = (typeof TABS)[number];

const SPECS: [string, string][] = [
  ['Form factor', 'COM Express Type 7 baseboard'],
  ['Dimensions', '200 × 150 mm'],
  ['PCB stackup', '12 layers'],
  ['Power input', 'ATX 12 V'],
  ['Networking', '1× 10 GbE SFP+, 2× 1 GbE RJ45'],
  ['USB', '4× USB 3.0'],
  ['Storage', '2× SATA III'],
  ['Expansion', 'PCIe x16'],
];

const FILES = [
  {name: 'schematic.pdf', size: '1.8 MB'},
  {name: 'gerbers.zip', size: '4.2 MB'},
  {name: 'bom.csv', size: '24 KB'},
  {name: '3d-model.step', size: '12 MB'},
  {name: 'kicad-project.zip', size: '6.7 MB'},
];

const BOM = [
  {ref: 'J1', part: 'COM Express 220p', qty: 1},
  {ref: 'J2', part: 'SFP+ cage', qty: 1},
  {ref: 'U7', part: 'Mgmt MCU (Cortex-M)', qty: 1},
  {ref: 'U3', part: 'Ethernet PHY', qty: 2},
  {ref: 'U10', part: 'Buck regulator', qty: 4},
];

/* Decorative on-board blocks (pure visuals) */
const PARTS = [
  {cls: 'connector', style: {left: '32%', top: '44%', width: '36%', height: '8%'}, label: 'COM EXPRESS'},
  {cls: 'cage', style: {left: '5%', top: '16%', width: '16%', height: '16%'}, label: 'SFP+'},
  {cls: 'rj45', style: {left: '5%', top: '52%', width: '16%', height: '16%'}, label: 'ETH'},
  {cls: 'rj45', style: {left: '5%', top: '74%', width: '16%', height: '16%'}, label: 'USB'},
  {cls: 'slot', style: {left: '60%', top: '12%', width: '36%', height: '7%'}, label: 'PCIe x16'},
  {cls: 'chip', style: {left: '60%', top: '74%', width: '10%', height: '12%'}, label: 'MCU'},
  {cls: 'chip', style: {left: '78%', top: '46%', width: '12%', height: '14%'}, label: 'FPGA'},
  {cls: 'cap', style: {left: '82%', top: '66%', width: '5%', height: '9%'}, label: ''},
  {cls: 'cap', style: {left: '88%', top: '66%', width: '5%', height: '9%'}, label: ''},
];

export default function BoardDemo(): JSX.Element {
  const [view, setView] = useState<ViewId>('top-ortho');
  const [tab, setTab] = useState<Tab>('Features');
  const [active, setActive] = useState<string | null>('com');

  return (
    <Layout title="Board Viewer (UI Demo)" description="Interactive board-viewer UI demo.">
      <div className={styles.note}>
        <strong>UI demo</strong> — layout &amp; interactions only, inspired by Antmicro's Open
        Hardware viewer. Data and the 3D render are placeholders.
      </div>

      <div className={styles.header}>
        <span className={styles.eyebrow}>ACLAB · Open Hardware</span>
        <h1 className={styles.title}>COM Express 7 Baseboard</h1>
        <p className={styles.subtitle}>12-layer · 200 × 150 mm · revision A</p>
      </div>

      <div className={styles.app}>
        {/* ---- Viewer ---- */}
        <section className={styles.viewer}>
          <div className={styles.stage}>
            <div className={styles.grid} aria-hidden />
            <div className={clsx(styles.board, styles[`view_${view.replace('-', '_')}`])}>
              {PARTS.map((p, i) => (
                <div key={i} className={clsx(styles.part, styles[p.cls])} style={p.style as React.CSSProperties}>
                  {p.label && <span>{p.label}</span>}
                </div>
              ))}
              {FEATURES.map((f) => (
                <button
                  key={f.id}
                  className={clsx(styles.hotspot, active === f.id && styles.hotspotActive)}
                  style={{left: `${f.x}%`, top: `${f.y}%`}}
                  onMouseEnter={() => setActive(f.id)}
                  onClick={() => {
                    setTab('Features');
                    setActive(f.id);
                  }}
                  aria-label={f.name}>
                  {f.n}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.viewControls}>
            {VIEWS.map((v) => (
              <button
                key={v.id}
                className={clsx(styles.viewBtn, view === v.id && styles.viewBtnActive)}
                onClick={() => setView(v.id)}>
                {v.label}
              </button>
            ))}
          </div>
        </section>

        {/* ---- Side panel ---- */}
        <aside className={styles.panel}>
          <div className={styles.tabs} role="tablist">
            {TABS.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                className={clsx(styles.tab, tab === t && styles.tabActive)}
                onClick={() => setTab(t)}>
                {t}
              </button>
            ))}
          </div>

          <div className={styles.tabBody}>
            {tab === 'Features' &&
              FEATURES.map((f) => (
                <div
                  key={f.id}
                  className={clsx(styles.feature, active === f.id && styles.featureActive)}
                  onMouseEnter={() => setActive(f.id)}
                  onClick={() => setActive(f.id)}>
                  <span className={styles.featureNum}>{f.n}</span>
                  <div>
                    <div className={styles.featureName}>{f.name}</div>
                    <div className={styles.featureDesc}>{f.desc}</div>
                  </div>
                </div>
              ))}

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
                    {/* eslint-disable-next-line @docusaurus/no-untranslated-text */}
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      <span className={styles.fileIcon}>⤓</span>
                      {f.name}
                    </a>
                    <span className={styles.fileSize}>{f.size}</span>
                  </li>
                ))}
              </ul>
            )}

            {tab === 'Components' && (
              <table className={styles.specTable}>
                <thead>
                  <tr>
                    <th>Ref</th>
                    <th>Part</th>
                    <th>Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {BOM.map((b) => (
                    <tr key={b.ref}>
                      <th>{b.ref}</th>
                      <td>{b.part}</td>
                      <td>{b.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </aside>
      </div>
    </Layout>
  );
}

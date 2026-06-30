import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

import {Section, Container, Grid} from '../components';
import {DeviceModel} from '../components/viewers';
import Hero3D from '../components/hero3d/Hero3D';
import styles from './ui-showcase.module.css';

export default function UiShowcase(): JSX.Element {
  return (
    <Layout
      title="UI Showcase — ACLAB"
      description="An interactive 3D hero (three.js) and other rich UI, running on a static Docusaurus site.">
      {/* Immersive 3D hero */}
      <header className={styles.stage}>
        <div className={styles.bg}>
          <Hero3D count={90} />
        </div>
        <div className={styles.scrim} />
        <div className={styles.overlay}>
          <span className={styles.eyebrow}>Interactive 3D · three.js</span>
          <h1 className={styles.title}>
            Engineering intelligent systems,
            <br />
            <em>from chip to robot.</em>
          </h1>
          <p className={styles.subtitle}>
            A live WebGL scene rendered in the browser — slowly rotating, with
            mouse parallax. Move your cursor across the hero. It runs on a fully
            static site and falls back gracefully when motion is reduced.
          </p>
          <div className={styles.actions}>
            <Link className={styles.btnPrimary} to="/hardware-viewer">
              Explore the 3D / PCB viewer →
            </Link>
            <Link className={styles.btnGhost} to="/docs/pcb-design">
              Browse the Knowledge Base
            </Link>
          </div>
          <p className={styles.hint}>
            Move the mouse for parallax · reusable <code>&lt;Hero3D /&gt;</code>{' '}
            component · client-only, SSR-safe.
          </p>
        </div>
      </header>

      {/* How it works */}
      <Section variant="surface">
        <Container>
          <h2>Impressive UI on a static site</h2>
          <p>
            This page mixes three rich-UI techniques, all compatible with
            Docusaurus’ static build:
          </p>
          <Grid cols={3}>
            <div>
              <h3>Interactive 3D (three.js)</h3>
              <p>
                The hero is a real WebGL particle network. It’s wrapped in a
                client-only boundary so it never runs during the static build.
              </p>
            </div>
            <div>
              <h3>In-browser model & PCB viewers</h3>
              <p>
                STEP 3D models and Gerber PCBs render right in the page — see the{' '}
                <Link to="/hardware-viewer">Hardware Viewer</Link>.
              </p>
            </div>
            <div>
              <h3>Reusable & accessible</h3>
              <p>
                Each effect is a typed component, respects{' '}
                <code>prefers-reduced-motion</code>, and disposes its GPU
                resources on unmount.
              </p>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* The lab in 3D */}
      <Section variant="alt">
        <Container>
          <h2>The lab in 3D</h2>
          <p>
            Lab equipment, boards and parts rendered as interactive 3D models you
            can rotate in the browser. Click the model below to load it; each
            shows a static photo first so the page stays fast.
          </p>

          <DeviceModel
            src="/assets/3D/RASPBERRY_PI_5.STEP"
            poster="/assets/IMG/Pi5.jpg"
            posterAlt="Raspberry Pi 5 board"
            title="Raspberry Pi 5 — IoT / Edge AI node"
            subtitle="Interactive 3D CAD model (STEP)"
            chips={['IoT', 'Edge AI', 'Linux SBC', '40-pin GPIO']}
            height={460}
          />

          <Grid cols={3}>
            <div>
              <h3>🤖 Robotics & ROS</h3>
              <p>
                Arms, mobile robots and ROS 2 work — see the{' '}
                <Link to="/docs/robotics-ros">Robotics &amp; ROS</Link> guide and
                the{' '}
                <Link to="/docs/projects/vr-robot-arm-teleoperation">
                  VR robot-arm project
                </Link>
                .
              </p>
            </div>
            <div>
              <h3>🌐 IoT & Edge</h3>
              <p>
                Sensors, gateways and on-device AI — the Pi 5 above plus the{' '}
                <Link to="/docs/ai-edge">AI / Edge AI</Link> and{' '}
                <Link to="/courses/iot">IoT course</Link>.
              </p>
            </div>
            <div>
              <h3>🔧 Embedded & PCB</h3>
              <p>
                Boards and parts in 3D, and real Gerbers — open the{' '}
                <Link to="/hardware-viewer">Hardware Viewer</Link> and{' '}
                <Link to="/docs/pcb-design">PCB Design</Link>.
              </p>
            </div>
          </Grid>

          <p className={styles.hint}>
            Add more lab equipment by dropping a STEP/GLB file in{' '}
            <code>static/assets/3D/</code> and embedding{' '}
            <code>&lt;DeviceModel /&gt;</code> on any page.
          </p>
        </Container>
      </Section>
    </Layout>
  );
}

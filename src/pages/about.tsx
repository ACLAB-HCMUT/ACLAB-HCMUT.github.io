import React from 'react';
import Layout from '@theme/Layout';
import {Btn, CTABanner, Grid, PageHero, Section, SectionHead} from '../components';
import styles from './pages.module.css';

const values = [
  {title: 'Mission', text: 'Advance applied research and engineering in intelligent systems, and train engineers who can build real hardware and software end to end.'},
  {title: 'Vision', text: 'Be a leading university lab bridging robotics, embedded systems and AI — from chip and PCB to autonomous platforms.'},
  {title: 'Approach', text: 'Hands-on, project-driven work. We design PCBs, write firmware, build robots and deploy AI on real devices.'},
];

const history = [
  {year: 'Dec 2023', text: 'Began R&D focus in Embedded Systems, AI and Robotics.'},
  {year: 'May 2024', text: 'Started an R&D collaboration with Kinis AI, bridging academic research and practical technology.'},
  {year: '2025', text: 'Supported OhStem in running robotics competitions and activities for students and young engineers.'},
  {year: 'Aug 2025', text: 'Competed in Bách Khoa Innovation: INNOTECH with the Low-Cost Smart Irrigation System – HCMUT.'},
  {year: 'Jun 2026', text: 'Partnered with Heineken Vietnam and HCMUT on a humanoid-robot pilot for industrial manufacturing.'},
];

const facilities = [
  'Robotics & prototyping workspace',
  'Electronics & PCB rework bench',
  'Embedded / firmware debug stations',
  '3D printing & mechanical fabrication',
  'Edge-AI compute (Jetson / GPU)',
  'Sensors, motors & test equipment',
];

export default function About(): JSX.Element {
  return (
    <Layout title="About ACLAB" description="About the Advanced Computing Lab at HCMUT — mission, vision, history, leadership and facilities.">
      <PageHero
        kicker="About"
        title="About ACLAB"
        subtitle="The Advanced Computing Lab (ACLAB) at HCMUT is a research and engineering lab building intelligent systems across robotics, embedded systems, edge AI, IoT and hardware-software co-design."
        breadcrumb={[{label: 'Home', to: '/'}, {label: 'About'}]}
      />

      <Section variant="surface">
        <Grid cols={3}>
          {values.map((v) => (
            <div key={v.title} className={styles.valueCard}>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </Grid>
      </Section>

      <Section variant="alt">
        <div className={styles.twoCol}>
          <div>
            <SectionHead kicker="Our story" title="History & milestones" />
            <div className={styles.timeline}>
              {history.map((h) => (
                <div key={h.year} className={styles.timeItem}>
                  <span className={styles.timeYear}>{h.year}</span>
                  <p>{h.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.infoCard}>
            <h3>Leadership</h3>
            <div className={styles.infoRow}><strong>Director</strong><span>Dr. Lê Trọng Nhân (HOD)</span></div>
            <div className={styles.infoRow}><strong>Co-PI</strong><span>Associate Director (Faculty)</span></div>
            <div className={styles.infoRow}><strong>Faculty</strong><span>Electrical & Electronics Engineering, HCMUT</span></div>
            <div style={{marginTop: '1rem'}}>
              <Btn to="/people" variant="outline">Meet the team</Btn>
            </div>
          </div>
        </div>
      </Section>

      <Section variant="surface">
        <SectionHead kicker="Facilities" title="Where we build." intro="A working engineering lab — electronics benches, prototyping tools and edge-AI compute." />
        <Grid cols={3}>
          {facilities.map((f) => (
            <div key={f} className={styles.valueCard}><p style={{fontWeight: 600, color: 'var(--aclab-ink)'}}>{f}</p></div>
          ))}
        </Grid>
      </Section>

      <Section variant="alt">
        <CTABanner
          title="Want to work with us?"
          text="Reach out for collaboration, student membership or visiting the lab."
          actions={<><Btn to="/contact" variant="ghost">Contact us</Btn><Btn to="/join" variant="ghost">Join ACLAB</Btn></>}
        />
      </Section>
    </Layout>
  );
}

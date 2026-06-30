import React from 'react';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';

import {Btn, CTABanner, PageHero, Section, SectionHead} from '../components';
import styles from './about.module.css';

const values = [
  {icon: '🎯', title: translate({message: 'Mission'}), text: translate({message: 'Advance applied research and engineering in intelligent systems, and train engineers who can build real hardware and software end to end.'})},
  {icon: '🔭', title: translate({message: 'Vision'}), text: translate({message: 'Be a leading university lab bridging robotics, embedded systems and AI — from chip and PCB to autonomous platforms.'})},
  {icon: '🛠️', title: translate({message: 'Approach'}), text: translate({message: 'Hands-on, project-driven work. We design PCBs, write firmware, build robots and deploy AI on real devices.'})},
];

const history = [
  {year: 'Dec 2023', text: translate({message: 'Began R&D focus in Embedded Systems, AI and Robotics.'})},
  {year: 'May 2024', text: translate({message: 'Started an R&D collaboration with Kinis AI, bridging academic research and practical technology.'})},
  {year: '2025', text: translate({message: 'Supported OhStem in running robotics competitions and activities for students and young engineers.'})},
  {year: 'Aug 2025', text: translate({message: 'Competed in Bách Khoa Innovation: INNOTECH with the Low-Cost Smart Irrigation System – HCMUT.'})},
  {year: 'Jun 2026', text: translate({message: 'Partnered with Heineken Vietnam and HCMUT on a humanoid-robot pilot for industrial manufacturing.'})},
];

const facilities = [
  {icon: '🤖', label: translate({message: 'Robotics & prototyping workspace'})},
  {icon: '🔧', label: translate({message: 'Electronics & PCB rework bench'})},
  {icon: '🐞', label: translate({message: 'Embedded / firmware debug stations'})},
  {icon: '🖨️', label: translate({message: '3D printing & mechanical fabrication'})},
  {icon: '🧠', label: translate({message: 'Edge-AI compute (Jetson / GPU)'})},
  {icon: '⚙️', label: translate({message: 'Sensors, motors & test equipment'})},
];

export default function About(): JSX.Element {
  return (
    <Layout
      title={translate({message: 'About ACLAB'})}
      description={translate({message: 'About the Advanced Computing Lab at HCMUT — mission, vision, history, leadership and facilities.'})}>
      <PageHero
        kicker={translate({message: 'About'})}
        title={translate({message: 'About ACLAB'})}
        subtitle={translate({message: 'The Advanced Computing Lab (ACLAB) at HCMUT is a research and engineering lab building intelligent systems across robotics, embedded systems, edge AI, IoT and hardware-software co-design.'})}
        breadcrumb={[{label: translate({message: 'Home'}), to: '/'}, {label: translate({message: 'About'})}]}
      />

      <Section variant="surface">
        <SectionHead
          kicker={translate({message: 'Who we are'})}
          title={translate({message: 'Mission, vision & approach.'})}
        />
        <div className={styles.values}>
          {values.map((v) => (
            <div key={v.title} className={styles.valueCard}>
              <div className={styles.valueIcon} aria-hidden>{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="alt">
        <div className={styles.story}>
          <div>
            <SectionHead
              kicker={translate({message: 'Our story'})}
              title={translate({message: 'History & milestones'})}
            />
            <div className={styles.timeline}>
              {history.map((h) => (
                <div key={h.year} className={styles.timeItem}>
                  <span className={styles.timeYear}>{h.year}</span>
                  <p>{h.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.leadCard}>
            <div className={styles.leadHead}>
              <img
                className={styles.leadAvatar}
                src={useBaseUrl('/img/people/le-trong-nhan.jpg')}
                alt="Dr. Lê Trọng Nhân"
              />
              <div>
                <div className={styles.leadName}>Dr. Lê Trọng Nhân</div>
                <div className={styles.leadRole}>
                  <Translate>Head of Lab (HOD) · ACLAB</Translate>
                </div>
              </div>
            </div>
            <div className={styles.leadBody}>
              <div className={styles.leadRow}>
                <strong><Translate>Faculty</Translate></strong>
                <span><Translate>Computer Science & Engineering, HCMUT</Translate></span>
              </div>
              <div className={styles.leadRow}>
                <strong><Translate>Scholar</Translate></strong>
                <a
                  href="https://scholar.google.com/citations?user=nLfZASYAAAAJ"
                  target="_blank"
                  rel="noreferrer">
                  Google Scholar ↗
                </a>
              </div>
              <div style={{marginTop: '1.1rem'}}>
                <Btn to="/people" variant="outline">
                  <Translate>Meet the team</Translate>
                </Btn>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section variant="surface">
        <SectionHead
          kicker={translate({message: 'Facilities'})}
          title={translate({message: 'Where we build.'})}
          intro={translate({message: 'A working engineering lab — electronics benches, prototyping tools and edge-AI compute.'})}
        />
        <div className={styles.facilities}>
          {facilities.map((f) => (
            <div key={f.label} className={styles.facility}>
              <span className={styles.facilityIcon} aria-hidden>{f.icon}</span>
              <span>{f.label}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="alt">
        <CTABanner
          title={translate({message: 'Want to work with us?'})}
          text={translate({message: 'Reach out for collaboration, student membership or visiting the lab.'})}
          actions={
            <>
              <Btn to="/contact" variant="ghost"><Translate>Contact us</Translate></Btn>
              <Btn to="/join" variant="ghost"><Translate>Join ACLAB</Translate></Btn>
            </>
          }
        />
      </Section>
    </Layout>
  );
}

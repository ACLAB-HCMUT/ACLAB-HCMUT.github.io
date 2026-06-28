import React from 'react';
import Layout from '@theme/Layout';
import {Btn, Grid, PageHero, Section, SectionHead, TagList} from '../components';
import styles from './pages.module.css';

const positions = [
  {
    title: 'Undergraduate Research Member',
    reqs: ['Strong interest in robotics / embedded / AI', 'Basic C/C++ or Python', 'Willing to learn hardware & firmware'],
    tags: ['Embedded', 'Robotics', 'Edge AI'],
  },
  {
    title: 'Graduate Researcher (MSc/PhD)',
    reqs: ['Background in EE/CE/CS or related', 'Research experience is a plus', 'Commitment to a research direction'],
    tags: ['Autonomous Systems', 'Co-design', 'Publications'],
  },
  {
    title: 'Hardware / PCB Engineer (Student)',
    reqs: ['Familiar with KiCad/Altium', 'Understanding of analog/digital circuits', 'Interest in DFM & prototyping'],
    tags: ['PCB', 'DFM', 'Power'],
  },
];

const steps = [
  {title: 'Apply', text: 'Send your CV, transcript and a short note about your interests to the lab email.'},
  {title: 'Interview', text: 'A short technical conversation about your background and what you want to build.'},
  {title: 'Trial project', text: 'Work on a small starter task with a mentor to get hands-on with the lab workflow.'},
  {title: 'Onboard', text: 'Join a project team and start with the Member Onboarding guides in the Knowledge Base.'},
];

export default function Join(): JSX.Element {
  return (
    <Layout title="Join ACLAB" description="Join ACLAB HCMUT — open positions for students and researchers, requirements and application process.">
      <PageHero
        kicker="Join Us"
        title="Join ACLAB"
        subtitle="We recruit motivated students and researchers who want to build real intelligent systems — robots, embedded devices, custom hardware and edge AI."
        breadcrumb={[{label: 'Home', to: '/'}, {label: 'Join Us'}]}
      />

      <Section variant="surface">
        <SectionHead kicker="Open positions" title="Who we are looking for." />
        <Grid cols={3}>
          {positions.map((p) => (
            <div key={p.title} className={styles.positionCard}>
              <h3>{p.title}</h3>
              <div style={{margin: '.6rem 0'}}><TagList tags={p.tags} /></div>
              <strong style={{fontSize: '.85rem', color: 'var(--aclab-ink)'}}>Requirements</strong>
              <ul>
                {p.reqs.map((r) => <li key={r}>{r}</li>)}
              </ul>
            </div>
          ))}
        </Grid>
      </Section>

      <Section variant="alt">
        <SectionHead kicker="Process" title="How to apply." intro="A simple, four-step process from application to onboarding." />
        <div className={styles.steps}>
          {steps.map((s, i) => (
            <div key={s.title} className={styles.step}>
              <div className={styles.stepNum}>{i + 1}</div>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{marginTop: '1.8rem', display: 'flex', gap: '.8rem', flexWrap: 'wrap'}}>
          <Btn to="mailto:aclab@hcmut.edu.vn?subject=ACLAB%20Application" variant="primary">Apply by email</Btn>
          <Btn to="/contact" variant="outline">Ask a question</Btn>
        </div>
      </Section>
    </Layout>
  );
}

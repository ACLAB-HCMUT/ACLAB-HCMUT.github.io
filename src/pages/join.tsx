import React from 'react';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import {Btn, Grid, PageHero, Section, SectionHead, TagList} from '../components';
import styles from './pages.module.css';

const positions = [
  {
    title: translate({message: 'Undergraduate Research Member'}),
    reqs: [
      translate({message: 'Strong interest in robotics / embedded / AI'}),
      translate({message: 'Basic C/C++ or Python'}),
      translate({message: 'Willing to learn hardware & firmware'}),
    ],
    tags: ['Embedded', 'Robotics', 'Edge AI'],
  },
  {
    title: translate({message: 'Graduate Researcher (MSc/PhD)'}),
    reqs: [
      translate({message: 'Background in EE/CE/CS or related'}),
      translate({message: 'Research experience is a plus'}),
      translate({message: 'Commitment to a research direction'}),
    ],
    tags: ['Autonomous Systems', 'Co-design', 'Publications'],
  },
  {
    title: translate({message: 'Hardware / PCB Engineer (Student)'}),
    reqs: [
      translate({message: 'Familiar with KiCad/Altium'}),
      translate({message: 'Understanding of analog/digital circuits'}),
      translate({message: 'Interest in DFM & prototyping'}),
    ],
    tags: ['PCB', 'DFM', 'Power'],
  },
];

const steps = [
  {title: translate({message: 'Apply'}), text: translate({message: 'Send your CV, transcript and a short note about your interests to the lab email.'})},
  {title: translate({message: 'Interview'}), text: translate({message: 'A short technical conversation about your background and what you want to build.'})},
  {title: translate({message: 'Trial project'}), text: translate({message: 'Work on a small starter task with a mentor to get hands-on with the lab workflow.'})},
  {title: translate({message: 'Onboard'}), text: translate({message: 'Join a project team and start with the Member Onboarding guides in the Knowledge Base.'})},
];

export default function Join(): JSX.Element {
  return (
    <Layout title={translate({message: 'Join ACLAB'})} description={translate({message: 'Join ACLAB HCMUT — open positions for students and researchers, requirements and application process.'})}>
      <PageHero
        kicker={translate({message: 'Join Us'})}
        title={translate({message: 'Join ACLAB'})}
        subtitle={translate({message: 'We recruit motivated students and researchers who want to build real intelligent systems — robots, embedded devices, custom hardware and edge AI.'})}
        breadcrumb={[{label: translate({message: 'Home'}), to: '/'}, {label: translate({message: 'Join Us'})}]}
        bg3d
      />

      <Section variant="surface">
        <SectionHead kicker={translate({message: 'Open positions'})} title={translate({message: 'Who we are looking for.'})} />
        <Grid cols={3}>
          {positions.map((p) => (
            <div key={p.title} className={styles.positionCard}>
              <h3>{p.title}</h3>
              <div style={{margin: '.6rem 0'}}><TagList tags={p.tags} /></div>
              <strong style={{fontSize: '.85rem', color: 'var(--aclab-ink)'}}><Translate>Requirements</Translate></strong>
              <ul>
                {p.reqs.map((r) => <li key={r}>{r}</li>)}
              </ul>
            </div>
          ))}
        </Grid>
      </Section>

      <Section variant="alt">
        <SectionHead kicker={translate({message: 'Process'})} title={translate({message: 'How to apply.'})} intro={translate({message: 'A simple, four-step process from application to onboarding.'})} />
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
          <Btn to="mailto:caotiendattx@gmail.com?subject=ACLAB%20Application" variant="primary"><Translate>Apply by email</Translate></Btn>
          <Btn to="/contact" variant="outline"><Translate>Ask a question</Translate></Btn>
        </div>
      </Section>
    </Layout>
  );
}

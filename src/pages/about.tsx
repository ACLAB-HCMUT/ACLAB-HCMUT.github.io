import React from 'react';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';

import {
  Btn,
  CTABanner,
  FeatureCard,
  Grid,
  IconTile,
  InfoCard,
  PageHero,
  ProfileHeader,
  Section,
  SectionHead,
  Split,
  Timeline,
} from '../components';

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
        <Grid cols={3}>
          {values.map((v) => (
            <FeatureCard key={v.title} icon={v.icon} title={v.title} description={v.text} />
          ))}
        </Grid>
      </Section>

      <Section variant="alt">
        <Split>
          <div>
            <SectionHead
              kicker={translate({message: 'Our story'})}
              title={translate({message: 'History & milestones'})}
            />
            <Timeline
              items={history.map((h) => ({label: h.year, content: h.text}))}
            />
          </div>

          <InfoCard
            sticky
            header={
              <ProfileHeader
                photo={useBaseUrl('/img/people/le-trong-nhan.jpg')}
                name="Dr. Lê Trọng Nhân"
                role={<Translate>Head of Lab (HOD) · ACLAB</Translate>}
              />
            }
            rows={[
              {
                label: <Translate>Faculty</Translate>,
                value: <Translate>Computer Science & Engineering, HCMUT</Translate>,
              },
              {
                label: <Translate>Scholar</Translate>,
                value: (
                  <a
                    href="https://scholar.google.com/citations?user=nLfZASYAAAAJ"
                    target="_blank"
                    rel="noreferrer">
                    Google Scholar ↗
                  </a>
                ),
              },
            ]}
            footer={
              <Btn to="/people" variant="outline">
                <Translate>Meet the team</Translate>
              </Btn>
            }
          />
        </Split>
      </Section>

      <Section variant="surface">
        <SectionHead
          kicker={translate({message: 'Facilities'})}
          title={translate({message: 'Where we build.'})}
          intro={translate({message: 'A working engineering lab — electronics benches, prototyping tools and edge-AI compute.'})}
        />
        <Grid cols={3}>
          {facilities.map((f) => (
            <IconTile key={f.label} icon={f.icon}>
              {f.label}
            </IconTile>
          ))}
        </Grid>
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

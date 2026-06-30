import React from 'react';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';

import {
  Arrow,
  Btn,
  Container,
  CountUp,
  CTABanner,
  Grid,
  MemberCard,
  Partner,
  ProjectCard,
  ResearchCard,
  Section,
  SectionHead,
  StatItem,
} from '../components';
import Hero3D from '../components/hero3d/Hero3D';
import {researchAreas} from '../data/research';
import {featuredProjects} from '../data/projects';
import {peopleHighlight} from '../data/people';
import {stats, partners} from '../data/site';

import styles from './index.module.css';

function HomeHero() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroBg} aria-hidden>
        <Hero3D
          count={120}
          pointColor={0x0b4f93}
          lineColor={0x2f7fc4}
          pointSize={0.14}
          pointOpacity={0.8}
          lineOpacity={0.25}
        />
      </div>
      <div className={styles.heroScrim} aria-hidden />
      <Container>
        <div className={styles.heroGrid}>
          <div className={styles.heroText}>
            <span className={styles.eyebrow}><Translate>Advanced Computing Lab · HCMUT</Translate></span>
            <h1 className={styles.heroTitle}>
              <Translate>Engineering intelligent systems from chip to robot.</Translate>
            </h1>
            <p className={styles.heroSubtitle}>
              <Translate>
                ACLAB is a university research lab at HCMUT working across intelligent
                robotics, embedded systems, edge AI, IoT and hardware-software co-design —
                from custom PCBs and firmware to autonomous robots.
              </Translate>
            </p>
            <div className={styles.heroActions}>
              <Btn to="/research" variant="primary"><Translate>Explore Research</Translate> <Arrow /></Btn>
              <Btn to="/projects" variant="outline"><Translate>View Projects</Translate></Btn>
            </div>
            <div className={styles.heroMeta}>
              <div>
                <CountUp className={styles.metaValue} value="6" />
                <span className={styles.metaLabel}><Translate>Research areas</Translate></span>
              </div>
              <div>
                <CountUp className={styles.metaValue} value="5" />
                <span className={styles.metaLabel}><Translate>Partners</Translate></span>
              </div>
              <div>
                <CountUp className={styles.metaValue} value="2" />
                <span className={styles.metaLabel}><Translate>Courses</Translate></span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title={translate({message: 'Advanced Computing Lab (ACLAB) — HCMUT'})}
      description={translate({message: 'ACLAB HCMUT — applied research in intelligent robotics, embedded systems, edge AI, IoT and hardware-software co-design.'})}>
      <main>
        <HomeHero />

        {/* 3 — Research Areas */}
        <Section variant="surface" id="research">
          <SectionHead
            kicker={translate({message: 'Research Areas'})}
            title={translate({message: 'Where we focus.'})}
            intro={translate({message: 'Applied research and engineering across the full intelligent-systems stack — hardware, firmware and AI.'})}
          />
          <Grid cols={3}>
            {researchAreas.map((a) => (
              <ResearchCard
                key={a.slug}
                icon={a.icon}
                title={a.title}
                description={a.description}
                tags={a.tags}
                to={`/research#${a.slug}`}
              />
            ))}
          </Grid>
        </Section>

        {/* 4 — Featured Projects */}
        <Section variant="alt" id="projects">
          <SectionHead
            row
            kicker={translate({message: 'Featured Projects'})}
            title={translate({message: 'What we are building.'})}
            aside={<Btn to="/projects" variant="outline"><Translate>All projects</Translate> <Arrow /></Btn>}
          />
          <Grid cols={3}>
            {featuredProjects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </Grid>
        </Section>

        {/* 5 — Lab Statistics */}
        <Section variant="surface">
          <Grid cols={4}>
            {stats.map((s) => (
              <StatItem key={s.label} value={s.value} label={s.label} />
            ))}
          </Grid>
        </Section>

        {/* 6 — People Highlight */}
        <Section variant="alt">
          <SectionHead
            row
            kicker={translate({message: 'People'})}
            title={translate({message: 'The people behind ACLAB.'})}
            aside={<Btn to="/people" variant="outline"><Translate>Meet the team</Translate> <Arrow /></Btn>}
          />
          <Grid cols={4}>
            {peopleHighlight.map((m, i) => (
              <MemberCard key={`${m.name}-${i}`} member={m} />
            ))}
          </Grid>
        </Section>

        {/* 7 — Partners */}
        <Section variant="surface">
          <SectionHead
            kicker={translate({message: 'Partners & Affiliations'})}
            title={translate({message: 'We collaborate broadly.'})}
            intro={translate({message: 'ACLAB works with academic units, research institutes and industry partners.'})}
          />
          <Grid cols={4}>
            {partners.map((p) => (
              <Partner key={p.name} name={p.name} url={p.url} />
            ))}
          </Grid>
          <div style={{marginTop: '1.4rem', textAlign: 'center'}}>
            <Btn to="/partners" variant="outline"><Translate>View all partners</Translate></Btn>
          </div>
        </Section>

        {/* 8 — CTA */}
        <Section variant="alt">
          <CTABanner
            kicker={translate({message: 'Get involved'})}
            title={translate({message: 'Join ACLAB or collaborate with us.'})}
            text={translate({message: 'We welcome students who want to build real intelligent systems, and partners looking to collaborate on applied research and engineering.'})}
            actions={
              <>
                <Btn to="/join" variant="ghost"><Translate>Join ACLAB</Translate> <Arrow /></Btn>
                <Btn to="/contact" variant="ghost"><Translate>Partner with us</Translate></Btn>
              </>
            }
          />
        </Section>
      </main>
    </Layout>
  );
}

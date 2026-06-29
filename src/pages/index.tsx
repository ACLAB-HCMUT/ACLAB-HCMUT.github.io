import React from 'react';
import Layout from '@theme/Layout';

import {
  Arrow,
  Btn,
  Container,
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
import {researchAreas} from '../data/research';
import {featuredProjects} from '../data/projects';
import {peopleHighlight} from '../data/people';
import {stats, partners} from '../data/site';

import styles from './index.module.css';

function HomeHero() {
  return (
    <header className={styles.hero}>
      <Container>
        <div className={styles.heroGrid}>
          <div>
            <span className={styles.eyebrow}>Advanced Computing Lab · HCMUT</span>
            <h1 className={styles.heroTitle}>
              Engineering <em>intelligent systems</em> from chip to robot.
            </h1>
            <p className={styles.heroSubtitle}>
              ACLAB is a university research lab at HCMUT working across intelligent
              robotics, embedded systems, edge AI, IoT and hardware-software co-design —
              from custom PCBs and firmware to autonomous robots.
            </p>
            <div className={styles.heroActions}>
              <Btn to="/research" variant="primary">Explore Research <Arrow /></Btn>
              <Btn to="/projects" variant="outline">View Projects</Btn>
            </div>
            <div className={styles.heroMeta}>
              <div>
                <span className={styles.metaValue}>6</span>
                <span className={styles.metaLabel}>Research areas</span>
              </div>
              <div>
                <span className={styles.metaValue}>25+</span>
                <span className={styles.metaLabel}>Active projects</span>
              </div>
              <div>
                <span className={styles.metaValue}>40+</span>
                <span className={styles.metaLabel}>Members</span>
              </div>
            </div>
          </div>

          <div className={styles.graph} aria-label="ACLAB research knowledge graph">
            <div className={`${styles.orbit} ${styles.orbitOuter}`} />
            <div className={`${styles.orbit} ${styles.orbitInner}`} />
            <div className={styles.core}>ACLAB</div>
            <div className={`${styles.node} ${styles.nodeTop}`}>Robotics</div>
            <div className={`${styles.node} ${styles.nodeRight}`}>Edge AI</div>
            <div className={`${styles.node} ${styles.nodeBottom}`}>Embedded</div>
            <div className={`${styles.node} ${styles.nodeLeft}`}>IoT</div>
            <div className={`${styles.node} ${styles.nodeTL}`}>PCB</div>
            <div className={`${styles.node} ${styles.nodeBR}`}>Autonomous</div>
          </div>
        </div>
      </Container>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Advanced Computing Lab (ACLAB) — HCMUT"
      description="ACLAB HCMUT — applied research in intelligent robotics, embedded systems, edge AI, IoT and hardware-software co-design.">
      <main>
        <HomeHero />

        {/* 3 — Research Areas */}
        <Section variant="surface" id="research">
          <SectionHead
            kicker="Research Areas"
            title="Where we focus."
            intro="Applied research and engineering across the full intelligent-systems stack — hardware, firmware and AI."
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
            kicker="Featured Projects"
            title="What we are building."
            aside={<Btn to="/projects" variant="outline">All projects <Arrow /></Btn>}
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
            kicker="People"
            title="The people behind ACLAB."
            aside={<Btn to="/people" variant="outline">Meet the team <Arrow /></Btn>}
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
            kicker="Partners & Affiliations"
            title="We collaborate broadly."
            intro="ACLAB works with academic units, research institutes and industry partners."
          />
          <Grid cols={4}>
            {partners.map((p) => (
              <Partner key={p.name} name={p.name} url={p.url} />
            ))}
          </Grid>
          <div style={{marginTop: '1.4rem', textAlign: 'center'}}>
            <Btn to="/partners" variant="outline">View all partners</Btn>
          </div>
        </Section>

        {/* 8 — CTA */}
        <Section variant="alt">
          <CTABanner
            kicker="Get involved"
            title="Join ACLAB or collaborate with us."
            text="We welcome students who want to build real intelligent systems, and partners looking to collaborate on applied research and engineering."
            actions={
              <>
                <Btn to="/join" variant="ghost">Join ACLAB <Arrow /></Btn>
                <Btn to="/contact" variant="ghost">Partner with us</Btn>
              </>
            }
          />
        </Section>
      </main>
    </Layout>
  );
}

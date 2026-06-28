import React from 'react';
import Layout from '@theme/Layout';
import {Btn, CTABanner, Grid, PageHero, Section, SectionHead, TagList} from '../components';
import {researchAreas} from '../data/research';
import {projects} from '../data/projects';
import ui from '../components/ui.module.css';
import styles from './pages.module.css';

export default function Research(): JSX.Element {
  return (
    <Layout title="Research — ACLAB" description="Research areas at ACLAB HCMUT: intelligent robotics, embedded & edge AI, autonomous systems, IoT, hardware-software co-design and smart manufacturing.">
      <PageHero
        kicker="Research"
        title="Research Areas"
        subtitle="We pursue applied research and engineering across six areas — combining hardware, firmware and AI to build real intelligent systems."
        breadcrumb={[{label: 'Home', to: '/'}, {label: 'Research'}]}
      />

      <Section variant="surface">
        <Grid cols={2}>
          {researchAreas.map((area) => {
            const related = projects.filter((p) => p.area === area.title).slice(0, 2);
            return (
              <div key={area.slug} id={area.slug} className={styles.infoCard} style={{scrollMarginTop: '90px'}}>
                <div className={ui.researchIcon} aria-hidden="true">{area.icon}</div>
                <h3 style={{fontSize: '1.25rem'}}>{area.title}</h3>
                <p style={{color: 'var(--aclab-body)', lineHeight: 1.65}}>{area.description}</p>
                <div style={{margin: '.8rem 0'}}><TagList tags={area.tags} /></div>
                {related.length > 0 && (
                  <p style={{fontSize: '.85rem', color: 'var(--aclab-muted)', margin: '.4rem 0 0'}}>
                    <strong style={{color: 'var(--aclab-ink)'}}>Related projects: </strong>
                    {related.map((r, i) => (
                      <React.Fragment key={r.slug}>
                        {i > 0 && ', '}
                        <a href={`/projects#${r.slug}`}>{r.title}</a>
                      </React.Fragment>
                    ))}
                  </p>
                )}
              </div>
            );
          })}
        </Grid>
      </Section>

      <Section variant="alt">
        <SectionHead
          row
          kicker="Output"
          title="Projects & publications."
          aside={<Btn to="/projects" variant="outline">Browse projects</Btn>}
        />
        <p className={styles.lead}>
          Each research area feeds into concrete projects, prototypes and publications. Explore
          the projects gallery for technical details, team, architecture and results, or visit
          the Knowledge Base for technical guides.
        </p>
        <div style={{marginTop: '1.4rem', display: 'flex', gap: '.8rem', flexWrap: 'wrap'}}>
          <Btn to="/projects" variant="primary">View projects</Btn>
          <Btn to="/docs/intro" variant="outline">Knowledge Base</Btn>
        </div>
      </Section>

      <Section variant="surface">
        <CTABanner
          title="Interested in our research?"
          text="Join the lab as a student researcher, or collaborate with us on applied projects."
          actions={<><Btn to="/join" variant="ghost">Join ACLAB</Btn><Btn to="/contact" variant="ghost">Collaborate</Btn></>}
        />
      </Section>
    </Layout>
  );
}

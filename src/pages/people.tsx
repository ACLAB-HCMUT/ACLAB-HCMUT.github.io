import React from 'react';
import Layout from '@theme/Layout';
import {CTABanner, Grid, MemberCard, PageHero, Section, Btn} from '../components';
import {peopleGroups} from '../data/people';
import styles from './pages.module.css';

export default function People(): JSX.Element {
  return (
    <Layout title="People — ACLAB" description="The people of ACLAB HCMUT: faculty, researchers, students and alumni.">
      <PageHero
        kicker="People"
        title="People"
        subtitle="Faculty, researchers, students and alumni building intelligent systems at ACLAB."
        breadcrumb={[{label: 'Home', to: '/'}, {label: 'People'}]}
      />

      {peopleGroups.map((group, idx) => (
        <Section key={group.id} variant={idx % 2 === 0 ? 'surface' : 'alt'} id={group.id}>
          <h2 className={styles.groupTitle}>
            {group.label}
            <span className={styles.groupCount}>{group.members.length}</span>
          </h2>
          <Grid cols={4}>
            {group.members.map((m, i) => (
              <MemberCard key={`${m.name}-${i}`} member={m} />
            ))}
          </Grid>
        </Section>
      ))}

      <Section variant="surface">
        <CTABanner
          title="Want to join the team?"
          text="We recruit motivated students every year and welcome research collaborators."
          actions={<><Btn to="/join" variant="ghost">Open positions</Btn><Btn to="/contact" variant="ghost">Contact us</Btn></>}
        />
      </Section>
    </Layout>
  );
}

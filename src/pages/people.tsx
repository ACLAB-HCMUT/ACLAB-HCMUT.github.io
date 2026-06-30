import React from 'react';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import {CTABanner, Grid, MemberCard, PageHero, Section, Btn} from '../components';
import {peopleGroups} from '../data/people';
import styles from './pages.module.css';

export default function People(): JSX.Element {
  return (
    <Layout title={translate({message: 'People — ACLAB'})} description={translate({message: 'The people of ACLAB HCMUT — faculty leadership and a growing team of student members and collaborators.'})}>
      <PageHero
        kicker={translate({message: 'People'})}
        title={translate({message: 'People'})}
        subtitle={translate({message: 'ACLAB is led by faculty at HCMUT and is actively growing its team of student members and research collaborators.'})}
        breadcrumb={[{label: translate({message: 'Home'}), to: '/'}, {label: translate({message: 'People'})}]}
        bg3d
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
          title={translate({message: 'Want to join the team?'})}
          text={translate({message: 'We recruit motivated students every year and welcome research collaborators.'})}
          actions={<><Btn to="/join" variant="ghost"><Translate>Open positions</Translate></Btn><Btn to="/contact" variant="ghost"><Translate>Contact us</Translate></Btn></>}
        />
      </Section>
    </Layout>
  );
}

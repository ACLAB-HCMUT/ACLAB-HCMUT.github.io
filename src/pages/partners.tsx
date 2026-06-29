import React from 'react';
import Layout from '@theme/Layout';
import {Btn, CTABanner, Grid, PageHero, Section, SectionHead} from '../components';
import {partners, type Partner} from '../data/site';
import styles from './pages.module.css';

const groups: {id: Partner['category']; title: string; intro: string}[] = [
  {
    id: 'Academic',
    title: 'Academic',
    intro: 'Universities and faculties ACLAB is part of and works with.',
  },
  {
    id: 'Industry',
    title: 'Industry',
    intro: 'Companies collaborating with ACLAB on applied R&D and technology transfer.',
  },
  {
    id: 'Research',
    title: 'Research',
    intro: 'Research centers and labs partnering on joint projects.',
  },
];

function PartnerCard({p}: {p: Partner}): JSX.Element {
  return (
    <div className={styles.infoCard}>
      <h3 style={{fontSize: '1.2rem', marginBottom: '.5rem'}}>
        {p.url ? (
          <a href={p.url} target="_blank" rel="noopener noreferrer">
            {p.name}
          </a>
        ) : (
          p.name
        )}
      </h3>
      {p.blurb && (
        <p style={{color: 'var(--aclab-body)', lineHeight: 1.65, margin: 0}}>{p.blurb}</p>
      )}
      {p.url && (
        <p style={{margin: '.8rem 0 0'}}>
          <a href={p.url} target="_blank" rel="noopener noreferrer">
            Visit website ↗
          </a>
        </p>
      )}
    </div>
  );
}

export default function Partners(): JSX.Element {
  return (
    <Layout
      title="Partners — ACLAB"
      description="Academic, industry and research partners collaborating with the Advanced Computing Lab (ACLAB) at HCMUT.">
      <PageHero
        kicker="Partners"
        title="Partners & Collaborations"
        subtitle="ACLAB works with universities, research centers and industry partners to turn applied research into real intelligent systems."
        breadcrumb={[{label: 'Home', to: '/'}, {label: 'Partners'}]}
      />

      {groups.map((g, i) => {
        const items = partners.filter((p) => p.category === g.id);
        if (items.length === 0) return null;
        return (
          <Section key={g.id} variant={i % 2 === 0 ? 'surface' : 'alt'}>
            <SectionHead kicker={g.title} title={`${g.title} partners`} intro={g.intro} />
            <Grid cols={2}>
              {items.map((p) => (
                <PartnerCard key={p.name} p={p} />
              ))}
            </Grid>
          </Section>
        );
      })}

      <Section variant="surface">
        <CTABanner
          title="Partner with ACLAB"
          text="Interested in joint research, technology transfer or student projects? We'd love to talk."
          actions={
            <>
              <Btn to="/contact" variant="ghost">Contact us</Btn>
              <Btn to="/research" variant="ghost">Our research</Btn>
            </>
          }
        />
      </Section>
    </Layout>
  );
}

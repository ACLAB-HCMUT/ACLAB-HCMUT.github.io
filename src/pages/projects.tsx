import React, {useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import {Grid, PageHero, ProjectCard, Section} from '../components';
import {projects} from '../data/projects';
import styles from './pages.module.css';

const ALL = 'All';

export default function Projects(): JSX.Element {
  const areas = useMemo(() => [ALL, ...Array.from(new Set(projects.map((p) => p.area)))], []);
  const years = useMemo(() => [ALL, ...Array.from(new Set(projects.map((p) => String(p.year)))).sort().reverse()], []);
  const statuses = [ALL, 'Active', 'Ongoing', 'Completed', 'Planned'];

  const [area, setArea] = useState(ALL);
  const [year, setYear] = useState(ALL);
  const [status, setStatus] = useState(ALL);
  const [query, setQuery] = useState('');

  const filtered = projects.filter((p) => {
    if (area !== ALL && p.area !== area) return false;
    if (year !== ALL && String(p.year) !== year) return false;
    if (status !== ALL && p.status !== status) return false;
    if (query) {
      const q = query.toLowerCase();
      const hay = `${p.title} ${p.description} ${p.tags.join(' ')}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  return (
    <Layout
      title={translate({message: 'Projects — ACLAB'})}
      description={translate({message: 'ACLAB projects across robotics, embedded systems, edge AI, IoT and hardware-software co-design — filter by area, year and status.'})}>
      <PageHero
        kicker={translate({message: 'Projects'})}
        title={translate({message: 'Projects'})}
        subtitle={translate({message: 'Robots, AGVs, custom PCBs, embedded devices and edge-AI systems built in the lab. Filter by area, year or status.'})}
        breadcrumb={[{label: translate({message: 'Home'}), to: '/'}, {label: translate({message: 'Projects'})}]}
      />

      <Section variant="surface">
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <span aria-hidden="true">🔍</span>
            <input
              type="search"
              placeholder={translate({message: 'Search projects, tech, keywords…'})}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label={translate({message: 'Search projects'})}
            />
          </div>
          <div className={styles.toolbarGroup}>
            <span className={styles.toolbarLabel}><Translate>Area</Translate></span>
            <select className={styles.select} value={area} onChange={(e) => setArea(e.target.value)} aria-label={translate({message: 'Filter by area'})}>
              {areas.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div className={styles.toolbarGroup}>
            <span className={styles.toolbarLabel}><Translate>Year</Translate></span>
            <select className={styles.select} value={year} onChange={(e) => setYear(e.target.value)} aria-label={translate({message: 'Filter by year'})}>
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div className={styles.toolbarGroup}>
            <span className={styles.toolbarLabel}><Translate>Status</Translate></span>
            <select className={styles.select} value={status} onChange={(e) => setStatus(e.target.value)} aria-label={translate({message: 'Filter by status'})}>
              {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <p className={styles.resultCount}>{filtered.length} project{filtered.length !== 1 ? 's' : ''}</p>

        {filtered.length > 0 ? (
          <Grid cols={3}>
            {filtered.map((p) => (
              <div key={p.slug} id={p.slug} style={{scrollMarginTop: '90px'}}>
                <ProjectCard project={p} />
              </div>
            ))}
          </Grid>
        ) : (
          <p className={styles.empty}><Translate>No projects match these filters yet.</Translate></p>
        )}
      </Section>
    </Layout>
  );
}

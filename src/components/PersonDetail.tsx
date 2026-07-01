import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import clsx from 'clsx';

import {Section, Container} from './index';
import {TagList} from './tags';
import type {Member} from './types';
import styles from './PersonDetail.module.css';

const NA = <span className={styles.na}>N/A</span>;

const has = (v: unknown): boolean =>
  Array.isArray(v) ? v.length > 0 : v != null && v !== '';

function Block({title, children}: {title: string; children: React.ReactNode}) {
  return (
    <section className={clsx(styles.block, styles.reveal)}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

/**
 * Detail page for one lab member (rendered by the `people-detail-pages` plugin
 * at /people/<slug>). Sections mirror a typical academic profile; any field
 * that isn't available shows "N/A". Sections reveal with a subtle fade-up
 * (disabled under prefers-reduced-motion).
 */
export default function PersonDetail({person}: {person: Member}): JSX.Element {
  const p = person ?? ({} as Member);

  return (
    <Layout
      title={`${p.name} — ACLAB`}
      description={`${p.name} — ${p.role}${p.affiliation ? `, ${p.affiliation}` : ''}.`}>
      {/* ---- Header ---- */}
      <header className={styles.header}>
        <Container>
          <div className={clsx(styles.headerInner, styles.reveal)}>
            <div className={styles.photo}>
              {p.photo ? <img src={p.photo} alt={p.name} /> : p.initials}
            </div>
            <div className={styles.headMeta}>
              <p className={styles.crumb}>
                <Link to="/people">People</Link>
                <span> / </span>
                {p.group || 'Member'}
              </p>
              <h1 className={styles.name}>{p.name}</h1>
              <p className={styles.role}>{p.role || NA}</p>
              <p className={styles.affil}>{p.affiliation || NA}</p>
              <div className={styles.links}>
                {has(p.links) ? (
                  p.links!.map((l) => (
                    <a
                      key={l.label}
                      className={styles.linkBtn}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer">
                      {l.label}
                    </a>
                  ))
                ) : (
                  <span className={styles.na}>No public links yet (N/A)</span>
                )}
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* ---- Sections ---- */}
      <Section variant="surface">
        <Container>
          <div className={styles.body}>
            <Block title="Biography">
              {has(p.bio) ? <p>{p.bio}</p> : <p>{NA}</p>}
            </Block>

            <Block title="Research interests">
              {has(p.researchAreas) ? (
                <TagList tags={p.researchAreas!} />
              ) : has(p.interests) ? (
                <p>{p.interests}</p>
              ) : (
                <p>{NA}</p>
              )}
            </Block>

            <Block title="Education">
              {has(p.education) ? (
                <div className={styles.cards}>
                  {p.education!.map((e) => (
                    <div key={e.degree} className={styles.eduCard}>
                      <div className={styles.eduDegree}>{e.degree}</div>
                      <div className={styles.eduInst}>{e.institution || NA}</div>
                      {e.years && <div className={styles.eduYears}>{e.years}</div>}
                    </div>
                  ))}
                </div>
              ) : (
                <p>{NA}</p>
              )}
            </Block>

            <Block title="Experience">
              {has(p.experience) ? (
                <ul className={styles.timeline}>
                  {p.experience!.map((x) => (
                    <li key={`${x.title}-${x.period ?? ''}`} className={styles.tItem}>
                      <div className={styles.tPeriod}>{x.period || '—'}</div>
                      <div className={styles.tBody}>
                        <div className={styles.tTitle}>{x.title}</div>
                        {x.org && <div className={styles.tOrg}>{x.org}</div>}
                        {x.description && <p className={styles.tDesc}>{x.description}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{NA}</p>
              )}
            </Block>

            <Block title="Awards & Certifications">
              {has(p.awards) ? (
                <ul className={styles.awards}>
                  {p.awards!.map((a) => (
                    <li key={a.title}>
                      <strong>{a.title}</strong>
                      {a.org ? ` — ${a.org}` : ''}
                      {a.year ? ` (${a.year})` : ''}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{NA}</p>
              )}
            </Block>

            <Block title="Projects">
              {has(p.projects) ? (
                <ul>
                  {p.projects!.map((pr) => (
                    <li key={pr.label}>
                      {pr.to ? <Link to={pr.to}>{pr.label}</Link> : pr.label}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{NA}</p>
              )}
            </Block>

            <Block title="Publications">
              {p.publicationsUrl ? (
                <p>
                  <a
                    href={p.publicationsUrl}
                    target="_blank"
                    rel="noopener noreferrer">
                    View publications →
                  </a>
                </p>
              ) : (
                <p>{NA}</p>
              )}
            </Block>

            <p className={styles.back}>
              <Link to="/people">← Back to People</Link>
            </p>
          </div>
        </Container>
      </Section>
    </Layout>
  );
}

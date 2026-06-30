import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

import {Section, Container} from './index';
import {TagList} from './tags';
import type {Member} from './types';
import styles from './PersonDetail.module.css';

const NA = <span className={styles.na}>N/A</span>;

function Fact({label, children}: {label: string; children: React.ReactNode}) {
  return (
    <>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </>
  );
}

/**
 * Detail page for one lab member. Rendered by the `people-detail-pages` plugin
 * at /people/<slug>. Any field that isn't available shows "N/A".
 */
export default function PersonDetail({person}: {person: Member}): JSX.Element {
  const p = person ?? ({} as Member);

  return (
    <Layout
      title={`${p.name} — ACLAB`}
      description={`${p.name} — ${p.role}${p.affiliation ? `, ${p.affiliation}` : ''}.`}>
      <Section variant="surface">
        <Container>
          <p style={{marginBottom: '1.4rem'}}>
            <Link to="/people">← Back to People</Link>
          </p>

          <div className={styles.wrap}>
            {/* Photo + quick facts */}
            <aside className={styles.aside}>
              <div className={styles.photo}>
                {p.photo ? <img src={p.photo} alt={p.name} /> : p.initials}
              </div>

              <dl className={styles.facts}>
                <Fact label="Role">{p.role || NA}</Fact>
                <Fact label="Group">{p.group || NA}</Fact>
                <Fact label="Affiliation">{p.affiliation || NA}</Fact>
                <Fact label="Email">
                  {p.email ? <a href={`mailto:${p.email}`}>{p.email}</a> : NA}
                </Fact>
                <Fact label="Office">{p.office || NA}</Fact>
              </dl>

              <div className={styles.links}>
                {p.links && p.links.length > 0 ? (
                  p.links.map((l) => (
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
            </aside>

            {/* Detailed sections */}
            <div>
              <div className={styles.section}>
                <h2>Biography</h2>
                <p>{p.bio || NA}</p>
              </div>

              <div className={styles.section}>
                <h2>Research interests</h2>
                {p.researchAreas && p.researchAreas.length > 0 ? (
                  <TagList tags={p.researchAreas} />
                ) : p.interests ? (
                  <p>{p.interests}</p>
                ) : (
                  <p>{NA}</p>
                )}
              </div>

              <div className={styles.section}>
                <h2>Education</h2>
                {p.education && p.education.length > 0 ? (
                  <ul>
                    {p.education.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{NA}</p>
                )}
              </div>

              <div className={styles.section}>
                <h2>Projects</h2>
                {p.projects && p.projects.length > 0 ? (
                  <ul>
                    {p.projects.map((pr) => (
                      <li key={pr.label}>
                        {pr.to ? <Link to={pr.to}>{pr.label}</Link> : pr.label}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>{NA}</p>
                )}
              </div>

              <div className={styles.section}>
                <h2>Publications</h2>
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
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  );
}

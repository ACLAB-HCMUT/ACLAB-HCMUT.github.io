import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

import styles from './ui.module.css';
import {Container} from './primitives';

/* ---------- Section & page-level layout ---------- */

export function Section({
  children,
  variant,
  id,
}: {
  children: React.ReactNode;
  variant?: 'alt' | 'surface';
  id?: string;
}) {
  return (
    <section
      id={id}
      className={clsx(
        styles.section,
        variant === 'alt' && styles.sectionAlt,
        variant === 'surface' && styles.sectionSurface,
      )}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHead({
  kicker,
  title,
  intro,
  row,
  aside,
}: {
  kicker?: string;
  title: string;
  intro?: string;
  row?: boolean;
  aside?: React.ReactNode;
}) {
  if (row) {
    return (
      <div className={styles.sectionHeadRow}>
        <div>
          {kicker && <p className={styles.kicker}>{kicker}</p>}
          <h2 className={styles.sectionTitle}>{title}</h2>
        </div>
        {aside ?? (intro && <p className={styles.sectionIntro}>{intro}</p>)}
      </div>
    );
  }
  return (
    <div className={styles.sectionHead}>
      {kicker && <p className={styles.kicker}>{kicker}</p>}
      <h2 className={styles.sectionTitle}>{title}</h2>
      {intro && <p className={styles.sectionIntro}>{intro}</p>}
    </div>
  );
}

export function CTABanner({
  kicker,
  title,
  text,
  actions,
}: {
  kicker?: string;
  title: string;
  text: string;
  actions: React.ReactNode;
}) {
  return (
    <div className={styles.cta}>
      <div>
        {kicker && (
          <p className={styles.kicker} style={{color: '#7fd6ec'}}>
            {kicker}
          </p>
        )}
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <div className={styles.ctaActions}>{actions}</div>
    </div>
  );
}

export function Breadcrumb({trail}: {trail: {label: string; to?: string}[]}) {
  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      {trail.map((t, i) => (
        <React.Fragment key={t.label}>
          {i > 0 && <span>/</span>}
          {t.to ? (
            <Link to={t.to}>{t.label}</Link>
          ) : (
            <span style={{color: 'var(--aclab-body)'}}>{t.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

export function PageHero({
  kicker,
  title,
  subtitle,
  breadcrumb,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  breadcrumb?: {label: string; to?: string}[];
}) {
  return (
    <header className={styles.pageHero}>
      <Container>
        {breadcrumb && <Breadcrumb trail={breadcrumb} />}
        {kicker && (
          <p className={styles.kicker} style={{marginTop: '1rem'}}>
            {kicker}
          </p>
        )}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </Container>
    </header>
  );
}

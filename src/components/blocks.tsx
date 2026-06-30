import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';

import styles from './ui.module.css';
import {Arrow} from './primitives';

/* ---------- Reusable content blocks ----------
   Generic layout/content primitives shared across pages. Keep page-specific
   one-off CSS out of pages — compose these instead. */

/** Two-column split (wide 1.5fr|1fr by default, or even 1fr|1fr); stacks on mobile. */
export function Split({
  children,
  even,
}: {
  children: React.ReactNode;
  even?: boolean;
}) {
  return (
    <div className={clsx(styles.split, even && styles.splitEven)}>{children}</div>
  );
}

/** Icon-chip card: icon + title + description, optional link. */
export function FeatureCard({
  icon,
  title,
  description,
  to,
}: {
  icon: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  to?: string;
}) {
  const inner = (
    <>
      <div className={styles.featureIcon} aria-hidden>
        {icon}
      </div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureText}>{description}</p>
      {to && (
        <span className={styles.cardLink} style={{marginTop: '1rem'}}>
          <Translate>Learn more</Translate> <Arrow />
        </span>
      )}
    </>
  );
  return to ? (
    <Link to={to} className={clsx(styles.card, styles.cardHover, styles.featureCard)}>
      {inner}
    </Link>
  ) : (
    <div className={clsx(styles.card, styles.featureCard)}>{inner}</div>
  );
}

/** Compact icon + label tile (feature lists, facilities, capabilities). */
export function IconTile({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.iconTile}>
      <span className={styles.iconTileIcon} aria-hidden>
        {icon}
      </span>
      <span className={styles.iconTileLabel}>{children}</span>
    </div>
  );
}

/** Vertical timeline (rail + dots). */
export function Timeline({
  items,
}: {
  items: {label: React.ReactNode; content: React.ReactNode}[];
}) {
  return (
    <div className={styles.timeline}>
      {items.map((it, i) => (
        <div key={i} className={styles.timeItem}>
          <span className={styles.timeLabel}>{it.label}</span>
          <p className={styles.timeContent}>{it.content}</p>
        </div>
      ))}
    </div>
  );
}

/** Gradient profile header (photo + name + role) — use as InfoCard `header`. */
export function ProfileHeader({
  photo,
  name,
  role,
}: {
  photo?: string;
  name: React.ReactNode;
  role?: React.ReactNode;
}) {
  return (
    <div className={styles.infoCardHead}>
      {photo && (
        <img
          className={styles.infoCardAvatar}
          src={photo}
          alt={typeof name === 'string' ? name : ''}
        />
      )}
      <div>
        <div className={styles.infoCardName}>{name}</div>
        {role && <div className={styles.infoCardRole}>{role}</div>}
      </div>
    </div>
  );
}

/** Card with an optional header, a definition list of rows, and an optional footer. */
export function InfoCard({
  title,
  header,
  rows,
  footer,
  sticky,
}: {
  title?: React.ReactNode;
  header?: React.ReactNode;
  rows: {label: React.ReactNode; value: React.ReactNode}[];
  footer?: React.ReactNode;
  sticky?: boolean;
}) {
  return (
    <div className={clsx(styles.infoCard, sticky && styles.infoCardSticky)}>
      {header}
      <div className={styles.infoCardBody}>
        {title && <h3 className={styles.infoCardTitle}>{title}</h3>}
        {rows.map((r, i) => (
          <div key={i} className={styles.infoRow}>
            <strong>{r.label}</strong>
            <span>{r.value}</span>
          </div>
        ))}
        {footer && <div className={styles.infoCardFooter}>{footer}</div>}
      </div>
    </div>
  );
}

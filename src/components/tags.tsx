import React from 'react';
import clsx from 'clsx';

import styles from './ui.module.css';
import type {ProjectStatus} from './types';

/* ---------- Tags & status badges ---------- */

export function Tag({children}: {children: React.ReactNode}) {
  return <span className={styles.tag}>{children}</span>;
}

export function TagList({tags}: {tags: string[]}) {
  return (
    <div className={styles.tagRow}>
      {tags.map((t) => (
        <Tag key={t}>{t}</Tag>
      ))}
    </div>
  );
}

export function StatusBadge({status}: {status: ProjectStatus}) {
  const map: Record<ProjectStatus, string> = {
    Active: styles.statusActive,
    Ongoing: styles.statusOngoing,
    Completed: styles.statusCompleted,
    Planned: styles.statusPlanned,
  };
  return <span className={clsx(styles.status, map[status])}>{status}</span>;
}

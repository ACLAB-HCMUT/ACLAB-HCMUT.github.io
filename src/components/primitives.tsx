import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

import styles from './ui.module.css';

/* ---------- Layout & button primitives ---------- */

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={clsx(styles.container, className)}>{children}</div>;
}

export function Arrow() {
  return (
    <span aria-hidden="true" className={styles.arrow}>
      →
    </span>
  );
}

type BtnProps = {
  to: string;
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
};

export function Btn({to, children, variant = 'primary'}: BtnProps) {
  const v =
    variant === 'primary'
      ? styles.btnPrimary
      : variant === 'ghost'
        ? styles.btnGhost
        : styles.btnOutline;
  return (
    <Link className={clsx(styles.btn, v)} to={to}>
      {children}
    </Link>
  );
}

export function Grid({
  cols = 3,
  children,
}: {
  cols?: 2 | 3 | 4;
  children: React.ReactNode;
}) {
  const c = cols === 2 ? styles.grid2 : cols === 4 ? styles.grid4 : styles.grid3;
  return <div className={clsx(styles.grid, c)}>{children}</div>;
}

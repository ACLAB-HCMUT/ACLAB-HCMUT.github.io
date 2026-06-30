import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

import styles from './ui.module.css';
import {Arrow} from './primitives';
import {TagList, StatusBadge} from './tags';
import type {Project, Member, NewsItem} from './types';

/* ---------- Content cards ---------- */

export function ResearchCard({
  icon,
  title,
  description,
  tags,
  to,
}: {
  icon: string;
  title: string;
  description: string;
  tags?: string[];
  to?: string;
}) {
  const inner = (
    <>
      <div className={styles.researchIcon} aria-hidden="true">
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      {tags && <TagList tags={tags} />}
      {to && (
        <span className={styles.cardLink} style={{marginTop: '1rem'}}>
          Learn more <Arrow />
        </span>
      )}
    </>
  );
  if (to) {
    return (
      <Link
        to={to}
        className={clsx(styles.card, styles.cardHover, styles.researchCard)}>
        {inner}
      </Link>
    );
  }
  return <div className={clsx(styles.card, styles.researchCard)}>{inner}</div>;
}

export function ProjectCard({project}: {project: Project}) {
  const href = project.to ?? `/projects#${project.slug}`;
  return (
    <Link
      to={href}
      className={clsx(styles.card, styles.cardHover, styles.projectCard)}>
      <div className={styles.projectMedia}>
        <span>{project.initials}</span>
        <span className={styles.projectStatus}>
          <StatusBadge status={project.status} />
        </span>
      </div>
      <div className={styles.projectBody}>
        <TagList tags={project.tags.slice(0, 3)} />
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <span className={styles.cardLink}>
          View details <Arrow />
        </span>
      </div>
    </Link>
  );
}

export function MemberCard({member}: {member: Member}) {
  return (
    <div className={clsx(styles.card, styles.memberCard)}>
      <div
        className={styles.memberPhoto}
        aria-hidden={member.photo ? undefined : true}>
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            className={styles.memberPhotoImg}
          />
        ) : (
          member.initials
        )}
      </div>
      <h3>{member.name}</h3>
      <p className={styles.memberRole}>{member.role}</p>
      <p className={styles.memberInterests}>{member.interests}</p>
      {member.links && (
        <div className={styles.memberLinks}>
          {member.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export function NewsCard({item}: {item: NewsItem}) {
  return (
    <Link
      to={item.to}
      className={clsx(styles.card, styles.cardHover, styles.newsCard)}>
      <div className={styles.newsMeta}>
        <span className={styles.newsCat}>{item.category}</span>
        <span>•</span>
        <span>{item.date}</span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.excerpt}</p>
      <span className={styles.cardLink}>
        Read more <Arrow />
      </span>
    </Link>
  );
}

export function Partner({name, url}: {name: string; url?: string}) {
  const box = <div className={styles.partner}>{name}</div>;
  return url ? (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.partnerLink}>
      {box}
    </a>
  ) : (
    box
  );
}

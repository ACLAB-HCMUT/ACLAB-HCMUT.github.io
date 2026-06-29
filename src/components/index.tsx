import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './ui.module.css';

/* ---------- Primitives ---------- */

export function Container({children, className}: {children: React.ReactNode; className?: string}) {
  return <div className={clsx(styles.container, className)}>{children}</div>;
}

export function Arrow() {
  return <span aria-hidden="true" className={styles.arrow}>→</span>;
}

type BtnProps = {
  to: string;
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
};
export function Btn({to, children, variant = 'primary'}: BtnProps) {
  const v = variant === 'primary' ? styles.btnPrimary : variant === 'ghost' ? styles.btnGhost : styles.btnOutline;
  return (
    <Link className={clsx(styles.btn, v)} to={to}>
      {children}
    </Link>
  );
}

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

export function Grid({cols = 3, children}: {cols?: 2 | 3 | 4; children: React.ReactNode}) {
  const c = cols === 2 ? styles.grid2 : cols === 4 ? styles.grid4 : styles.grid3;
  return <div className={clsx(styles.grid, c)}>{children}</div>;
}

/* ---------- Tags & status ---------- */

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

export type ProjectStatus = 'Active' | 'Ongoing' | 'Completed' | 'Planned';
export function StatusBadge({status}: {status: ProjectStatus}) {
  const map: Record<ProjectStatus, string> = {
    Active: styles.statusActive,
    Ongoing: styles.statusOngoing,
    Completed: styles.statusCompleted,
    Planned: styles.statusPlanned,
  };
  return <span className={clsx(styles.status, map[status])}>{status}</span>;
}

/* ---------- Cards ---------- */

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
      <div className={styles.researchIcon} aria-hidden="true">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      {tags && <TagList tags={tags} />}
      {to && <span className={styles.cardLink} style={{marginTop: '1rem'}}>Learn more <Arrow /></span>}
    </>
  );
  if (to) {
    return (
      <Link to={to} className={clsx(styles.card, styles.cardHover, styles.researchCard)}>
        {inner}
      </Link>
    );
  }
  return <div className={clsx(styles.card, styles.researchCard)}>{inner}</div>;
}

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  status: ProjectStatus;
  area: string;
  year: number;
  initials: string;
  to?: string;
};

export function ProjectCard({project}: {project: Project}) {
  const href = project.to ?? `/projects#${project.slug}`;
  return (
    <Link to={href} className={clsx(styles.card, styles.cardHover, styles.projectCard)}>
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
        <span className={styles.cardLink}>View details <Arrow /></span>
      </div>
    </Link>
  );
}

export type Member = {
  name: string;
  role: string;
  interests: string;
  initials: string;
  photo?: string;
  links?: {label: string; href: string}[];
};

export function MemberCard({member}: {member: Member}) {
  return (
    <div className={clsx(styles.card, styles.memberCard)}>
      <div className={styles.memberPhoto} aria-hidden={member.photo ? undefined : true}>
        {member.photo ? (
          <img src={member.photo} alt={member.name} className={styles.memberPhotoImg} />
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
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
          ))}
        </div>
      )}
    </div>
  );
}

export type NewsItem = {
  date: string;
  category: string;
  title: string;
  excerpt: string;
  to: string;
};

export function NewsCard({item}: {item: NewsItem}) {
  return (
    <Link to={item.to} className={clsx(styles.card, styles.cardHover, styles.newsCard)}>
      <div className={styles.newsMeta}>
        <span className={styles.newsCat}>{item.category}</span>
        <span>•</span>
        <span>{item.date}</span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.excerpt}</p>
      <span className={styles.cardLink}>Read more <Arrow /></span>
    </Link>
  );
}

/* Split "1,200+" → {prefix:'', num:1200, suffix:'+', decimals:0, group:true} */
function parseStat(value: string) {
  const match = value.match(/-?[\d.,]+/);
  if (!match || match.index === undefined) return null;
  const raw = match[0];
  const numStr = raw.replace(/,/g, '');
  const num = parseFloat(numStr);
  if (Number.isNaN(num)) return null;
  return {
    num,
    decimals: numStr.includes('.') ? numStr.split('.')[1].length : 0,
    group: raw.includes(','),
    prefix: value.slice(0, match.index),
    suffix: value.slice(match.index + raw.length),
  };
}

/* Animated number that counts up from 0 the first time it scrolls into view.
   SSR-safe (renders the final value), and skips animating under reduced-motion. */
export function CountUp({
  value,
  duration = 1400,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const parsed = React.useMemo(() => parseStat(value), [value]);
  const ref = React.useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = React.useState(value);

  React.useEffect(() => {
    const el = ref.current;
    if (!parsed || !el) return;

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') return;

    const fmt = (n: number) => {
      const fixed = n.toFixed(parsed.decimals);
      const body = parsed.group ? Number(fixed).toLocaleString('en-US') : fixed;
      return `${parsed.prefix}${body}${parsed.suffix}`;
    };

    let raf = 0;
    setDisplay(fmt(0));

    const animate = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        if (t < 1) {
          setDisplay(fmt(parsed.num * eased));
          raf = requestAnimationFrame(tick);
        } else {
          setDisplay(value); // land exactly on the source string
        }
      };
      raf = requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver(
      (entries, observer) => {
        if (entries[0]?.isIntersecting) {
          animate();
          observer.disconnect();
        }
      },
      {threshold: 0.4},
    );
    obs.observe(el);

    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [parsed, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

export function StatItem({value, label}: {value: string; label: string}) {
  return (
    <div className={styles.statItem}>
      <div className={styles.statValue}>
        <CountUp value={value} />
      </div>
      <div className={styles.statLabel}>{label}</div>
    </div>
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
        {kicker && <p className={styles.kicker} style={{color: '#7fd6ec'}}>{kicker}</p>}
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
          {t.to ? <Link to={t.to}>{t.label}</Link> : <span style={{color: 'var(--aclab-body)'}}>{t.label}</span>}
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
        {kicker && <p className={styles.kicker} style={{marginTop: '1rem'}}>{kicker}</p>}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </Container>
    </header>
  );
}

import React from 'react';

import styles from './ui.module.css';

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

    const reduced = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches;
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

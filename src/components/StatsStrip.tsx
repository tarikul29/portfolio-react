import { CountUp } from './CountUp';
import { useInView } from '../hooks/useInView';

const stats = [
  { value: 4, label: 'Projects', suffix: '' },
  { value: 10, label: 'Tools and skills', suffix: '' },
  { value: 1, label: 'Live site', suffix: '' },
];

/** A glass strip under the hero whose numbers count up as it scrolls in. */
export function StatsStrip({ motion }: { motion: boolean }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.5);

  return (
    <div className="wrap">
      <div ref={ref} className={`stats ${seen ? 'is-in' : ''}`} role="list">
        {stats.map((stat, i) => (
          <div className="stat" role="listitem" key={stat.label} style={{ transitionDelay: `${i * 120}ms` }}>
            <p className="stat-num">
              <CountUp to={stat.value} run={seen} delay={i * 150} suffix={stat.suffix} instant={!motion} duration={1600} />
            </p>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
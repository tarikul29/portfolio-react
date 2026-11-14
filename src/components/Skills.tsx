import type { CSSProperties } from 'react';
import { skills } from '../data';
import { CountUp } from './CountUp';
import { SplitText } from './SplitText';
import { useInView } from '../hooks/useInView';

function SkillRow({ name, level, index, motion }: { name: string; level: number; index: number; motion: boolean }) {
  const [ref, seen] = useInView<HTMLLIElement>(0.6);
  const delay = Math.floor(index / 2) * 90;
  const style = { '--level': level, '--delay': `${delay}ms` } as CSSProperties;

  return (
    <li ref={ref} className={`skill ${seen || !motion ? 'is-in' : ''}`} style={style}>
      <span className="skill-name">{name}</span>
      <span className="skill-pct">
        <CountUp to={level} run={seen} delay={delay} instant={!motion} />
      </span>
      <span className="skill-track" role="img" aria-label={`${name} ${level} percent`}>
        <span className="skill-fill" />
      </span>
    </li>
  );
}

export function Skills({ motion }: { motion: boolean }) {
  const [titleRef, titleSeen] = useInView<HTMLHeadingElement>(0.4);
  return (
    <section className="block wrap" id="skills" aria-labelledby="skills-title">
      <h2 className="title" id="skills-title" ref={titleRef}>
        <SplitText text="Skills" play={titleSeen} step={60} />
      </h2>
      <ul className="skills">
        {skills.map((skill, i) => (
          <SkillRow key={skill.name} name={skill.name} level={skill.level} index={i} motion={motion} />
        ))}
      </ul>
    </section>
  );
}

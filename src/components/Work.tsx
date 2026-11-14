import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, CSSProperties } from 'react';
import { projects } from '../data';
import type { Project } from '../data';
import { Icon } from './Icon';
import { PhoneFrame } from './PhoneFrame';
import { Reveal } from './Reveal';
import { SplitText } from './SplitText';
import { useInView } from '../hooks/useInView';
import { useTilt } from '../hooks/useTilt';
import { MagneticLink } from './MagneticLink';

const LEAVE_MS = 360;
const ENTER_MS = 650;

type Phase = 'idle' | 'leaving' | 'entering';

function statusLabel(p: Project): string | null {
  if (p.status === 'live') return 'Live';
  if (p.status === 'progress') return 'In progress';
  return null;
}

interface CardProps {
  project: Project;
  index: number;
  active: boolean;
  motion: boolean;
  onSelect: (index: number, focus: boolean) => void;
  onKey: (event: KeyboardEvent<HTMLButtonElement>, index: number) => void;
}

function Card({ project, index, active, motion, onSelect, onKey }: CardProps) {
  const ref = useRef<HTMLButtonElement>(null);
  useTilt(ref, motion);
  const label = statusLabel(project);

  return (
    <button
      ref={ref}
      className={`card card-${project.id} ${active ? 'is-active' : ''}`}
      role="tab"
      id={`tab-${project.id}`}
      aria-controls={`panel-${project.id}`}
      aria-selected={active}
      tabIndex={active ? 0 : -1}
      type="button"
      onClick={() => onSelect(index, false)}
      onKeyDown={(event) => onKey(event, index)}
    >
      <span className="card-glare" aria-hidden="true" />
      <span className="card-media" aria-hidden="true">
        {project.id === 'blood' ? (
          <img src="/images/bloodconnect-logo.svg" alt="" width={96} height={96} />
        ) : (
          <Icon name={project.icon} />
        )}
      </span>
      {label && <span className={`tag tag-${project.status}`}>{label}</span>}
      <span className="card-name">{project.name}</span>
      <span className="card-num">{String(index + 1).padStart(2, '0')}</span>
      <span className="card-bar" aria-hidden="true" />
    </button>
  );
}

function Panel({ project, phase }: { project: Project; phase: Phase }) {
  return (
    <article
      className={`panel ${phase === 'leaving' ? 'is-leaving' : ''} ${phase === 'entering' ? 'is-entering' : ''}`}
      id={`panel-${project.id}`}
      role="tabpanel"
      aria-labelledby={`tab-${project.id}`}
      tabIndex={0}
    >
      <div className={`panel-art art-${project.id}`}>
        {project.id === 'blood' && (
          <PhoneFrame src="/images/bloodconnect-screen.webp" alt="BloodConnect BD on a phone: a Bangla headline, an urgent blood request button and blood group chips." />
        )}
        {project.id === 'iqra' && (
          <div className="loader" role="img" aria-label="Loading. This project is still being built.">
            <p className="loader-word">
              Loading
              <span className="dots" aria-hidden="true">
                <i>.</i>
                <i>.</i>
                <i>.</i>
              </span>
            </p>
            <div className="loader-track">
              <div className="loader-fill" />
            </div>
          </div>
        )}
        {(project.id === 'shop' || project.id === 'weather') && <Icon name={project.icon} className="art-icon" />}
      </div>
      <div className="panel-copy">
        {project.id === 'blood' && (
          <img className="panel-logo" src="/images/bloodconnect-logo.svg" width={64} height={64} alt="BloodConnect BD logo" />
        )}
        <h3 className="panel-title">{project.name}</h3>
        <p className="stack">{project.stack}</p>
        <p className="panel-lede">{project.description}</p>
        {project.facts && (
          <ul className="facts">
            {project.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        )}
        <div className="actions">
          {project.live && (
            <a className="btn" href={project.live} target="_blank" rel="noopener noreferrer">
              Visit live site
            </a>
          )}
          {project.github && (
            <a className="textlink" href={project.github} target="_blank" rel="noopener noreferrer">
              View code on GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function Work({ motion }: { motion: boolean }) {
  const [current, setCurrent] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const busy = useRef(false);
  const pending = useRef<number | null>(null);
  const currentRef = useRef(0);
  const timers = useRef<number[]>([]);
  const cardRefs = useRef<HTMLDivElement>(null);
  const [titleRef, titleSeen] = useInView<HTMLHeadingElement>(0.4);

  useEffect(() => {
    const list = timers.current;
    return () => list.forEach((t) => window.clearTimeout(t));
  }, []);

  const select = useCallback(
    (index: number, focus: boolean) => {
      if (focus) {
        const tab = cardRefs.current?.querySelectorAll<HTMLButtonElement>('.card')[index];
        tab?.focus();
      }
      if (busy.current) {
        pending.current = index;
        return;
      }
      if (index === currentRef.current) return;

      if (!motion) {
        currentRef.current = index;
        setCurrent(index);
        return;
      }

      busy.current = true;
      setPhase('leaving');
      timers.current.push(
        window.setTimeout(() => {
          currentRef.current = index;
          setCurrent(index);
          setPhase('entering');
          timers.current.push(
            window.setTimeout(() => {
              setPhase('idle');
              busy.current = false;
              const next = pending.current;
              pending.current = null;
              if (next !== null && next !== currentRef.current) select(next, false);
            }, ENTER_MS),
          );
        }, LEAVE_MS),
      );
    },
    [motion],
  );

  const onKey = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, i: number) => {
      const last = projects.length - 1;
      let target: number | null = null;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') target = i === last ? 0 : i + 1;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') target = i === 0 ? last : i - 1;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = last;
      if (target !== null) {
        event.preventDefault();
        select(target, true);
      }
    },
    [select],
  );

  return (
    <section className="block wrap" id="work" aria-labelledby="work-title">
      <h2 className="title" id="work-title" ref={titleRef}>
        <SplitText text="Work" play={titleSeen} step={60} />
      </h2>

      <Reveal delay={100}>
        <div className="cards" role="tablist" aria-label="Projects" ref={cardRefs}>
          {projects.map((project, i) => (
            <Card
              key={project.id}
              project={project}
              index={i}
              active={i === current}
              motion={motion}
              onSelect={select}
              onKey={onKey}
            />
          ))}
        </div>
      </Reveal>

      <div className="panels" style={{ '--tab': current } as CSSProperties}>
        <Panel project={projects[current]} phase={phase} />
      </div>

      <MagneticLink className="textlink more" href="https://github.com/tarikul29" target="_blank" rel="noopener noreferrer" motion={motion}>
        More on GitHub
      </MagneticLink>
    </section>
  );
}

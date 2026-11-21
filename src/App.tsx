import { useCallback, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Work } from './components/Work';
import { Skills } from './components/Skills';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Testimonials } from './components/Testimonials';
import { Rail } from './components/Rail';
import { Preloader } from './components/Preloader';
import { Embers } from './components/Embers';
import { StatsStrip } from './components/StatsStrip';
import { CursorGlow } from './components/CursorGlow';
import { sections } from './data';
import { useActiveSection } from './hooks/useActiveSection';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useScrollVars } from './hooks/useScrollVars';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useParallax } from './hooks/useParallax';

const ids = sections.map((s) => s.id);

export default function App() {
  const reduced = useReducedMotion();
  const motion = !reduced;
  const [ready, setReady] = useState(reduced);
  const active = useActiveSection(ids);
  useScrollVars();
  useSmoothScroll(motion);
  useParallax(motion, '.title, .stage-wrap, .hang, .stats, .cform');

  const onIntroDone = useCallback(() => setReady(true), []);

  return (
    <>
      {motion && <Preloader onDone={onIntroDone} />}
      <div className="aurora" aria-hidden="true">
        <i className="blob b1" />
        <i className="blob b2" />
        <i className="blob b3" />
      </div>
      {motion && <Embers />}
      {motion && <CursorGlow />}
      <Header active={active} ready={ready} />
      <main id="main">
        <Hero ready={ready} motion={motion} />
        <StatsStrip motion={motion} />
        <Marquee />
        <Work motion={motion} />
        <Skills motion={motion} />
        <About motion={motion} />
        <Testimonials motion={motion} />
        <Contact motion={motion} />
      </main>
      <footer className="foot wrap">
        <p>&copy; {new Date().getFullYear()} Tarikul Islam</p>
      </footer>
      <Rail active={active} />
    </>
  );
}
import { useCallback, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Work } from './components/Work';
import { Skills } from './components/Skills';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Rail } from './components/Rail';
import { Intro } from './components/Intro';
import { CursorGlow } from './components/CursorGlow';
import { sections } from './data';
import { useActiveSection } from './hooks/useActiveSection';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useScrollVars } from './hooks/useScrollVars';

const ids = sections.map((s) => s.id);

export default function App() {
  const reduced = useReducedMotion();
  const motion = !reduced;
  const [ready, setReady] = useState(reduced);
  const active = useActiveSection(ids);
  useScrollVars();

  const onIntroDone = useCallback(() => setReady(true), []);

  return (
    <>
      {motion && <Intro onDone={onIntroDone} />}
      {motion && <CursorGlow />}
      <Header active={active} ready={ready} />
      <main id="main">
        <Hero ready={ready} motion={motion} />
        <Marquee />
        <Work motion={motion} />
        <Skills motion={motion} />
        <About motion={motion} />
        <Contact motion={motion} />
      </main>
      <footer className="foot wrap">
        <p>&copy; {new Date().getFullYear()} Tarikul Islam</p>
      </footer>
      <Rail active={active} />
    </>
  );
}

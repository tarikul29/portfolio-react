import { useEffect, useState } from 'react';
import { Logo } from './Logo';

interface IntroProps {
  onDone: () => void;
}

/** The logo draws itself, then the curtain lifts and the page starts. */
export function Intro({ onDone }: IntroProps) {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.body.classList.add('is-locked');
    const lift = window.setTimeout(() => {
      setLeaving(true);
      onDone();
    }, 1700);
    const remove = window.setTimeout(() => {
      setGone(true);
      document.body.classList.remove('is-locked');
    }, 2700);
    return () => {
      window.clearTimeout(lift);
      window.clearTimeout(remove);
      document.body.classList.remove('is-locked');
    };
  }, [onDone]);

  if (gone) return null;

  return (
    <div className={`intro ${leaving ? 'is-leaving' : ''}`} aria-hidden="true">
      <div className="intro-mark">
        <Logo size={96} draw />
        <span className="intro-name">Tarikul Islam</span>
      </div>
    </div>
  );
}

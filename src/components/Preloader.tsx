import { useEffect, useState } from 'react';
import { Logo } from './Logo';

interface PreloaderProps {
  onDone: () => void;
}

const DURATION = 2300;

/** A 0 to 100 counter over a drawing logo; then the two halves of the curtain slide apart. */
export function Preloader({ onDone }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.body.classList.add('is-locked');
    let frame = 0;
    let start: number | null = null;
    const timers: number[] = [];

    const step = (now: number) => {
      if (start === null) start = now;
      const t = Math.min((now - start) / DURATION, 1);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setCount(Math.round(eased * 100));
      if (t < 1) {
        frame = requestAnimationFrame(step);
      } else {
        timers.push(
          window.setTimeout(() => {
            setLeaving(true);
            onDone();
          }, 260),
          window.setTimeout(() => {
            setGone(true);
            document.body.classList.remove('is-locked');
          }, 1500),
        );
      }
    };

    frame = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(frame);
      timers.forEach((t) => window.clearTimeout(t));
      document.body.classList.remove('is-locked');
    };
  }, [onDone]);

  if (gone) return null;

  return (
    <div className={`pre ${leaving ? 'is-leaving' : ''}`} aria-hidden="true">
      <div className="pre-half pre-top" />
      <div className="pre-half pre-bottom" />
      <div className="pre-content">
        <div className="pre-mark">
          <Logo size={88} draw />
          <p className="pre-line">Building fast, smooth interfaces</p>
        </div>
        <p className="pre-count">
          {count}
          <span>%</span>
        </p>
        <span className="pre-bar">
          <i style={{ transform: `scaleX(${count / 100})` }} />
        </span>
      </div>
    </div>
  );
}
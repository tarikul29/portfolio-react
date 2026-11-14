import { useEffect, useState } from 'react';

interface RotatingTextProps {
  words: string[];
  active: boolean;
  interval?: number;
}

/** Cycles through words with a slide-up change. Stays on the first word if motion is off. */
export function RotatingText({ words, active, interval = 2600 }: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [active, interval, words.length]);

  return (
    <span className="rotator">
      <span className="rotator-word" key={index} aria-hidden={index !== 0 || undefined}>
        {words[index]}
      </span>
    </span>
  );
}

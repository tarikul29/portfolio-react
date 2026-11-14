import { Fragment } from 'react';
import type { CSSProperties } from 'react';

interface SplitTextProps {
  text: string;
  play: boolean;
  /** Delay before the first letter, in ms */
  delay?: number;
  /** Gap between letters, in ms */
  step?: number;
  className?: string;
}

/** Splits a string into letters so each one can rise into place in turn. */
export function SplitText({ text, play, delay = 0, step = 38, className = '' }: SplitTextProps) {
  let index = 0;
  const words = text.split(' ');

  return (
    <span className={`split ${play ? 'is-playing' : ''} ${className}`} aria-label={text}>
      {words.map((word, w) => (
        <Fragment key={`${word}-${w}`}>
          <span className="split-word" aria-hidden="true">
            {Array.from(word).map((char, c) => {
              const style = { '--d': `${delay + index++ * step}ms` } as CSSProperties;
              return (
                <span className="split-char" style={style} key={`${char}-${c}`}>
                  {char}
                </span>
              );
            })}
          </span>
          {w < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </span>
  );
}

import { ticker } from '../data';

export function Marquee() {
  const row = (hidden: boolean) => (
    <ul className="marquee-row" aria-hidden={hidden || undefined}>
      {ticker.map((item) => (
        <li key={item}>
          <span>{item}</span>
          <svg viewBox="0 0 10 10" aria-hidden="true">
            <path d="M5 0l5 5-5 5-5-5z" fill="currentColor" />
          </svg>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee" aria-label="Tools I use">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

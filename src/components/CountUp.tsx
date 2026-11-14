import { useEffect, useState } from 'react';

interface CountUpProps {
  to: number;
  run: boolean;
  delay?: number;
  duration?: number;
  suffix?: string;
  instant?: boolean;
}

export function CountUp({ to, run, delay = 0, duration = 1400, suffix = '%', instant = false }: CountUpProps) {
  const [value, setValue] = useState(instant ? to : 0);

  useEffect(() => {
    if (instant) {
      setValue(to);
      return;
    }
    if (!run) return;

    let frame = 0;
    let start: number | null = null;

    const step = (now: number) => {
      if (start === null) start = now + delay;
      const t = Math.min(Math.max((now - start) / duration, 0), 1);
      const eased = 1 - Math.pow(1 - t, 4);
      setValue(Math.round(to * eased));
      if (t < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [to, run, delay, duration, instant]);

  return (
    <span>
      {value}
      {suffix}
    </span>
  );
}

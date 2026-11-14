import type { CSSProperties, ReactNode } from 'react';
import { useInView } from '../hooks/useInView';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in ms */
  delay?: number;
  threshold?: number;
}

export function Reveal({ children, className = '', delay = 0, threshold = 0.2 }: RevealProps) {
  const [ref, seen] = useInView<HTMLDivElement>(threshold);
  const style = { '--delay': `${delay}ms` } as CSSProperties;
  return (
    <div ref={ref} className={`reveal ${seen ? 'is-in' : ''} ${className}`} style={style}>
      {children}
    </div>
  );
}

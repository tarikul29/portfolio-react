import { useRef } from 'react';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { useMagnetic } from '../hooks/useMagnetic';

interface MagneticLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  motion: boolean;
}

export function MagneticLink({ children, motion, className = '', ...rest }: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  useMagnetic(ref, motion);
  return (
    <a ref={ref} className={`magnetic ${className}`} {...rest}>
      {children}
    </a>
  );
}

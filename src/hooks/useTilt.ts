import { useEffect } from 'react';
import type { RefObject } from 'react';

/** 3D tilt that follows the pointer, plus a glare position (--gx, --gy). */
export function useTilt<T extends HTMLElement>(
  ref: RefObject<T>,
  enabled: boolean,
  max = 7,
): void {
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const onMove = (event: PointerEvent) => {
      const box = el.getBoundingClientRect();
      const px = (event.clientX - box.left) / box.width;
      const py = (event.clientY - box.top) / box.height;
      el.style.setProperty('--ry', `${((px - 0.5) * max * 2).toFixed(2)}deg`);
      el.style.setProperty('--rx', `${((0.5 - py) * max * 2).toFixed(2)}deg`);
      el.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`);
      el.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`);
    };

    const onLeave = () => {
      el.style.setProperty('--ry', '0deg');
      el.style.setProperty('--rx', '0deg');
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [ref, enabled, max]);
}

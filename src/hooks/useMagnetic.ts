import { useEffect } from 'react';
import type { RefObject } from 'react';

/** Pulls an element a little toward the pointer when it comes close. */
export function useMagnetic<T extends HTMLElement>(
  ref: RefObject<T>,
  enabled: boolean,
  strength = 0.3,
): void {
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let frame = 0;
    let running = false;

    const tick = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      if (Math.abs(tx - x) > 0.05 || Math.abs(ty - y) > 0.05) {
        frame = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const start = () => {
      if (!running) {
        running = true;
        frame = requestAnimationFrame(tick);
      }
    };

    const onMove = (event: PointerEvent) => {
      const box = el.getBoundingClientRect();
      const dx = event.clientX - (box.left + box.width / 2);
      const dy = event.clientY - (box.top + box.height / 2);
      tx = dx * strength;
      ty = dy * strength;
      start();
    };

    const onLeave = () => {
      tx = 0;
      ty = 0;
      start();
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(frame);
    };
  }, [ref, enabled, strength]);
}

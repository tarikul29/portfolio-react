import { useEffect } from 'react';
import type { RefObject } from 'react';

/**
 * Eases the pointer position toward the cursor and writes it to CSS variables
 * on the element: --px and --py run from -1 to 1 across the viewport.
 */
export function usePointerFollow<T extends HTMLElement>(
  ref: RefObject<T>,
  enabled: boolean,
  ease = 0.06,
): void {
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      tx = (event.clientX / window.innerWidth) * 2 - 1;
      ty = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const tick = () => {
      x += (tx - x) * ease;
      y += (ty - y) * ease;
      el.style.setProperty('--px', x.toFixed(4));
      el.style.setProperty('--py', y.toFixed(4));
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, [ref, enabled, ease]);
}

import { useEffect } from 'react';

/**
 * Gives chosen elements a slow drift while they cross the screen.
 * Writes --p (0 when the element is entering from below, 1 when leaving above);
 * the CSS turns that into a small `translate`.
 */
export function useParallax(enabled: boolean, selector: string): void {
  useEffect(() => {
    if (!enabled) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        const box = el.getBoundingClientRect();
        if (box.bottom < -200 || box.top > vh + 200) return;
        const center = box.top + box.height / 2;
        const p = Math.min(Math.max(1 - center / vh, -0.2), 1.2);
        el.style.setProperty('--p', p.toFixed(3));
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled, selector]);
}
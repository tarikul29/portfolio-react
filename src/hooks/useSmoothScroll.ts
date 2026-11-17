import { useEffect } from 'react';

/**
 * Gives the mouse wheel a soft, inertial feel. Keyboard, touch, the scrollbar and
 * in-page links keep using the browser's own scrolling.
 */
export function useSmoothScroll(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let target = window.scrollY;
    let current = window.scrollY;
    let active = false;
    let frame = 0;

    const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;

    const tick = () => {
      current += (target - current) * 0.1;
      if (Math.abs(target - current) < 0.4) {
        current = target;
        active = false;
      }
      window.scrollTo({ top: current, behavior: 'instant' });
      if (active) frame = requestAnimationFrame(tick);
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.defaultPrevented) return;
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      event.preventDefault();

      if (!active) {
        target = window.scrollY;
        current = window.scrollY;
      }
      const unit = event.deltaMode === 1 ? 34 : event.deltaMode === 2 ? window.innerHeight : 1;
      target = Math.min(Math.max(target + event.deltaY * unit, 0), maxScroll());

      if (!active) {
        active = true;
        frame = requestAnimationFrame(tick);
      }
    };

    const onScroll = () => {
      if (!active) {
        target = window.scrollY;
        current = window.scrollY;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);
}
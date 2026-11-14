import { useEffect } from 'react';

/**
 * Writes the scroll position to CSS variables on <html> so any element can
 * move with the page without React re-rendering:
 *   --sy        scroll distance in px
 *   --progress  0 to 1 over the whole page
 */
export function useScrollVars(): void {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = root.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      root.style.setProperty('--sy', String(Math.round(window.scrollY)));
      root.style.setProperty('--progress', progress.toFixed(4));
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
  }, []);
}

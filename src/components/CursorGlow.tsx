import { useEffect, useRef } from 'react';

/** A soft light that trails the cursor on desktop. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      tx = event.clientX;
      ty = event.clientY;
      el.classList.add('is-on');
    };
    const tick = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.transform = `translate3d(${x - 200}px, ${y - 200}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}

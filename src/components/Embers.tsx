import { useEffect, useRef } from 'react';

interface Ember {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  phase: number;
  color: string;
  alpha: number;
}

const COLORS = ['231,171,113', '97,167,189', '120,228,189', '111,125,185'];

/** Slow glowing particles that drift upward and slip away from the cursor. */
export function Embers() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let frame = 0;
    let pointerX = -9999;
    let pointerY = -9999;
    let embers: Ember[] = [];

    const make = (): Ember => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 1.2 + Math.random() * 3.4,
      vy: 0.12 + Math.random() * 0.4,
      vx: (Math.random() - 0.5) * 0.18,
      phase: Math.random() * Math.PI * 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: 0.25 + Math.random() * 0.5,
    });

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = w < 700 ? 28 : 64;
      embers = Array.from({ length: count }, make);
    };

    const onMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const e of embers) {
        e.y -= e.vy;
        e.x += e.vx + Math.sin(now * 0.0005 + e.phase) * 0.25;

        const dx = e.x - pointerX;
        const dy = e.y - pointerY;
        const dist = Math.hypot(dx, dy);
        if (dist < 140 && dist > 0) {
          const push = (140 - dist) / 140;
          e.x += (dx / dist) * push * 2.2;
          e.y += (dy / dist) * push * 2.2;
        }

        if (e.y < -10) {
          e.y = h + 10;
          e.x = Math.random() * w;
        }
        if (e.x < -10) e.x = w + 10;
        if (e.x > w + 10) e.x = -10;

        const pulse = 0.65 + Math.sin(now * 0.002 + e.phase) * 0.35;
        const glow = e.r * 5;
        const g = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, glow);
        g.addColorStop(0, `rgba(${e.color},${(e.alpha * pulse).toFixed(3)})`);
        g.addColorStop(0.35, `rgba(${e.color},${(e.alpha * pulse * 0.35).toFixed(3)})`);
        g.addColorStop(1, `rgba(${e.color},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(e.x, e.y, glow, 0, Math.PI * 2);
        ctx.fill();
      }
      frame = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
      } else {
        frame = requestAnimationFrame(draw);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="embers" aria-hidden="true" />;
}
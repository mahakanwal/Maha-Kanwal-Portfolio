import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { currentTheme, hexToRgb01 } from '../theme/themes';

// Clean custom cursor: a small accent dot, a soft trailing ring and a short
// tapered comet tail that only shows while moving. One subtle ripple on click / tap.
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const canvasRef = useRef(null);
  const layerRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const layer = layerRef.current;

    // click / tap burst (all devices): ring + sparks + glowing dots + a little XP pop
    const popWords = ['+10 XP', '+25 XP', 'Combo!', '+50 XP', 'Nice!', 'Level Up'];
    let clicks = 0;
    const ripple = e => {
      if (e.target.closest('.game-screen canvas')) return;
      const x = e.clientX;
      const y = e.clientY;
      const add = (cls, styles) => {
        const el = document.createElement('span');
        el.className = cls;
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        Object.assign(el.style, styles || {});
        layer.appendChild(el);
        return el;
      };

      const ring = add('burst-ring');
      gsap.fromTo(ring, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.7, ease: 'power2.out', onComplete: () => ring.remove() });

      for (let i = 0; i < 8; i++) {
        const angle = (360 / 8) * i;
        const spark = add('burst-spark', { transform: `rotate(${angle}deg)` });
        const line = document.createElement('i');
        spark.appendChild(line);
        gsap.fromTo(
          line,
          { x: 6, scaleX: 1, opacity: 1 },
          { x: 30, scaleX: 0.2, opacity: 0, duration: 0.45, ease: 'power2.out', onComplete: () => spark.remove() }
        );
      }

      for (let i = 0; i < 10; i++) {
        const s = 3 + Math.random() * 5;
        const dot = add('burst-dot', { width: `${s}px`, height: `${s}px`, background: [currentTheme().p, currentTheme().s, '#ffffff', currentTheme().p300][i % 4] });
        const ang = (Math.PI * 2 * i) / 10 + Math.random() * 0.5;
        const d = 40 + Math.random() * 50;
        gsap.to(dot, {
          x: Math.cos(ang) * d,
          y: Math.sin(ang) * d + 20,
          opacity: 0,
          scale: 0.3,
          duration: 0.8 + Math.random() * 0.4,
          ease: 'power3.out',
          onComplete: () => dot.remove()
        });
      }

      clicks++;
      if (clicks % 3 === 1) {
        const t = add('burst-pop');
        t.textContent = popWords[Math.floor(Math.random() * popWords.length)];
        gsap.fromTo(
          t,
          { xPercent: -50, y: 0, opacity: 0, scale: 0.6 },
          {
            xPercent: -50,
            y: -60,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'back.out(2)',
            onComplete: () => gsap.to(t, { y: -90, opacity: 0, duration: 0.5, onComplete: () => t.remove() })
          }
        );
      }
    };
    window.addEventListener('pointerdown', ripple);

    if (!fine) return () => window.removeEventListener('pointerdown', ripple);

    document.documentElement.classList.add('has-custom-cursor');
    const dot = dotRef.current;
    const ring = ringRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    resize();
    window.addEventListener('resize', resize);

    const mouse = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    const trail = [];
    const N = 16;
    let lastMove = 0;

    const move = e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      lastMove = performance.now();
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
    };
    const over = e => {
      const interactive = e.target.closest('a, button, input, textarea, select, label, [role="tab"], [role="region"]');
      ring.classList.toggle('is-hover', !!interactive);
      const hide = !!e.target.closest('.game-screen canvas, .pubg-zone');
      dot.classList.toggle('is-hidden', hide);
      ring.classList.toggle('is-hidden', hide);
    };
    const down = () => ring.classList.add('is-down');
    const up = () => ring.classList.remove('is-down');
    const leave = () => {
      dot.classList.add('is-hidden');
      ring.classList.add('is-hidden');
    };
    const enter = () => {
      dot.classList.remove('is-hidden');
      ring.classList.remove('is-hidden');
    };

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    document.documentElement.addEventListener('mouseleave', leave);
    document.documentElement.addEventListener('mouseenter', enter);

    let raf;
    const tick = now => {
      ringPos.x += (mouse.x - ringPos.x) * 0.18;
      ringPos.y += (mouse.y - ringPos.y) * 0.18;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;

      // tail: follow the pointer, shrink away when still
      const moving = now - lastMove < 120;
      if (moving) trail.unshift({ x: mouse.x, y: mouse.y });
      else trail.pop();
      if (trail.length > N) trail.length = N;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!reduced && trail.length > 2) {
        ctx.lineCap = 'round';
        // tail fades from the main accent to the soft accent of the active theme
        const a = hexToRgb01(currentTheme().p);
        const b = hexToRgb01(currentTheme().s);
        for (let i = 1; i < trail.length; i++) {
          const t = 1 - i / trail.length;
          const mix = k => Math.round((a[k] + (b[k] - a[k]) * (1 - t)) * 255);
          ctx.strokeStyle = `rgba(${mix(0)}, ${mix(1)}, ${mix(2)}, ${t * 0.45})`;
          ctx.lineWidth = Math.max(0.5, t * 6);
          ctx.beginPath();
          ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
          ctx.lineTo(trail[i].x, trail[i].y);
          ctx.stroke();
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointerdown', ripple);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      document.documentElement.removeEventListener('mouseleave', leave);
      document.documentElement.removeEventListener('mouseenter', enter);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="cursor-tail" aria-hidden="true" />
      <div ref={layerRef} className="fixed inset-0 z-[9998] pointer-events-none overflow-hidden" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}

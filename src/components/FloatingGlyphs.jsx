import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Floating background symbols (from the original site) - code glyphs instead of emojis.
const glyphs = ['</>', '{ }', '01', '#', '( )', '=>', '[ ]', '*'];

export default function FloatingGlyphs({ count = 12 }) {
  const ref = useRef(null);

  useEffect(() => {
    const spans = ref.current.querySelectorAll('span');
    const tweens = Array.from(spans).map(span =>
      gsap.to(span, { y: 'random(-100, 100)', rotation: 360, duration: 15, repeat: -1, yoyo: true, ease: 'none' })
    );
    return () => tweens.forEach(t => t.kill());
  }, []);

  return (
    <div id="bg-wrap" ref={ref} className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="obj-float text-sm font-mono"
          style={{ left: `${(i * 37 + 7) % 100}vw`, top: `${(i * 53 + 11) % 100}vh` }}
        >
          {glyphs[i % glyphs.length]}
        </span>
      ))}
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// Same "Syncing..." loader + shiny pink fold transition as the original site.
export default function Loader() {
  const loaderRef = useRef(null);
  const foldRef = useRef(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let tl;
    let fallback;
    const run = () => {
      if (tl) return;
      clearTimeout(fallback);
      tl = gsap.timeline({ onComplete: () => setDone(true) });
      gsap.set(foldRef.current, { perspective: 2500 });
      gsap.set(foldRef.current.children, { rotationY: 0 });
      tl.to(loaderRef.current, { opacity: 0, duration: 0.8, delay: 1, ease: 'power2.inOut' })
        .set(loaderRef.current, { display: 'none' })
        .to(
          foldRef.current.children,
          {
            duration: 1.4,
            rotationY: -105,
            xPercent: -100,
            opacity: 0,
            stagger: { each: 0.1, from: 'start' },
            ease: 'expo.inOut'
          },
          '-=0.2'
        );
    };
    if (document.readyState === 'complete') run();
    else {
      window.addEventListener('load', run, { once: true });
      // never keep visitors waiting on slow third-party assets
      fallback = setTimeout(run, 2500);
    }
    return () => {
      clearTimeout(fallback);
      window.removeEventListener('load', run);
      tl?.kill();
    };
  }, []);

  if (done) return null;

  return (
    <>
      <div ref={loaderRef} className="fixed inset-0 z-[10001] bg-[#050505] flex items-center justify-center">
        <div className="relative flex flex-col items-center">
          <div className="w-12 h-12 border-2 border-pink-500/20 border-t-pink-500 rounded-full animate-spin" />
          <div className="absolute inset-0 m-auto w-2 h-2 bg-pink-500 rounded-full shadow-[0_0_8px_rgb(var(--p-rgb)/0.45)]" />
          <span className="mt-4 text-[8px] tracking-[0.5em] text-mahiPink animate-pulse uppercase">Syncing...</span>
        </div>
      </div>
      <div ref={foldRef} className="fixed inset-0 z-[10000] flex pointer-events-none overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="fold-panel w-1/6 h-full origin-left bg-gradient-to-r from-pink-600/90 to-pink-400/80 backdrop-blur-xl border-r border-white/30 shadow-[inset_-10px_0_20px_rgba(255,255,255,0.2)]"
          />
        ))}
      </div>
    </>
  );
}

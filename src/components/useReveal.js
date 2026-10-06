import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Staggered 3D reveal for every `.reveal-3d` element inside the given ref.
export default function useReveal(ref, deps = []) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const items = el.querySelectorAll('.reveal-3d');
      if (!items.length) return;
      gsap.from(items, {
        opacity: 0,
        y: 80,
        rotateX: -35,
        z: -120,
        transformPerspective: 1000,
        transformOrigin: '50% 0%',
        duration: 1.1,
        stagger: 0.12,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: { trigger: el, start: 'top 78%' }
      });
    }, el);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Count-up number triggered when it scrolls into view.
export default function CountUp({ to, duration = 2 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: to,
      duration,
      ease: 'power3.out',
      onUpdate: () => {
        if (el) el.textContent = Math.round(obj.v);
      },
      scrollTrigger: { trigger: el, start: 'top 90%' }
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [to, duration]);
  return <span ref={ref}>0</span>;
}

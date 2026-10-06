import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Same heading style as the original site, with a 3D flip-in on scroll.
export default function SectionHeading({ title, outline, children, className = '', textClass = 'text-[10px] md:text-xs' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('.sh-anim'), {
        y: 60,
        rotateX: -70,
        opacity: 0,
        transformOrigin: '50% 100%',
        duration: 1.1,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={`space-y-6 pb-10 text-center max-w-4xl mx-auto [perspective:900px] ${className}`}>
      <h2 className="sh-anim text-4xl md:text-5xl font-black capitalize text-white">
        {title}
        <span className="text-transparent" style={{ WebkitTextStroke: '1.5px var(--p)' }}>
          {' '}
          {outline}
        </span>
      </h2>
      {children && <p className={`sh-anim text-white/90 leading-relaxed mx-auto ${textClass}`}>{children}</p>}
      <div className="sh-anim flex items-center justify-center gap-4 pt-4">
        <div className="h-[1px] w-12 bg-pink-600/30" />
        <div className="w-2 h-2 rounded-full bg-mahiPink" />
        <div className="h-[1px] w-12 bg-pink-600/30" />
      </div>
    </div>
  );
}

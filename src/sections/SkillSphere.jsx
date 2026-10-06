import { useRef } from 'react';
import LightRays from '../components/reactbits/LightRays';
import Magnet from '../components/reactbits/Magnet';
import LazyMount from '../components/LazyMount';
import SectionHeading from '../components/SectionHeading';
import TiltCard from '../components/TiltCard';
import Icon from '../components/Icon';
import useReveal from '../components/useReveal';
import SkillGlobe from '../three/SkillGlobe';
import { links } from '../data/portfolio';

const perks = [
  { icon: 'graduation-cap', title: 'Start From Zero', text: 'Coding from the very basics - no experience needed.' },
  { icon: 'code', title: 'Learn By Building', text: 'Small real projects that make concepts click.' },
  { icon: 'heart', title: '100% Free', text: 'No fees. Just curiosity and the will to learn.' },
  { icon: 'users', title: 'Grow Together', text: 'A friendly community of young learners.' }
];

const steps = ['Message on WhatsApp', 'Get class details', 'Start coding'];

export default function SkillSphere() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section id="skillsphere" ref={ref} className="relative py-24 px-4 sm:px-6 overflow-hidden">
      {/* React Bits: LightRays background */}
      <LazyMount className="absolute inset-0 z-0 pointer-events-none opacity-80">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ff3e81"
          raysSpeed={1.2}
          lightSpread={0.9}
          rayLength={1.6}
          followMouse
          mouseInfluence={0.12}
          noiseAmount={0.06}
          distortion={0.04}
        />
      </LazyMount>

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeading title="Learn Together," outline="Grow Together">
          SkillSphere is my free coding initiative for kids. If your child wants to learn coding, they are welcome here.
        </SectionHeading>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="reveal-3d order-2 lg:order-1">
            <img src="/img/skillsphere-logo.png" alt="SkillSphere - Learn Together Grow Together" className="w-full max-w-[420px] mb-8" />
            <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              Free coding classes for kids, <span className="text-mahiPink">from the very basics.</span>
            </h3>
            <p className="text-white/80 text-sm leading-relaxed mb-8 max-w-xl">
              I believe every child deserves a head start in technology. Through SkillSphere I teach kids how computers think,
              how to write their first lines of code and how to turn ideas into small working projects - completely free of
              charge. Want to enroll? Send me a message on WhatsApp and I will share everything you need.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 [perspective:1200px]">
              {perks.map(p => (
                <TiltCard key={p.title} max={14} className="perk-card rounded-xl p-5">
                  <div className="flex items-start gap-3 [transform:translateZ(30px)]">
                    <span className="role-icon !w-10 !h-10 shrink-0">
                      <Icon name={p.icon} size={18} />
                    </span>
                    <div>
                      <h4 className="text-white font-semibold text-sm">{p.title}</h4>
                      <p className="text-white/65 text-xs leading-relaxed mt-1">{p.text}</p>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>

            <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-8 text-[10px] uppercase tracking-[0.2em] text-white/60">
              {steps.map((s, i) => (
                <li key={s} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full border border-pink-500/50 text-mahiPink flex items-center justify-center text-[10px]">
                    {i + 1}
                  </span>
                  {s}
                  {i < steps.length - 1 && <span className="w-6 h-px bg-pink-500/40" />}
                </li>
              ))}
            </ol>

            <div className="flex flex-wrap gap-4">
              <Magnet padding={50} magnetStrength={3}>
                <a href={links.whatsappEnroll} target="_blank" rel="noopener noreferrer" className="wa-btn">
                  <Icon name="whatsapp" size={18} />
                  Enroll On WhatsApp
                </a>
              </Magnet>
              <a href={links.email} className="inline-flex items-center gap-2 px-6 py-3.5 glass rounded-lg font-bold text-[11px] uppercase tracking-widest hover:border-pink-500 transition">
                <Icon name="mail" size={16} /> Ask A Question
              </a>
            </div>
          </div>

          <div className="reveal-3d order-1 lg:order-2 relative aspect-square w-full max-w-[560px] mx-auto">
            <LazyMount className="absolute inset-0">
              <SkillGlobe />
            </LazyMount>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-[28%] aspect-square">
                <svg viewBox="0 0 200 200" className="absolute -inset-[30%] w-[160%] h-[160%] animate-[spin_22s_linear_infinite] opacity-80">
                  <defs>
                    <path id="ss-circle" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
                  </defs>
                  <text fill="#ffb8d1" fontSize="11" letterSpacing="4.2" fontFamily="JetBrains Mono, monospace">
                    <textPath href="#ss-circle">LEARN TOGETHER * GROW TOGETHER * SKILLSPHERE * </textPath>
                  </text>
                </svg>
                <img
                  src="/img/skillsphere-icon.png"
                  alt=""
                  className="relative w-full h-full object-contain drop-shadow-[0_0_25px_rgba(255,62,129,0.8)] animate-[float_6s_ease-in-out_infinite]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

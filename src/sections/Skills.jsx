import { useEffect, useState } from 'react';
import DotGrid from '../components/reactbits/DotGrid';
import LazyMount from '../components/LazyMount';
import Icon from '../components/Icon';
import { skills } from '../data/portfolio';

const total = skills.length;
const step = 360 / total;

const SkillGlyph = ({ skill, size }) =>
  skill.type === 'icon' ? (
    <Icon name={skill.icon} size={size} style={{ color: skill.clr }} />
  ) : (
    <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" loading="lazy" />
  );

// "Beyond the Interface" skills orbit - same behaviour as the original,
// rewritten in React, plus a React Bits DotGrid background.
export default function Skills() {
  const [index, setIndex] = useState(0); // active orbit item
  const [shown, setShown] = useState(skills[0]); // skill displayed in the centre
  const [visible, setVisible] = useState(false); // stagger "show" state
  const [bar, setBar] = useState(0);

  // advance every 5s (same timing as original)
  useEffect(() => {
    const t = setTimeout(() => setIndex(i => (i + 1) % total), 5000);
    return () => clearTimeout(t);
  }, [index]);

  // portal exit -> swap -> enter
  useEffect(() => {
    setVisible(false);
    const t1 = setTimeout(() => {
      setShown(skills[index]);
      setBar(0);
      setVisible(true);
    }, 600);
    const t2 = setTimeout(() => setBar(skills[index].level), 650);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [index]);

  const active = skills[index];

  return (
    <section id="skills" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      {/* React Bits: DotGrid background */}
      <LazyMount className="absolute inset-0 z-0 opacity-60">
        <DotGrid
          dotSize={4}
          gap={26}
          baseColor="#2a1520"
          activeColor="#ff3e81"
          proximity={130}
          shockRadius={220}
          shockStrength={4}
          resistance={750}
          returnDuration={1.5}
        />
      </LazyMount>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_20%,#030303_80%)] pointer-events-none" />

      <div className="relative z-10 space-y-4 py-10 text-center max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-black capitalize text-white">
          Beyond_the
          <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #ff3e81' }}>
            Interface
          </span>
        </h2>
        <p className="text-xs md:text-sm">
          I engineer the invisible. Using a high-performance stack, I transform rigid logic into fluid digital ecosystems
          where every line of code is a brushstroke of digital magic.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <div className="h-[1px] w-12 bg-pink-600/30" />
          <div className="w-2 h-2 rounded-full bg-pink-600 shadow-[0_0_10px_#ff3e81]" />
          <div className="h-[1px] w-12 bg-pink-600/30" />
        </div>
      </div>

      <div className="orbit-scale relative z-10 w-full max-w-[600px] h-[470px] flex items-center justify-center">
        <div className="orbit-line w-[320px] h-[320px]" />
        <div className="orbit-line w-[460px] h-[460px]" />

        <div
          className="absolute w-full h-full flex items-center justify-center transition-transform duration-1000"
          style={{ transform: `rotate(${-(index * step)}deg)` }}
        >
          {skills.map((skill, i) => {
            const angle = i * step;
            const counter = -(angle - index * step);
            const isActive = i === index;
            return (
              <div
                key={skill.name}
                className={`skill-item double-border absolute w-14 h-14 flex items-center justify-center p-3.5 transition-all duration-700 ease-in-out ${
                  isActive ? 'active-glow' : ''
                }`}
                style={{
                  transform: `rotate(${angle}deg) translate(195px) rotate(${counter}deg) scale(${isActive ? 1.6 : 1})`,
                  '--glow-clr': isActive ? skill.clr + '44' : undefined
                }}
              >
                <SkillGlyph skill={skill} size={24} />
              </div>
            );
          })}
        </div>

        <div className="absolute flex flex-col items-center text-center z-20 pointer-events-none">
          <div
            className="double-border active-glow w-24 h-24 flex items-center justify-center mb-5 p-5 transition-all duration-700"
            style={{ '--glow-clr': shown.clr + '33' }}
          >
            <div className={`w-full h-full flex items-center justify-center portal-img ${visible ? '' : 'logo-hidden'}`}>
              <SkillGlyph skill={shown} size={38} />
            </div>
          </div>

          <div>
            <h3 className={`stagger-item text-4xl font-bold tracking-tight text-white uppercase leading-none ${visible ? 'show' : ''}`}>
              {shown.name}
            </h3>
            <p
              className={`stagger-item text-white text-[11px] max-w-[260px] mt-3 leading-relaxed font-light ${visible ? 'show' : ''}`}
              style={{ transitionDelay: visible ? '100ms' : '0ms' }}
            >
              {shown.desc}
            </p>
            <div
              className={`stagger-item mt-5 flex flex-col items-center ${visible ? 'show' : ''}`}
              style={{ transitionDelay: visible ? '200ms' : '0ms' }}
            >
              <div className="w-36 h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full transition-all duration-1000" style={{ width: `${bar}%`, backgroundColor: shown.clr }} />
              </div>
              <div className="text-[10px] font-medium mt-2 tracking-[0.2em] text-white opacity-60 uppercase">
                Expertise Level: {shown.level}%
              </div>
            </div>
          </div>
        </div>
      </div>
      <span className="sr-only">Currently highlighted: {active.name}</span>
    </section>
  );
}

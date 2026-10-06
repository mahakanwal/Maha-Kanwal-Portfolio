import { useEffect, useState } from 'react';
import TechText from '../components/reactbits/TechText';
import Icon from '../components/Icon';

// Original typewriter (same words, speeds and pause as the first version of the site)
const words = ['Full Stack Developer', 'Web Instructor', 'Freelance Maven', 'Nature Soul'];

function Typewriter() {
  const [text, setText] = useState('');

  useEffect(() => {
    let wIdx = 0;
    let cIdx = 0;
    let isDel = false;
    let timer;
    const type = () => {
      const cur = words[wIdx];
      setText(isDel ? cur.substring(0, cIdx--) : cur.substring(0, cIdx++));
      if (!isDel && cIdx > cur.length) {
        isDel = true;
        timer = setTimeout(type, 2000);
      } else if (isDel && cIdx === 0) {
        isDel = false;
        wIdx = (wIdx + 1) % words.length;
        type();
      } else {
        timer = setTimeout(type, isDel ? 50 : 150);
      }
    };
    type();
    return () => clearTimeout(timer);
  }, []);

  return <span className="text-mahiPink">{text}</span>;
}

// Hero - restored to the original design.
export default function Hero() {
  return (
    <section id="top" className="h-screen flex items-center justify-center relative overflow-hidden">
      <div className="hero-mask" />
      <div className="z-10 text-center px-4">
        <div className="flex justify-center items-center gap-4 mb-6">
          <span className="text-[10px] text-mahiPink">LVL 82</span>
          <div className="hp-bar">
            <div className="hp-fill" />
          </div>
          <span className="text-[10px] text-mahiPink">HP 100%</span>
        </div>
        <h1 className="font-heading text-7xl md:text-[10rem] font-bold tracking-tighter leading-none mb-4 uppercase">
          {/* React Bits TechText on "MAHA" - hover / drag the letters */}
          <span className="tech-word relative inline-block align-baseline">
            <span className="invisible">MAHA</span>
            <span className="tech-word-canvas" aria-hidden="false">
              <TechText
                text="MAHA"
                fontWeight={700}
                fontSize={400}
                letterSpacing={0.01}
                color="#ffffff"
                accentColor="#ff3e81"
                reach={180}
                dashLength={5}
                dashGap={3}
                strokeWidth={1.5}
                reveal="letter"
                specks={14}
                labels
                draggable
                sweep
                speed={0.8}
              />
            </span>
          </span>{' '}
          <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>KANWAL</span>
        </h1>
        <div className="text-xl md:text-3xl">
          [ <Typewriter />
          <span className="typing-border">_</span> ]
        </div>
        <div className="mt-10 flex flex-wrap gap-4 sm:gap-6 justify-center">
          <a href="#game" className="hero-btn hero-btn-primary group">
            <span className="hero-btn-shine" aria-hidden="true" />
            <span className="hero-btn-icon">
              <Icon name="play" size={12} />
            </span>
            Start Mission
          </a>
          <a href="#contact" className="hero-btn hero-btn-ghost group">
            <span className="hero-btn-border" aria-hidden="true" />
            Call_Me_Mahi
            <Icon name="arrow-up-right" size={14} className="transition-transform duration-300 group-hover:rotate-45" />
          </a>
        </div>
      </div>
      <div className="absolute bottom-10 flex gap-6 md:gap-20 opacity-30 text-[8px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em]">
        <span>Nature Enthusiast</span>
        <span>Bug Hunter</span>
        <span>Mountain Soul</span>
      </div>
    </section>
  );
}

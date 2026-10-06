import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';

gsap.registerPlugin(ScrollTrigger);

// Original "zuu zuu" sound + chat bubble: if a visitor reaches the contact
// section and scrolls back up without typing anything, the page calls them back.
const SOUND_URL = 'https://www.soundjay.com/buttons/sounds/button-20.mp3';
const LINES = ['WAIT HUMAN...', "LET'S TALK FIRST?", 'CONNECTION LOST?'];

// fallback "zuu zuu" made with Web Audio if the mp3 cannot load
function synthZuu() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    [0, 0.22].forEach(offset => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(420, ctx.currentTime + offset);
      o.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + offset + 0.18);
      g.gain.setValueAtTime(0.0001, ctx.currentTime + offset);
      g.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + offset + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + offset + 0.2);
      o.connect(g).connect(ctx.destination);
      o.start(ctx.currentTime + offset);
      o.stop(ctx.currentTime + offset + 0.22);
    });
    setTimeout(() => ctx.close(), 800);
  } catch {
    /* audio not available */
  }
}

export default function ContactNudge({ interactedRef }) {
  const audioRef = useRef(null);
  const bubbleRef = useRef(null);
  const [text, setText] = useState('');

  useEffect(() => {
    const audio = new Audio(SOUND_URL);
    audio.preload = 'auto';
    audio.volume = 0.3;
    audioRef.current = audio;

    // browsers only allow sound after the first interaction - unlock it then
    const unlock = () => {
      audio
        .play()
        .then(() => {
          audio.pause();
          audio.currentTime = 0;
        })
        .catch(() => {});
    };
    document.addEventListener('click', unlock, { once: true });

    let played = false;
    let timers = [];
    const clear = () => {
      timers.forEach(clearTimeout);
      timers = [];
    };

    const typeLines = () => {
      clear();
      let li = 0;
      let ci = 0;
      let deleting = false;
      const step = () => {
        const line = LINES[li];
        if (!deleting) {
          ci++;
          setText(line.slice(0, ci));
          if (ci === line.length) {
            if (li === LINES.length - 1) {
              timers.push(setTimeout(() => gsap.to(bubbleRef.current, { opacity: 0, y: 20, duration: 1 }), 2500));
              return;
            }
            deleting = true;
            timers.push(setTimeout(step, 900));
            return;
          }
          timers.push(setTimeout(step, 40));
        } else {
          ci--;
          setText(line.slice(0, ci));
          if (ci === 0) {
            deleting = false;
            li++;
          }
          timers.push(setTimeout(step, 20));
        }
      };
      step();
    };

    const st = ScrollTrigger.create({
      trigger: '#contact',
      start: 'top center',
      onEnter: () => {
        played = false;
      },
      onLeaveBack: () => {
        if (interactedRef.current || played) return;
        played = true;
        audio.currentTime = 0;
        audio.play().catch(synthZuu);
        gsap.to(bubbleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' });
        typeLines();
      }
    });

    return () => {
      st.kill();
      clear();
      document.removeEventListener('click', unlock);
      audio.pause();
    };
  }, [interactedRef]);

  return (
    <div
      ref={bubbleRef}
      className="fixed bottom-10 right-6 sm:right-10 z-50 opacity-0 translate-y-10 pointer-events-none"
      role="status"
      aria-live="polite"
    >
      <div className="bg-white text-black px-6 py-4 rounded-t-3xl rounded-bl-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-3 border-b-4 border-pink-600">
        <span className="w-2 h-2 bg-pink-600 rounded-full animate-ping" />
        <p className="text-[11px] font-black uppercase tracking-[0.2em] leading-none min-w-[10ch]">{text}</p>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';

gsap.registerPlugin(ScrollTrigger);

// If a visitor reaches the contact section and scrolls back up without
// interacting, the page plays a short horror sting and shows a chat bubble.
const LINES = ['WAIT HUMAN...', "LET'S TALK FIRST?", 'CONNECTION LOST?'];

// Put your horror mp3 here. Best: download one and save it as public/horror.mp3, then use '/horror.mp3'.
// You can also paste any direct .mp3 link. If it fails to load, the built-in synth sound plays instead.
const SOUND_URL = '/horror.mp3';

// One shared AudioContext (browsers only let it start after a user gesture)
let sharedCtx = null;
const getCtx = () => {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return null;
  if (!sharedCtx) sharedCtx = new Ctx();
  return sharedCtx;
};

// Horror sting (~2.5s), fully synthesized so there is no mp3 to load:
// heartbeat thumps + low detuned drone + tritone screech with vibrato + noise whoosh
function horrorSound() {
  try {
    const ctx = getCtx();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    const t0 = ctx.currentTime + 0.02;
    const master = ctx.createGain();
    master.gain.value = 0.5; // overall volume: lower this if it is too loud
    const comp = ctx.createDynamicsCompressor();
    master.connect(comp).connect(ctx.destination);

    const env = (g, t, peak, attack, release) => {
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(peak, t + attack);
      g.gain.exponentialRampToValueAtTime(0.0001, t + attack + release);
    };

    // 1. heartbeat: two "lub-dub" pairs
    [0, 0.28, 0.95, 1.23].forEach(off => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(90, t0 + off);
      o.frequency.exponentialRampToValueAtTime(38, t0 + off + 0.18);
      env(g, t0 + off, 0.9, 0.01, 0.22);
      o.connect(g).connect(master);
      o.start(t0 + off);
      o.stop(t0 + off + 0.3);
    });

    // 2. low drone: detuned saws, filter slowly opens
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(180, t0);
    lp.frequency.exponentialRampToValueAtTime(900, t0 + 2);
    const drone = ctx.createGain();
    env(drone, t0, 0.3, 1.2, 1.3);
    lp.connect(drone).connect(master);
    [55, 58.3, 82.4].forEach(f => {
      const o = ctx.createOscillator();
      o.type = 'sawtooth';
      o.frequency.value = f;
      o.connect(lp);
      o.start(t0);
      o.stop(t0 + 2.6);
    });

    // 3. screech stab: two notes a tritone apart, wobbling and sliding down
    const st = t0 + 0.55;
    [1244.5, 1760].forEach(f => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(f, st);
      o.frequency.exponentialRampToValueAtTime(f * 0.6, st + 1.4);
      lfo.frequency.value = 9;
      lfoGain.gain.value = 45;
      lfo.connect(lfoGain).connect(o.frequency);
      env(g, st, 0.12, 0.03, 1.2);
      o.connect(g).connect(master);
      o.start(st);
      lfo.start(st);
      o.stop(st + 1.5);
      lfo.stop(st + 1.5);
    });

    // 4. noise whoosh
    const len = Math.floor(ctx.sampleRate * 2);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.Q.value = 1.5;
    bp.frequency.setValueAtTime(300, t0);
    bp.frequency.exponentialRampToValueAtTime(3000, t0 + 1.2);
    const ng = ctx.createGain();
    env(ng, t0, 0.18, 0.9, 1.0);
    noise.connect(bp).connect(ng).connect(master);
    noise.start(t0);
    noise.stop(t0 + 2);
  } catch {
    /* audio not available */
  }
}

export default function ContactNudge({ interactedRef }) {
  const bubbleRef = useRef(null);
  const [text, setText] = useState('');

  useEffect(() => {
    const audio = new Audio(SOUND_URL);
    audio.preload = 'auto';
    audio.volume = 0.6;

    // unlock audio on the first real user gesture
    const events = ['pointerdown', 'keydown', 'touchstart'];
    const unlock = () => {
      const ctx = getCtx();
      if (ctx && ctx.state === 'suspended') ctx.resume();
      audio
        .play()
        .then(() => {
          audio.pause();
          audio.currentTime = 0;
        })
        .catch(() => {});
      events.forEach(e => document.removeEventListener(e, unlock));
    };
    events.forEach(e => document.addEventListener(e, unlock));

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
        audio.play().catch(horrorSound);
        gsap.to(bubbleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' });
        typeLines();
      }
    });

    return () => {
      st.kill();
      clear();
      events.forEach(e => document.removeEventListener(e, unlock));
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
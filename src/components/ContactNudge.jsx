import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';

gsap.registerPlugin(ScrollTrigger);

// If a visitor reaches the contact section and scrolls back up without
// interacting, the page plays a screaming horror sting and shows a chat bubble.
const LINES = ['WAIT HUMAN...', "LET'S TALK FIRST?", 'CONNECTION LOST?'];

// Optional: put a real scream mp3 here (e.g. '/scream.mp3' inside your public folder).
// Leave it empty to use the built-in synthesized scream below.
const SOUND_URL = '';

// One shared AudioContext (browsers only let it start after a user gesture)
let sharedCtx = null;
const getCtx = () => {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return null;
  if (!sharedCtx) sharedCtx = new Ctx();
  return sharedCtx;
};

const makeDistortion = amount => {
  const n = 44100;
  const curve = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const x = (i * 2) / n - 1;
    curve[i] = ((3 + amount) * x * 20 * (Math.PI / 180)) / (Math.PI + amount * Math.abs(x));
  }
  return curve;
};

// Screaming jump scare (~2.5s), synthesized:
// tension riser -> sudden hit -> distorted, vowel-filtered scream that jumps up in pitch
// with a shaky vibrato, plus raspy breath noise.
function horrorSound() {
  try {
    const ctx = getCtx();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    const t0 = ctx.currentTime + 0.02;
    const hit = t0 + 0.45; // the moment the scream starts
    const end = hit + 1.9;

    const master = ctx.createGain();
    master.gain.value = 0.55; // overall volume: lower this if it is too loud
    const comp = ctx.createDynamicsCompressor();
    master.connect(comp).connect(ctx.destination);

    // 1. tension riser before the scare
    const riser = ctx.createOscillator();
    const rLp = ctx.createBiquadFilter();
    const rg = ctx.createGain();
    riser.type = 'sawtooth';
    riser.frequency.setValueAtTime(80, t0);
    riser.frequency.exponentialRampToValueAtTime(420, hit);
    rLp.type = 'lowpass';
    rLp.frequency.setValueAtTime(300, t0);
    rLp.frequency.exponentialRampToValueAtTime(2500, hit);
    rg.gain.setValueAtTime(0.0001, t0);
    rg.gain.exponentialRampToValueAtTime(0.25, hit - 0.02);
    rg.gain.exponentialRampToValueAtTime(0.0001, hit + 0.05);
    riser.connect(rLp).connect(rg).connect(master);
    riser.start(t0);
    riser.stop(hit + 0.06);

    // 2. heavy impact thud on the scare
    const thud = ctx.createOscillator();
    const tg = ctx.createGain();
    thud.type = 'sine';
    thud.frequency.setValueAtTime(110, hit);
    thud.frequency.exponentialRampToValueAtTime(30, hit + 0.4);
    tg.gain.setValueAtTime(0.0001, hit);
    tg.gain.exponentialRampToValueAtTime(1, hit + 0.01);
    tg.gain.exponentialRampToValueAtTime(0.0001, hit + 0.5);
    thud.connect(tg).connect(master);
    thud.start(hit);
    thud.stop(hit + 0.55);

    // 3. the scream: two slightly detuned saw voices -> distortion -> vowel formants
    const voice = ctx.createGain();
    voice.gain.setValueAtTime(0.0001, hit);
    voice.gain.exponentialRampToValueAtTime(0.9, hit + 0.03);
    voice.gain.linearRampToValueAtTime(0.7, hit + 1.1);
    voice.gain.exponentialRampToValueAtTime(0.0001, end);
    voice.connect(master);

    const shaper = ctx.createWaveShaper();
    shaper.curve = makeDistortion(40);
    shaper.oversample = '4x';

    // formants of an open "aaah" vowel; the first one sweeps to make the mouth "move"
    [
      [850, 1.0],
      [1250, 0.6],
      [2900, 0.35]
    ].forEach(([freq, amp], idx) => {
      const bp = ctx.createBiquadFilter();
      const fg = ctx.createGain();
      bp.type = 'bandpass';
      bp.Q.value = 6;
      bp.frequency.setValueAtTime(idx === 0 ? 700 : freq, hit);
      if (idx === 0) {
        bp.frequency.linearRampToValueAtTime(950, hit + 0.2);
        bp.frequency.linearRampToValueAtTime(780, hit + 1.7);
      }
      fg.gain.value = amp;
      shaper.connect(bp).connect(fg).connect(voice);
    });

    [1, 1.012].forEach(detune => {
      const o = ctx.createOscillator();
      o.type = 'sawtooth';
      // pitch shoots up fast, then slowly falls: classic scream contour
      o.frequency.setValueAtTime(500 * detune, hit);
      o.frequency.linearRampToValueAtTime(1150 * detune, hit + 0.18);
      o.frequency.linearRampToValueAtTime(900 * detune, hit + 1.0);
      o.frequency.linearRampToValueAtTime(700 * detune, hit + 1.7);

      // shaky vibrato + fast jitter so it sounds human and panicked
      [
        [7, 30],
        [17, 15]
      ].forEach(([rate, depth]) => {
        const lfo = ctx.createOscillator();
        const lg = ctx.createGain();
        lfo.frequency.value = rate;
        lg.gain.value = depth;
        lfo.connect(lg).connect(o.frequency);
        lfo.start(hit);
        lfo.stop(end);
      });

      o.connect(shaper);
      o.start(hit);
      o.stop(end);
    });

    // 4. raspy breath noise on top of the scream
    const len = Math.floor(ctx.sampleRate * 2.4);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    const nbp = ctx.createBiquadFilter();
    nbp.type = 'bandpass';
    nbp.frequency.value = 3500;
    nbp.Q.value = 0.8;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.0001, hit);
    ng.gain.exponentialRampToValueAtTime(0.25, hit + 0.05);
    ng.gain.exponentialRampToValueAtTime(0.0001, end);
    noise.connect(nbp).connect(ng).connect(master);
    noise.start(hit);
    noise.stop(end);
  } catch {
    /* audio not available */
  }
}

export default function ContactNudge({ interactedRef }) {
  const bubbleRef = useRef(null);
  const [text, setText] = useState('');

  useEffect(() => {
    const audio = SOUND_URL ? new Audio(SOUND_URL) : null;
    if (audio) {
      audio.preload = 'auto';
      audio.volume = 0.8;
    }

    // unlock audio on the first real user gesture
    const events = ['pointerdown', 'keydown', 'touchstart'];
    const unlock = () => {
      const ctx = getCtx();
      if (ctx && ctx.state === 'suspended') ctx.resume();
      audio
        ?.play()
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
        if (audio) {
          audio.currentTime = 0;
          audio.play().catch(horrorSound);
        } else {
          horrorSound();
        }
        gsap.to(bubbleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' });
        typeLines();
      }
    });

    return () => {
      st.kill();
      clear();
      events.forEach(e => document.removeEventListener(e, unlock));
      audio?.pause();
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
import { useEffect, useRef, useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import TiltCard from '../components/TiltCard';
import Icon from '../components/Icon';
import useReveal from '../components/useReveal';
import { favoriteSongs, creativeSides } from '../data/portfolio';

function MusicCard() {
  const [now, setNow] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setNow(n => (n + 1) % favoriteSongs.length), 4500);
    return () => clearInterval(t);
  }, [playing]);

  const song = favoriteSongs[now];

  return (
    <TiltCard max={8} className="life-card h-full rounded-2xl p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6 [transform:translateZ(30px)]">
        <span className="text-mahiPink text-[10px] font-semibold tracking-[0.25em] uppercase">On Repeat</span>
        <span className="flex items-end gap-[3px] h-4" aria-hidden="true">
          {[0, 1, 2, 3, 4].map(i => (
            <span key={i} className={`eq-bar ${playing ? '' : 'eq-paused'}`} style={{ animationDelay: `${i * 0.13}s` }} />
          ))}
        </span>
      </div>

      <div className="grid sm:grid-cols-[200px_1fr] gap-8 items-center">
        {/* 3D vinyl */}
        <div className="relative mx-auto w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] [perspective:800px]">
          <div className={`vinyl ${playing ? 'vinyl-spin' : ''}`}>
            <div className="vinyl-label">
              <img src="/img/mk-logo.svg" alt="" className="w-8 h-8 opacity-90" />
            </div>
          </div>
          <div className={`tonearm ${playing ? 'tonearm-on' : ''}`} aria-hidden="true" />
        </div>

        <div className="min-w-0 [transform:translateZ(25px)]">
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/50 mb-1">Now Playing</p>
          <h3 key={now} className="song-in text-2xl font-bold text-white truncate">{song.title}</h3>
          <p className="text-sm text-white/60 mb-5 truncate">{song.artist || "One of Mahi's favourites"}</p>

          <div className="h-1 rounded-full bg-white/10 overflow-hidden mb-5">
            <div key={`p${now}`} className={`h-full bg-gradient-to-r from-pink-600 to-pink-300 ${playing ? 'song-progress' : ''}`} />
          </div>

          <div className="flex items-center gap-3 mb-6">
            <button type="button" onClick={() => setNow(n => (n - 1 + favoriteSongs.length) % favoriteSongs.length)} className="player-btn" aria-label="Previous song">
              <Icon name="play" size={12} className="rotate-180" />
              <Icon name="play" size={12} className="rotate-180 -ml-1.5" />
            </button>
            <button type="button" onClick={() => setPlaying(p => !p)} className="player-btn player-main" aria-label={playing ? 'Pause' : 'Play'}>
              <Icon name={playing ? 'pause' : 'play'} size={16} />
            </button>
            <button type="button" onClick={() => setNow(n => (n + 1) % favoriteSongs.length)} className="player-btn" aria-label="Next song">
              <Icon name="play" size={12} />
              <Icon name="play" size={12} className="-ml-1.5" />
            </button>
          </div>

          <ul className="space-y-1.5 max-h-[232px] overflow-y-auto pr-1 song-list">
            {favoriteSongs.map((s, i) => (
              <li key={s.title + i}>
                {(() => {
                  const cls = `w-full flex items-center gap-3 text-left px-3 py-2 rounded-lg text-xs transition ${
                    i === now ? 'bg-pink-500/15 text-white' : 'text-white/60 hover:bg-white/5'
                  }`;
                  const inner = (
                    <>
                      <span className="font-mono text-[10px] text-mahiPink w-5">{String(i + 1).padStart(2, '0')}</span>
                      <span className="truncate flex-1">{s.title}</span>
                      {s.artist && <span className="truncate text-white/40 hidden sm:inline max-w-[45%]">{s.artist}</span>}
                      {s.link && <Icon name="arrow-up-right" size={12} className="text-white/40" />}
                    </>
                  );
                  return s.link ? (
                    <a href={s.link} target="_blank" rel="noopener noreferrer" className={cls} onClick={() => setNow(i)}>
                      {inner}
                    </a>
                  ) : (
                    <button type="button" onClick={() => setNow(i)} className={cls}>
                      {inner}
                    </button>
                  );
                })()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </TiltCard>
  );
}

const LOOT = ['Lv.3 Passion', 'Squad Calls', 'Final Circle Focus', 'Clutch Mode', 'Chicken Dinner Hunger'];
const FEED = ['Mahi joined the squad', 'Airdrop incoming', 'Mahi revived a teammate', 'Mahi is on a streak', 'Squad entered the final circle'];

const Plane = () => (
  <svg viewBox="0 0 240 80" className="w-full h-full" aria-hidden="true">
    {/* tail fin + stabiliser */}
    <path d="M22 34 L10 4 L30 4 L56 32 Z" fill="#6f7580" />
    <path d="M14 40 L40 36 L44 42 L16 44 Z" fill="#5d636d" />
    {/* fuselage */}
    <path d="M12 42 Q16 30 44 30 L188 28 Q220 28 234 40 Q222 52 188 52 L44 54 Q16 54 12 42 Z" fill="#8b919b" />
    <path d="M44 46 L188 45 Q214 45 230 44 Q220 52 188 52 L44 54 Q22 54 16 48 Z" fill="#6c727c" />
    {/* cargo ramp */}
    <path d="M30 44 L58 42 L58 52 L34 53 Z" fill="#4d525b" />
    {/* wing + engines */}
    <path d="M92 26 L168 25 L160 31 L100 32 Z" fill="#5a606a" />
    <rect x="108" y="29" width="16" height="8" rx="3" fill="#4b5058" />
    <rect x="140" y="28" width="16" height="8" rx="3" fill="#4b5058" />
    <ellipse className="prop" cx="125" cy="33" rx="1.6" ry="9" fill="#cfd3da" opacity="0.6" />
    <ellipse className="prop" cx="157" cy="32" rx="1.6" ry="9" fill="#cfd3da" opacity="0.6" />
    {/* cockpit + windows */}
    <path d="M212 32 Q224 33 230 39 L214 39 Z" fill="#1d2430" />
    {[70, 86, 102, 170, 186].map(x => (
      <rect key={x} x={x} y="36" width="6" height="4" rx="1" fill="#2c3440" />
    ))}
    {/* nav light */}
    <circle className="nav-light" cx="20" cy="6" r="2" fill="#ff4d4d" />
  </svg>
);

const Chute = () => (
  <svg viewBox="0 0 140 96" className="w-full h-full" aria-hidden="true">
    <defs>
      <clipPath id="canopy-clip">
        <path d="M4 52 C4 6 136 6 136 52 Q128 47 120 52 Q112 47 104 52 Q96 47 88 52 Q80 47 72 52 Q64 47 56 52 Q48 47 40 52 Q32 47 24 52 Q16 47 4 52 Z" />
      </clipPath>
      <linearGradient id="canopy-shade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#000" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity="0.28" />
      </linearGradient>
    </defs>
    <g clipPath="url(#canopy-clip)">
      {Array.from({ length: 9 }).map((_, i) => (
        <rect key={i} x={4 + i * 14.7} y="0" width="14.8" height="60" fill={i % 2 ? '#f2efe8' : '#d8342a'} />
      ))}
      <rect x="0" y="0" width="140" height="60" fill="url(#canopy-shade)" />
    </g>
    <g stroke="#e9e4da" strokeWidth="0.7" opacity="0.75">
      {[4, 24, 40, 56, 72, 88, 104, 120, 136].map(x => (
        <line key={x} x1={x} y1="51" x2="70" y2="96" />
      ))}
    </g>
  </svg>
);

const Crate = () => (
  <svg viewBox="0 0 80 64" className="w-full h-full" aria-hidden="true">
    {/* lid */}
    <g className="crate-lid">
      <rect x="2" y="6" width="76" height="12" rx="2" fill="#4a5059" />
      <rect x="2" y="6" width="76" height="3" rx="1.5" fill="#6b727c" />
    </g>
    {/* body */}
    <rect x="4" y="17" width="72" height="44" rx="2" fill="#3b4048" />
    <rect x="4" y="17" width="72" height="44" rx="2" fill="none" stroke="#5f666f" strokeWidth="3" />
    <path d="M6 19 L74 59 M74 19 L6 59" stroke="#2e3239" strokeWidth="3" />
    {/* red & blue markings */}
    <rect x="4" y="30" width="72" height="9" fill="#d8342a" />
    <rect x="4" y="39" width="72" height="3" fill="#2f6fd6" />
    <text x="40" y="37.5" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#fff" fontFamily="JetBrains Mono, monospace" letterSpacing="1">CARE PACKAGE</text>
    {/* straps + rivets */}
    <rect x="18" y="17" width="5" height="44" fill="#262a30" />
    <rect x="57" y="17" width="5" height="44" fill="#262a30" />
    {[[8, 22], [72, 22], [8, 56], [72, 56]].map(([x, y]) => (
      <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill="#8a919a" />
    ))}
  </svg>
);

// PUBG card - a cargo plane flies over, drops a care package that parachutes down
// and lands with red smoke. Tap the crate to open it.
function PubgCard() {
  const sceneRef = useRef(null);
  const [phase, setPhase] = useState('idle'); // idle | fly | fall | landed | open
  const [run, setRun] = useState(0);
  const [feed, setFeed] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setFeed(f => (f + 1) % FEED.length), 2600);
    return () => clearInterval(t);
  }, []);

  // start the flight when the card scrolls into view
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setPhase(p => (p === 'idle' ? 'fly' : p));
      }
    }, { threshold: 0.4 });
    io.observe(sceneRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (phase === 'idle') return;
    const timers = [];
    if (phase === 'fly') timers.push(setTimeout(() => setPhase('fall'), 2400));
    if (phase === 'fall') timers.push(setTimeout(() => setPhase('landed'), 4300));
    return () => timers.forEach(clearTimeout);
  }, [phase, run]);

  const restart = () => {
    setRun(r => r + 1);
    setPhase('fly');
  };

  const crateVisible = phase === 'fall' || phase === 'landed' || phase === 'open';

  return (
    <TiltCard max={5} className="life-card pubg-card h-full rounded-2xl overflow-hidden">
      <div className="pubg-sky relative h-full min-h-[480px] flex flex-col">
        <span className="pubg-sun" aria-hidden="true" />
        <span className="pubg-cloud pubg-cloud-1" aria-hidden="true" />
        <span className="pubg-cloud pubg-cloud-2" aria-hidden="true" />
        <span className="pubg-hills" aria-hidden="true" />
        <span className="pubg-ground" aria-hidden="true" />

        <div className="relative z-10 flex items-start justify-between p-5 sm:p-6">
          <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-[#ffd36e]">Gamer Mode</span>
          <div className="pubg-feed" aria-live="polite">
            <span key={feed} className="pubg-feed-line">{FEED[feed]}</span>
          </div>
        </div>

        {/* scene */}
        <div ref={sceneRef} key={run} className={`pubg-scene phase-${phase}`}>
          {(phase === 'fly' || phase === 'fall') && (
            <div className="pubg-plane-svg">
              <Plane />
            </div>
          )}

          {crateVisible && (
            <button
              type="button"
              onClick={() => (phase === 'landed' ? setPhase('open') : phase === 'open' ? restart() : null)}
              className="pubg-drop"
              aria-label={phase === 'open' ? 'Call another airdrop' : 'Open the care package'}
            >
              <span className="pubg-chute">
                <Chute />
              </span>
              <span className="pubg-crate">
                <Crate />
                {phase === 'open' && <span className="pubg-crate-glow" aria-hidden="true" />}
              </span>
            </button>
          )}

          {(phase === 'landed' || phase === 'open') && (
            <span className="pubg-smoke" aria-hidden="true">
              {Array.from({ length: 7 }).map((_, i) => (
                <i key={i} style={{ animationDelay: `${i * 0.35}s`, left: `${40 + (i % 3) * 8}%` }} />
              ))}
            </span>
          )}

          {phase === 'open' && (
            <ul className="loot-list" aria-label="Care package loot">
              {LOOT.map((l, i) => (
                <li key={l} className="loot-chip" style={{ animationDelay: `${i * 90}ms` }}>
                  {l}
                </li>
              ))}
            </ul>
          )}

          <span className="pubg-hint">
            {phase === 'fly' && 'Airdrop incoming...'}
            {phase === 'fall' && 'Care package dropping'}
            {phase === 'landed' && 'Tap the crate to open it'}
            {phase === 'open' && 'Tap again for another drop'}
          </span>
        </div>

        <div className="relative z-10 p-5 sm:p-6 pt-2 mt-auto">
          <h3 className="text-3xl sm:text-4xl font-black text-white leading-none">
            PUBG <span className="text-transparent" style={{ WebkitTextStroke: '1.2px #ffd36e' }}>Mode</span>
          </h3>
          <p className="text-sm text-white/80 mt-3 leading-relaxed max-w-sm">
            I play PUBG with full passion - squad calls, smart rotations and that final-circle rush.
          </p>
          <span className="chicken-banner mt-4">Winner Winner Chicken Dinner</span>
        </div>
      </div>
    </TiltCard>
  );
}

// "Off The Clock" - favourite songs, PUBG and creativity.
export default function OffTheClock() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section id="life" ref={ref} className="relative py-20 px-4 sm:px-6 z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Off The" outline="Clock">
          When the laptop closes - music on repeat, squad matches with the team, and a lot of creative chaos.
        </SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 [perspective:1400px]">
          <div className="reveal-3d lg:col-span-7">
            <MusicCard />
          </div>
          <div className="reveal-3d lg:col-span-5">
            <PubgCard />
          </div>
          {creativeSides.map((c, i) => (
            <div key={c.title} className="reveal-3d lg:col-span-4">
              <TiltCard max={12} className="life-card h-full rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3 [transform:translateZ(30px)]">
                  <span className="role-icon !w-10 !h-10">
                    <Icon name={['pen-tool', 'map-pin', 'sparkles'][i]} size={18} />
                  </span>
                  <h4 className="text-white font-semibold">{c.title}</h4>
                </div>
                <p className="text-sm text-white/70 leading-relaxed [transform:translateZ(15px)]">{c.text}</p>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

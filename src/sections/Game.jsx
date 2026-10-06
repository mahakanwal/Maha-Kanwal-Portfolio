import { useCallback, useEffect, useRef, useState } from 'react';
import GlitchText from '../components/reactbits/GlitchText';
import SectionHeading from '../components/SectionHeading';
import Icon from '../components/Icon';

// ---------------------------------------------------------------
// BUG HUNTER - a small arcade shooter, playable right inside the page.
// Move: mouse / touch drag / arrow keys / A-D.  Auto-fire.  P = pause.
// ---------------------------------------------------------------

const PINK = '#ff3e81';
const BEST_KEY = 'mahi-bug-hunter-best';

const readBest = () => {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
};
const writeBest = v => {
  try {
    localStorage.setItem(BEST_KEY, String(v));
  } catch {
    /* storage unavailable - ignore */
  }
};

const BUG_TYPES = {
  basic: { hp: 1, r: 14, speed: 1, color: '#ff3e81', score: 10 },
  fast: { hp: 1, r: 10, speed: 1.9, color: '#ffb8d1', score: 15 },
  tank: { hp: 4, r: 21, speed: 0.6, color: '#e0136a', score: 40 }
};

function makeState(w, h) {
  return {
    w,
    h,
    t: 0,
    player: { x: w / 2, y: h - 54, tx: w / 2, r: 18, inv: 0 },
    bullets: [],
    bugs: [],
    particles: [],
    drops: [],
    stars: Array.from({ length: 70 }, () => ({ x: Math.random() * w, y: Math.random() * h, z: Math.random() * 0.8 + 0.2 })),
    fireCd: 0,
    spawnCd: 40,
    triple: 0,
    score: 0,
    lives: 3,
    level: 1,
    kills: 0,
    shake: 0,
    gridOffset: 0
  };
}

function drawShip(ctx, p, t) {
  const { x, y } = p;
  ctx.save();
  if (p.inv > 0 && Math.floor(t / 4) % 2 === 0) ctx.globalAlpha = 0.35;
  // thruster
  const flame = 10 + Math.sin(t * 0.6) * 4;
  const g = ctx.createLinearGradient(x, y + 12, x, y + 12 + flame + 10);
  g.addColorStop(0, 'rgba(255,184,209,0.95)');
  g.addColorStop(1, 'rgba(255,62,129,0)');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(x - 7, y + 12);
  ctx.lineTo(x + 7, y + 12);
  ctx.lineTo(x, y + 22 + flame);
  ctx.closePath();
  ctx.fill();
  // body
  ctx.shadowColor = PINK;
  ctx.shadowBlur = 18;
  ctx.fillStyle = '#16090f';
  ctx.strokeStyle = PINK;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x, y - 22);
  ctx.lineTo(x + 18, y + 14);
  ctx.lineTo(x + 6, y + 9);
  ctx.lineTo(x, y + 14);
  ctx.lineTo(x - 6, y + 9);
  ctx.lineTo(x - 18, y + 14);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  // cockpit
  ctx.shadowBlur = 10;
  ctx.fillStyle = '#ffb8d1';
  ctx.beginPath();
  ctx.ellipse(x, y - 3, 3.5, 7, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawBug(ctx, b, t) {
  const type = BUG_TYPES[b.type];
  const r = type.r;
  ctx.save();
  ctx.translate(b.x, b.y);
  ctx.rotate(Math.sin(t * 0.1 + b.seed) * 0.15);
  ctx.strokeStyle = type.color;
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  // legs
  const wiggle = Math.sin(t * 0.4 + b.seed) * 3;
  for (let i = -1; i <= 1; i++) {
    const ly = i * r * 0.45;
    ctx.beginPath();
    ctx.moveTo(-r * 0.6, ly);
    ctx.lineTo(-r * 1.15, ly + (i === 0 ? wiggle : -wiggle));
    ctx.moveTo(r * 0.6, ly);
    ctx.lineTo(r * 1.15, ly + (i === 0 ? -wiggle : wiggle));
    ctx.stroke();
  }
  // antennae
  ctx.beginPath();
  ctx.moveTo(-r * 0.25, r * 0.85);
  ctx.quadraticCurveTo(-r * 0.5, r * 1.4, -r * 0.7, r * 1.45);
  ctx.moveTo(r * 0.25, r * 0.85);
  ctx.quadraticCurveTo(r * 0.5, r * 1.4, r * 0.7, r * 1.45);
  ctx.stroke();
  // body
  ctx.shadowColor = type.color;
  ctx.shadowBlur = 14;
  ctx.fillStyle = b.flash > 0 ? '#ffffff' : '#12070d';
  ctx.beginPath();
  ctx.ellipse(0, 0, r * 0.7, r * 0.9, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  // shell line + head
  ctx.shadowBlur = 0;
  ctx.beginPath();
  ctx.moveTo(0, -r * 0.85);
  ctx.lineTo(0, r * 0.6);
  ctx.stroke();
  ctx.fillStyle = type.color;
  ctx.beginPath();
  ctx.arc(0, r * 0.8, r * 0.32, 0, Math.PI * 2);
  ctx.fill();
  // hp pips for tanks
  if (b.type === 'tank') {
    for (let i = 0; i < b.hp; i++) {
      ctx.fillRect(-r * 0.6 + i * (r * 0.4), -r * 1.35, r * 0.3, 3);
    }
  }
  ctx.restore();
}

function drawCoffee(ctx, d, t) {
  ctx.save();
  ctx.translate(d.x, d.y + Math.sin(t * 0.1) * 3);
  ctx.shadowColor = '#7df9ff';
  ctx.shadowBlur = 16;
  ctx.strokeStyle = '#7df9ff';
  ctx.fillStyle = 'rgba(125,249,255,0.15)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(-9, -8, 18, 18, 3);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(11, 0, 4, -Math.PI / 2, Math.PI / 2);
  ctx.stroke();
  ctx.font = 'bold 9px JetBrains Mono, monospace';
  ctx.fillStyle = '#7df9ff';
  ctx.textAlign = 'center';
  ctx.fillText('x3', 0, 5);
  ctx.restore();
}

function burst(s, x, y, color, n = 14) {
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2;
    const sp = Math.random() * 4 + 1;
    s.particles.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 1, color, size: Math.random() * 3 + 1 });
  }
}

export default function Game() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const statusRef = useRef('ready');
  const keys = useRef({ left: false, right: false });
  const inView = useRef(false);
  const [status, setStatusState] = useState('ready'); // ready | playing | paused | over
  const [hud, setHud] = useState({ score: 0, lives: 3, level: 1, triple: false });
  const [best, setBest] = useState(0);

  const setStatus = useCallback(s => {
    statusRef.current = s;
    setStatusState(s);
  }, []);

  useEffect(() => setBest(readBest()), []);

  const start = useCallback(() => {
    const c = canvasRef.current;
    stateRef.current = makeState(c.clientWidth, c.clientHeight);
    setHud({ score: 0, lives: 3, level: 1, triple: false });
    setStatus('playing');
    c.focus({ preventScroll: true });
  }, [setStatus]);

  const togglePause = useCallback(() => {
    if (statusRef.current === 'playing') setStatus('paused');
    else if (statusRef.current === 'paused') setStatus('playing');
  }, [setStatus]);

  // main loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      if (!stateRef.current) stateRef.current = makeState(w, h);
      else {
        const s = stateRef.current;
        s.w = w;
        s.h = h;
        s.player.y = h - 54;
        s.player.x = Math.min(s.player.x, w - 20);
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let lastHud = '';
    const pushHud = s => {
      const key = `${s.score}|${s.lives}|${s.level}|${s.triple > 0}`;
      if (key !== lastHud) {
        lastHud = key;
        setHud({ score: s.score, lives: s.lives, level: s.level, triple: s.triple > 0 });
      }
    };

    const update = s => {
      s.t++;
      const p = s.player;
      // movement
      const kSpeed = 7;
      if (keys.current.left) p.tx -= kSpeed;
      if (keys.current.right) p.tx += kSpeed;
      p.tx = Math.max(20, Math.min(s.w - 20, p.tx));
      p.x += (p.tx - p.x) * 0.22;
      if (p.inv > 0) p.inv--;

      // auto fire
      s.fireCd--;
      if (s.fireCd <= 0) {
        s.fireCd = 11;
        const shots = s.triple > 0 ? [-0.18, 0, 0.18] : [0];
        shots.forEach(a => s.bullets.push({ x: p.x, y: p.y - 22, vx: Math.sin(a) * 9, vy: -Math.cos(a) * 9 }));
      }
      if (s.triple > 0) s.triple--;

      // spawn bugs
      s.spawnCd--;
      if (s.spawnCd <= 0) {
        const lvl = s.level;
        s.spawnCd = Math.max(16, 58 - lvl * 5) + Math.random() * 20;
        const roll = Math.random();
        const type = lvl >= 3 && roll < 0.14 ? 'tank' : lvl >= 2 && roll < 0.4 ? 'fast' : 'basic';
        const T = BUG_TYPES[type];
        s.bugs.push({
          type,
          x: 30 + Math.random() * (s.w - 60),
          y: -30,
          hp: T.hp,
          vy: (1.1 + lvl * 0.18) * T.speed,
          amp: Math.random() * 1.6,
          seed: Math.random() * 100,
          flash: 0
        });
      }

      // bullets
      s.bullets.forEach(b => {
        b.x += b.vx;
        b.y += b.vy;
      });
      s.bullets = s.bullets.filter(b => b.y > -20 && b.x > -20 && b.x < s.w + 20);

      // bugs
      s.bugs.forEach(b => {
        b.y += b.vy;
        b.x += Math.sin((s.t + b.seed * 10) * 0.04) * b.amp;
        if (b.flash > 0) b.flash--;
      });

      // collisions bullet/bug
      for (const b of s.bugs) {
        const r = BUG_TYPES[b.type].r;
        for (const bl of s.bullets) {
          if (bl.dead) continue;
          const dx = bl.x - b.x;
          const dy = bl.y - b.y;
          if (dx * dx + dy * dy < (r + 4) * (r + 4)) {
            bl.dead = true;
            b.hp--;
            b.flash = 4;
            if (b.hp <= 0) {
              b.dead = true;
              s.score += BUG_TYPES[b.type].score * s.level;
              s.kills++;
              burst(s, b.x, b.y, BUG_TYPES[b.type].color, b.type === 'tank' ? 26 : 14);
              if (Math.random() < 0.07) s.drops.push({ x: b.x, y: b.y });
              if (s.kills % 15 === 0) s.level++;
            }
            break;
          }
        }
      }
      s.bullets = s.bullets.filter(b => !b.dead);

      // bugs vs player / escaping
      for (const b of s.bugs) {
        if (b.dead) continue;
        const r = BUG_TYPES[b.type].r;
        const dx = b.x - p.x;
        const dy = b.y - p.y;
        if (p.inv <= 0 && dx * dx + dy * dy < (r + p.r) * (r + p.r)) {
          b.dead = true;
          burst(s, b.x, b.y, '#ffffff', 20);
          s.lives--;
          p.inv = 90;
          s.shake = 14;
        } else if (b.y > s.h + 20) {
          b.dead = true;
          s.lives--;
          s.shake = 10;
        }
      }
      s.bugs = s.bugs.filter(b => !b.dead);

      // drops
      s.drops.forEach(d => (d.y += 1.6));
      s.drops = s.drops.filter(d => {
        const dx = d.x - p.x;
        const dy = d.y - p.y;
        if (dx * dx + dy * dy < 30 * 30) {
          s.triple = 60 * 7;
          burst(s, d.x, d.y, '#7df9ff', 16);
          return false;
        }
        return d.y < s.h + 20;
      });

      // particles
      s.particles.forEach(pt => {
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.vx *= 0.95;
        pt.vy *= 0.95;
        pt.life -= 0.025;
      });
      s.particles = s.particles.filter(pt => pt.life > 0);

      if (s.shake > 0) s.shake--;
      s.gridOffset = (s.gridOffset + 1.2 + s.level * 0.15) % 40;

      if (s.lives <= 0) {
        s.lives = 0;
        burst(s, p.x, p.y, PINK, 40);
        const b = readBest();
        if (s.score > b) {
          writeBest(s.score);
          setBest(s.score);
        }
        setStatus('over');
      }
    };

    const draw = s => {
      const { w, h } = s;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // stars
      s.stars.forEach(st => {
        if (statusRef.current === 'playing') {
          st.y += st.z * 1.4;
          if (st.y > h) {
            st.y = 0;
            st.x = Math.random() * w;
          }
        }
        ctx.fillStyle = `rgba(255,${180 + st.z * 60},${210 + st.z * 40},${st.z * 0.8})`;
        ctx.fillRect(st.x, st.y, st.z * 2, st.z * 2);
      });

      // synthwave perspective floor (pseudo 3D)
      const horizon = h * 0.62;
      ctx.save();
      const fade = ctx.createLinearGradient(0, horizon, 0, h);
      fade.addColorStop(0, 'rgba(255,62,129,0)');
      fade.addColorStop(1, 'rgba(255,62,129,0.12)');
      ctx.fillStyle = fade;
      ctx.fillRect(0, horizon, w, h - horizon);
      ctx.strokeStyle = 'rgba(255,62,129,0.22)';
      ctx.lineWidth = 1;
      const vx = w / 2;
      for (let i = -14; i <= 14; i++) {
        ctx.beginPath();
        ctx.moveTo(vx + i * 12, horizon);
        ctx.lineTo(vx + i * w * 0.16, h);
        ctx.stroke();
      }
      for (let i = 0; i < 12; i++) {
        const z = (i * 40 + s.gridOffset) / 480;
        const y = horizon + (h - horizon) * z * z;
        ctx.globalAlpha = Math.min(1, z * 1.5);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      ctx.restore();

      ctx.save();
      if (s.shake > 0) ctx.translate((Math.random() - 0.5) * s.shake, (Math.random() - 0.5) * s.shake);

      // bullets
      ctx.save();
      ctx.shadowColor = PINK;
      ctx.shadowBlur = 10;
      ctx.fillStyle = s.triple > 0 ? '#7df9ff' : '#ffd1e3';
      s.bullets.forEach(b => {
        ctx.beginPath();
        ctx.roundRect(b.x - 2, b.y - 8, 4, 14, 2);
        ctx.fill();
      });
      ctx.restore();

      s.drops.forEach(d => drawCoffee(ctx, d, s.t));
      s.bugs.forEach(b => drawBug(ctx, b, s.t));
      if (statusRef.current !== 'over') drawShip(ctx, s.player, s.t);

      s.particles.forEach(pt => {
        ctx.globalAlpha = pt.life;
        ctx.fillStyle = pt.color;
        ctx.fillRect(pt.x, pt.y, pt.size, pt.size);
      });
      ctx.globalAlpha = 1;
      ctx.restore();
    };

    // fixed time-step: game speed is identical on 60Hz, 120Hz and slower devices
    const STEP = 1000 / 60;
    let last = performance.now();
    let acc = 0;
    const loop = now => {
      const s = stateRef.current;
      const elapsed = Math.min(now - last, 100);
      last = now;
      if (s) {
        if (statusRef.current === 'playing' && inView.current && !document.hidden) {
          acc += elapsed;
          let steps = 0;
          while (acc >= STEP && steps < 6 && statusRef.current === 'playing') {
            update(s);
            acc -= STEP;
            steps++;
          }
          if (steps === 6) acc = 0;
          pushHud(s);
        } else if (statusRef.current === 'over') {
          // let the final explosion play out
          s.particles.forEach(pt => {
            pt.x += pt.vx;
            pt.y += pt.vy;
            pt.life -= 0.02;
          });
          s.particles = s.particles.filter(pt => pt.life > 0);
          pushHud(s);
        }
        if (statusRef.current !== 'playing') acc = 0;
        draw(s);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [setStatus]);

  // auto pause when scrolled away
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      inView.current = e.isIntersecting;
      if (!e.isIntersecting && statusRef.current === 'playing') setStatus('paused');
    }, { threshold: 0.35 });
    io.observe(wrapRef.current);
    return () => io.disconnect();
  }, [setStatus]);

  // keyboard
  useEffect(() => {
    const down = e => {
      if (!inView.current) return;
      const k = e.key;
      const playing = statusRef.current === 'playing';
      if (k === 'ArrowLeft' || k === 'a' || k === 'A') {
        keys.current.left = true;
        if (playing) e.preventDefault();
      }
      if (k === 'ArrowRight' || k === 'd' || k === 'D') {
        keys.current.right = true;
        if (playing) e.preventDefault();
      }
      if ((k === 'p' || k === 'P' || k === 'Escape') && (playing || statusRef.current === 'paused')) togglePause();
      if (k === ' ' && document.activeElement === canvasRef.current) {
        e.preventDefault();
        if (statusRef.current === 'ready' || statusRef.current === 'over') start();
        else togglePause();
      }
    };
    const up = e => {
      const k = e.key;
      if (k === 'ArrowLeft' || k === 'a' || k === 'A') keys.current.left = false;
      if (k === 'ArrowRight' || k === 'd' || k === 'D') keys.current.right = false;
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, [start, togglePause]);

  // pointer / touch steering
  const steer = e => {
    const s = stateRef.current;
    if (!s) return;
    const r = canvasRef.current.getBoundingClientRect();
    s.player.tx = Math.max(20, Math.min(s.w - 20, e.clientX - r.left));
  };

  return (
    <section id="game" className="relative py-20 px-4 sm:px-6 z-10">
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="Side Quest:" outline="Bug Hunter">
          Every developer's daily battle - now playable. Squash the bugs before they ship to production. Grab the coffee for
          triple-shot mode.
        </SectionHeading>

        <div className="game-cabinet [perspective:1600px]">
          <div ref={wrapRef} className="game-screen relative rounded-2xl overflow-hidden">
            {/* HUD */}
            <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between gap-2 px-4 sm:px-6 py-3 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-mono pointer-events-none">
              <div className="flex items-center gap-4 sm:gap-6">
                <span className="text-white/60">
                  Score <b className="text-white text-sm ml-1">{hud.score}</b>
                </span>
                <span className="text-white/60 hidden sm:inline">
                  Lvl <b className="text-mahiPink text-sm ml-1">{hud.level}</b>
                </span>
                {hud.triple && <span className="text-[#7df9ff] animate-pulse">Triple Shot</span>}
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-mahiPink" aria-label={`${hud.lives} lives`}>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Icon key={i} name="heart" size={14} className={i < hud.lives ? 'fill-current' : 'opacity-25'} />
                  ))}
                </span>
                <span className="text-white/60 flex items-center gap-1">
                  <Icon name="trophy" size={13} /> <b className="text-white">{best}</b>
                </span>
              </div>
            </div>

            <canvas
              ref={canvasRef}
              tabIndex={0}
              aria-label="Bug Hunter game canvas"
              className="block w-full h-[460px] sm:h-[520px] outline-none touch-none"
              onPointerMove={steer}
              onPointerDown={e => {
                steer(e);
                canvasRef.current.focus({ preventScroll: true });
              }}
            />

            {status === 'playing' && (
              <button
                type="button"
                onClick={togglePause}
                className="absolute bottom-4 right-4 z-20 w-10 h-10 rounded-full glass flex items-center justify-center text-white/80 hover:text-mahiPink"
                aria-label="Pause game"
              >
                <Icon name="pause" size={16} />
              </button>
            )}

            {status !== 'playing' && (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6 bg-[#05040a]/75 backdrop-blur-[2px]">
                {status === 'ready' && (
                  <>
                    <GlitchText speed={0.6} className="text-4xl sm:text-7xl tracking-tight whitespace-nowrap">
                      BUG HUNTER
                    </GlitchText>
                    <p className="mt-6 text-white/70 text-xs sm:text-sm max-w-md leading-relaxed">
                      Move with your <b className="text-white">mouse</b>, <b className="text-white">finger</b> or{' '}
                      <b className="text-white">arrow keys</b>. Your ship fires automatically. Don't let bugs reach production.
                    </p>
                    <button type="button" onClick={start} className="game-btn mt-8">
                      <Icon name="play" size={14} /> Start Mission
                    </button>
                  </>
                )}
                {status === 'paused' && (
                  <>
                    <h3 className="text-4xl sm:text-5xl font-black text-white tracking-tight">PAUSED</h3>
                    <p className="mt-3 text-white/60 text-xs uppercase tracking-[0.3em]">Score {hud.score}</p>
                    <button type="button" onClick={togglePause} className="game-btn mt-8">
                      <Icon name="play" size={14} /> Resume
                    </button>
                  </>
                )}
                {status === 'over' && (
                  <>
                    <GlitchText speed={0.4} className="text-4xl sm:text-7xl tracking-tight whitespace-nowrap">
                      GAME OVER
                    </GlitchText>
                    <p className="mt-6 text-white/70 text-sm">
                      You squashed bugs worth <b className="text-mahiPink">{hud.score}</b> points
                      {hud.score > 0 && hud.score >= best ? ' - new high score!' : '.'}
                    </p>
                    <button type="button" onClick={start} className="game-btn mt-8">
                      <Icon name="rotate-ccw" size={14} /> Play Again
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-x-8 gap-y-2 text-[10px] uppercase tracking-[0.25em] text-white/45 font-mono">
            <span>Move: Mouse / Touch / Arrows</span>
            <span>Pause: P</span>
            <span>Coffee = Triple Shot</span>
          </div>
        </div>
      </div>
    </section>
  );
}

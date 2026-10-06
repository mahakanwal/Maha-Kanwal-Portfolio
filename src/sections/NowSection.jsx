import { useRef, useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import Icon from '../components/Icon';
import Logo from '../components/Logo';
import useReveal from '../components/useReveal';
import { currentRoles } from '../data/portfolio';

// Each role is a hanging ID badge: it sways, swings toward the pointer and flips on click.
function Badge({ role, index }) {
  const [flipped, setFlipped] = useState(false);
  const swingRef = useRef(null);

  const onMove = e => {
    if (e.pointerType === 'touch') return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    swingRef.current.style.setProperty('--swing', `${px * -10}deg`);
    swingRef.current.style.setProperty('--tilt', `${px * 18}deg`);
    swingRef.current.style.setProperty('--lift', `${py * -8}deg`);
  };
  const onLeave = () => {
    swingRef.current.style.setProperty('--swing', '0deg');
    swingRef.current.style.setProperty('--tilt', '0deg');
    swingRef.current.style.setProperty('--lift', '0deg');
  };

  const serial = `MK-${String(2021 + index).slice(2)}${String(index + 1).padStart(2, '0')}`;

  return (
    <div className="badge-hang" style={{ '--delay': `${index * -1.3}s` }}>
      <div className="badge-strap" aria-hidden="true" />
      <div ref={swingRef} className="badge-swing">
        <div className="badge-clip" aria-hidden="true" />
        <button
          type="button"
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          onClick={() => setFlipped(f => !f)}
          className={`badge ${flipped ? 'is-flipped' : ''}`}
          aria-pressed={flipped}
          aria-label={`${role.title} at ${role.org}. Click to ${flipped ? 'see the front' : 'read more'}.`}
        >
          {/* front */}
          <span className="badge-face badge-front">
            <span className="badge-slot" aria-hidden="true" />
            <span className="flex items-center justify-between w-full">
              <Logo size={26} />
              <span className={`badge-status ${role.live ? 'is-live' : ''}`}>
                <span className="badge-status-dot" />
                {role.live ? 'Active' : 'Always On'}
              </span>
            </span>

            <span className="badge-avatar">
              <Icon name={role.icon} size={30} />
            </span>

            <span className="text-[9px] uppercase tracking-[0.3em] text-mahiPink font-semibold">{role.kicker}</span>
            <span className="block text-xl font-black text-white leading-tight mt-1">{role.title}</span>
            <span className="block text-xs text-white/60 mt-1">{role.org}</span>

            <span className="badge-foot">
              <span className="badge-barcode" aria-hidden="true" />
              <span className="font-mono text-[9px] text-white/50 tracking-widest">{serial}</span>
            </span>
            <span className="badge-holo" aria-hidden="true" />
          </span>

          {/* back */}
          <span className="badge-face badge-back">
            <span className="badge-slot" aria-hidden="true" />
            <span className="text-[9px] uppercase tracking-[0.3em] text-mahiPink font-semibold">Access Notes</span>
            <span className="block text-lg font-bold text-white mt-3 leading-tight">{role.title}</span>
            <span className="block text-[13px] text-white/75 leading-relaxed mt-3">{role.text}</span>
            <span className="mt-auto flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/45">
              <Icon name="rotate-ccw" size={12} /> Tap to flip back
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}

export default function NowSection() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section id="now" ref={ref} className="relative py-20 px-4 sm:px-6 z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Currently" outline="Online">
          Four access passes, one person. Hover to swing a badge, click it to flip it over.
        </SectionHeading>

        <div className="relative">
          <div className="badge-rail hidden xl:block" aria-hidden="true" />
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-4 justify-items-center">
            {currentRoles.map((r, i) => (
              <div key={r.id} className="reveal-3d">
                <Badge role={r} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

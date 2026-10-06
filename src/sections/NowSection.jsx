import { useRef } from 'react';
import SectionHeading from '../components/SectionHeading';
import Icon from '../components/Icon';
import useReveal from '../components/useReveal';
import { currentRoles } from '../data/portfolio';

// Current roles - clean, professional role cards.
function RoleCard({ role, index }) {
  return (
    <article className="now-card h-full">
      <div className="flex items-start justify-between gap-4">
        <span className="now-icon">
          <Icon name={role.icon} size={22} />
        </span>
        <span className={`now-status ${role.live ? 'is-live' : ''}`}>
          <span className="now-status-dot" />
          {role.live ? 'Active' : 'Always On'}
        </span>
      </div>

      <p className="mt-6 text-[10px] uppercase tracking-[0.25em] text-mahiPink font-semibold">{role.kicker}</p>
      <h3 className="mt-2 text-xl font-bold text-white leading-tight">{role.title}</h3>
      <p className="mt-1 text-sm text-white/55">{role.org}</p>

      <div className="now-divider" />

      <p className="text-[13px] text-white/70 leading-relaxed">{role.text}</p>

      <span className="now-index" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
    </article>
  );
}

export default function NowSection() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section id="now" ref={ref} className="relative py-20 px-4 sm:px-6 z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Currently" outline="Online">
          Four roles, one person - what I am working on right now.
        </SectionHeading>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6">
          {currentRoles.map((r, i) => (
            <div key={r.id} className="reveal-3d">
              <RoleCard role={r} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

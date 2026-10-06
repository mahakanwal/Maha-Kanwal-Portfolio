import { useRef } from 'react';
import SectionHeading from '../components/SectionHeading';
import TiltCard from '../components/TiltCard';
import Icon from '../components/Icon';
import useReveal from '../components/useReveal';
import { creativeSides } from '../data/portfolio';

// "Off The Clock" - the creative side outside of work.
export default function OffTheClock() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section id="life" ref={ref} className="relative py-20 px-4 sm:px-6 z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Off The" outline="Clock">
          When the laptop closes - design, nature and teaching keep the creativity going.
        </SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 [perspective:1400px]">
          {creativeSides.map((c, i) => (
            <div key={c.title} className="reveal-3d">
              <TiltCard max={6} className="life-card h-full rounded-2xl p-6 sm:p-7">
                <div className="flex items-center gap-3 mb-4">
                  <span className="role-icon !w-10 !h-10">
                    <Icon name={['pen-tool', 'map-pin', 'sparkles'][i]} size={18} />
                  </span>
                  <h4 className="text-white font-semibold">{c.title}</h4>
                </div>
                <p className="text-sm text-white/70 leading-relaxed">{c.text}</p>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

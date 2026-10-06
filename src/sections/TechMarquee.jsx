import LogoLoop from '../components/reactbits/LogoLoop';
import { techLogos } from '../data/portfolio';

// React Bits LogoLoop - the languages & tools Maha works with.
export default function TechMarquee() {
  const logos = techLogos.map(l => ({
    node: (
      <span className="tech-chip">
        <img src={l.src} alt="" loading="lazy" className={`w-6 h-6 object-contain ${l.invert ? "invert" : ""}`} />
        <span>{l.name}</span>
      </span>
    ),
    title: l.name,
    ariaLabel: l.name
  }));

  return (
    <section aria-label="Languages and tools" className="relative z-10 py-10 [transform:rotate(-2deg)] my-6">
      <div className="border-y border-pink-500/20 bg-gradient-to-r from-pink-500/[0.04] via-pink-500/[0.08] to-pink-500/[0.04] py-5 backdrop-blur-sm">
        <LogoLoop logos={logos} speed={60} direction="left" logoHeight={40} gap={20} pauseOnHover fadeOut fadeOutColor="#030303" scaleOnHover ariaLabel="Languages and tools" />
      </div>
      <div className="border-b border-pink-500/10 py-4 [transform:rotate(3deg)] -mt-2 opacity-60">
        <LogoLoop logos={[...logos].reverse()} speed={40} direction="right" logoHeight={34} gap={20} fadeOut fadeOutColor="#030303" ariaLabel="Languages and tools reversed" />
      </div>
    </section>
  );
}

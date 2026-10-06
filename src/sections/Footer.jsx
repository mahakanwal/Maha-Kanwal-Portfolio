import SocialLinks from '../components/SocialLinks';
import Logo from '../components/Logo';

// Game-style "progress saved" footer.
export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#050505] px-4 pt-14 pb-10 text-center overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,rgba(255,62,129,0.12),transparent_70%)] pointer-events-none" />

      <div className="relative flex flex-col items-center gap-5">
        <span className="footer-save">
          <span className="footer-save-dot" />
          Progress Saved
        </span>

        <Logo size={44} />

        <p className="text-xl sm:text-2xl font-bold text-white max-w-xl leading-snug">
          Coded with chai, debugged with patience and powered by <span className="text-mahiPink">Kahani Meri</span> on repeat.
        </p>
        <p className="text-xs text-white/50 max-w-md leading-relaxed">
          Thanks for playing through my portfolio. Your next quest: say hi, hire me, or beat my Bug Hunter score.
        </p>

        <SocialLinks className="justify-center" size={16} />

        <div className="flex items-center gap-4 mt-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-mono">LVL 82</span>
          <div className="hp-bar !w-24">
            <div className="hp-fill footer-xp" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-mono">Next: LVL 83</span>
        </div>

        <p className="text-[11px] text-white/35 tracking-wide">&copy; 2026 Maha Kanwal - still levelling up.</p>
      </div>
    </footer>
  );
}

import { useEffect, useState } from 'react';
import Icon from './Icon';
import Logo from './Logo';
import ThemeSwitcher from './ThemeSwitcher';

const navLinks = [
  { href: '#about', label: 'Bio' },
  { href: '#exp', label: 'Career' },
  { href: '#projects', label: 'Quests' },
  { href: '#life', label: 'Life' },
  { href: '#gallery', label: 'Moments' },
  { href: '#skillsphere', label: 'SkillSphere' },
  { href: '#game', label: 'Play' }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-32px)] md:w-auto">
      <div
        className={`flex items-center justify-between md:justify-start gap-6 md:gap-8 px-5 md:px-6 py-3 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl transition-colors duration-500 ${
          scrolled ? 'bg-black/40' : 'bg-transparent'
        }`}
      >
        <a href="#top" aria-label="Back to top">
          <Logo size={34} className="hover:scale-110 transition-transform duration-300" />
        </a>

        <div className="hidden md:block w-[1px] h-4 bg-white/20" />

        <div className="hidden md:flex items-center gap-6 text-[9px] uppercase font-bold tracking-[0.2em] text-white/70">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="hover:text-mahiPink transition-all duration-300">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeSwitcher />
          <a href="#contact" className="group relative flex items-center">
            <span className="relative text-[9px] uppercase font-bold tracking-[0.2em] text-mahiPink border border-mahiPink px-3 py-1 rounded-md group-hover:bg-mahiPink group-hover:text-onAccent transition-all">
              Hire
            </span>
          </a>
          <button
            type="button"
            className="md:hidden text-white/80 hover:text-mahiPink p-1"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <Icon name={open ? 'x' : 'menu'} size={20} />
          </button>
        </div>
      </div>

      <div
        className={`md:hidden mt-2 overflow-hidden rounded-lg border border-white/10 bg-black/80 backdrop-blur-xl transition-all duration-500 ${
          open ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0 border-transparent'
        }`}
      >
        <div className="flex flex-col p-2 text-[11px] uppercase font-bold tracking-[0.25em] text-white/80">
          {navLinks.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-md hover:bg-pink-500/10 hover:text-mahiPink transition"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

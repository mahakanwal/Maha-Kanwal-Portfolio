import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { themes } from '../theme/themes';
import { useTheme } from '../theme/ThemeContext';

// Small palette button in the navbar - opens a list of colour themes.
export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  // close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onDown = e => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = e => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="theme-toggle"
        aria-label="Change colour theme"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <Icon name="palette" size={16} />
        <span className="theme-toggle-dot" style={{ background: theme.p }} />
      </button>

      <div className={`theme-menu ${open ? 'is-open' : ''}`} role="menu" aria-label="Colour themes">
        <p className="px-2 pb-2 text-[9px] uppercase tracking-[0.25em] text-white/45 font-semibold">Theme</p>
        {themes.map(t => (
          <button
            key={t.id}
            type="button"
            role="menuitemradio"
            aria-checked={theme.id === t.id}
            onClick={() => {
              setTheme(t.id);
              setOpen(false);
            }}
            className={`theme-option ${theme.id === t.id ? 'is-active' : ''}`}
          >
            <span className="theme-swatch" style={{ background: `linear-gradient(135deg, ${t.s}, ${t.p})` }} />
            <span className="flex-1 text-left">{t.name}</span>
            {theme.id === t.id && <Icon name="check" size={14} className="text-mahiPink" />}
          </button>
        ))}
      </div>
    </div>
  );
}

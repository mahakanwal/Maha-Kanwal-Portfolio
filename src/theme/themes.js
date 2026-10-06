// Colour themes for the portfolio. Every accent in the site (CSS, Tailwind
// `mahiPink` / `pink-*` classes, canvas + WebGL scenes) reads from here.
//   p      - main accent          s    - soft / light accent
//   p300.. - tailwind `pink-*` scale (300 light -> 800 dark)
//   deep   - very dark tint       onP  - text colour on top of the accent
//   galaxyHue / galaxySat - settings for the About galaxy background
export const themes = [
  {
    id: 'rose',
    name: 'Rose',
    p: '#ff3e81', s: '#ffb8d1',
    p300: '#ff7eb3', p400: '#ff5c94', p500: '#ff3e81', p600: '#e0136a', p800: '#9d174d',
    deep: '#b0124f', dim: '#2a1520', onP: '#ffffff',
    galaxyHue: 330, galaxySat: 0.75
  },
  {
    id: 'sky',
    name: 'Sky Blue',
    p: '#7dd3fc', s: '#e0f2fe',
    p300: '#bae6fd', p400: '#93dcfd', p500: '#7dd3fc', p600: '#0284c7', p800: '#075985',
    deep: '#0c4a6e', dim: '#11222c', onP: '#06121c',
    galaxyHue: 200, galaxySat: 0.6
  },
  {
    id: 'teal',
    name: 'Teal',
    p: '#5eead4', s: '#ccfbf1',
    p300: '#99f6e4', p400: '#7ff0dc', p500: '#5eead4', p600: '#0d9488', p800: '#115e59',
    deep: '#134e4a', dim: '#10241f', onP: '#04140f',
    galaxyHue: 170, galaxySat: 0.6
  },
  {
    id: 'lavender',
    name: 'Lavender',
    p: '#c4b5fd', s: '#ede9fe',
    p300: '#ddd6fe', p400: '#d0c5fe', p500: '#c4b5fd', p600: '#7c3aed', p800: '#5b21b6',
    deep: '#4c1d95', dim: '#1c1830', onP: '#140a24',
    galaxyHue: 265, galaxySat: 0.6
  },
  {
    id: 'peach',
    name: 'Peach',
    p: '#fdba74', s: '#ffedd5',
    p300: '#fed7aa', p400: '#fdc68e', p500: '#fdba74', p600: '#ea580c', p800: '#9a3412',
    deep: '#7c2d12', dim: '#2a1c10', onP: '#1c0d02',
    galaxyHue: 30, galaxySat: 0.6
  },
  {
    id: 'white',
    name: 'White',
    p: '#e4e4e7', s: '#ffffff',
    p300: '#ffffff', p400: '#f4f4f5', p500: '#e4e4e7', p600: '#52525b', p800: '#27272a',
    deep: '#3f3f46', dim: '#1f1f22', onP: '#0a0a0a',
    galaxyHue: 0, galaxySat: 0
  }
];

export const DEFAULT_THEME = 'rose';
export const STORAGE_KEY = 'mahi-theme';

const hexToChannels = hex => {
  const h = hex.replace('#', '');
  return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16)).join(' ');
};

export const hexToRgb01 = hex => {
  const h = hex.replace('#', '');
  return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16) / 255);
};

export const getTheme = id => themes.find(t => t.id === id) || themes[0];

// current theme, readable from plain JS (canvas game, cursor bursts, etc.)
let current = getTheme(DEFAULT_THEME);
export const currentTheme = () => current;

// write the theme to <html> as CSS variables (channels so Tailwind alpha works)
export function applyTheme(id) {
  const t = getTheme(id);
  current = t;
  const root = document.documentElement;
  const vars = {
    '--p': t.p,
    '--s': t.s,
    '--p-rgb': hexToChannels(t.p),
    '--s-rgb': hexToChannels(t.s),
    '--p300': hexToChannels(t.p300),
    '--p400': hexToChannels(t.p400),
    '--p500': hexToChannels(t.p500),
    '--p600': hexToChannels(t.p600),
    '--p800': hexToChannels(t.p800),
    '--deep-rgb': hexToChannels(t.deep),
    '--on-p-rgb': hexToChannels(t.onP)
  };
  Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
  root.dataset.theme = t.id;
  return t;
}

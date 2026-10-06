import { createContext, useCallback, useContext, useState } from 'react';
import { applyTheme, getTheme, DEFAULT_THEME, STORAGE_KEY } from './themes';

const readSaved = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
};

// apply before the first paint so there is no colour flash
const initialId = typeof document !== 'undefined' ? applyTheme(readSaved()).id : DEFAULT_THEME;

const ThemeCtx = createContext({ theme: getTheme(DEFAULT_THEME), setTheme: () => {} });

export function ThemeProvider({ children }) {
  const [id, setId] = useState(initialId);

  const setTheme = useCallback(next => {
    applyTheme(next);
    setId(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable - theme still works for this visit */
    }
  }, []);

  return <ThemeCtx.Provider value={{ theme: getTheme(id), setTheme }}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => useContext(ThemeCtx);

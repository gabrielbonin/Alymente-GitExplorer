import React, { createContext, useContext, useState } from 'react';
import { lightColors, darkColors } from '@/design-system/tokens';
import type { Theme, ThemeMode } from './types';

interface ThemeContextValue {
  theme:      Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light');

  const theme: Theme = {
    mode,
    colors: mode === 'light' ? lightColors : darkColors,
  };

  const toggleTheme = () =>
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}

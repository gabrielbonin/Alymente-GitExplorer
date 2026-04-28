import type { ColorTokens } from '@/design-system/tokens';

export type ThemeMode = 'light' | 'dark';

export interface Theme {
  mode:    ThemeMode;
  colors:  ColorTokens;
}

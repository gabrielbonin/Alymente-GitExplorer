export const lightColors = {
  primary:        '#005f53',
  primaryVariant: '#128275',
  accent:         '#00e9d2',
  highlight:      '#35e8d3',
  green:          '#00bd72',
  background:     '#f5f8fa',
  surface:        '#ffffff',
  surfaceVariant: '#eff3f1',
  text:           '#181818',
  textSecondary:  '#464747',
  muted:          '#758696',
  border:         '#d3e1d9',
  success:        '#47c04a',
  warning:        '#ee6a2f',
  danger:         '#c53938',
  // Cores semânticas para conteúdo sobre o fundo primary
  onPrimary:      '#ffffff',
  onPrimaryMuted: 'rgba(255,255,255,0.7)',
} as const;

export const darkColors = {
  primary:        '#35e8d3',
  primaryVariant: '#00e9d2',
  accent:         '#00bd72',
  highlight:      '#128275',
  green:          '#47c04a',
  background:     '#0a1a18',
  surface:        '#132b28',
  surfaceVariant: '#1a3530',
  text:           '#f0f5f4',
  textSecondary:  '#c8d8d5',
  muted:          '#6b8a85',
  border:         '#1f3a36',
  success:        '#47c04a',
  warning:        '#ee6a2f',
  danger:         '#ff8086',
  onPrimary:      '#0a1a18',
  onPrimaryMuted: 'rgba(10,26,24,0.7)',
} as const;

/** Mapa de tokens de cor — chaves fixas, valores string (permite light e dark) */
export type ColorTokens = { [K in keyof typeof lightColors]: string };

export const fontFamily = {
  regular:   'Nunito_400Regular',
  semiBold:  'Nunito_600SemiBold',
  bold:      'Nunito_700Bold',
  extraBold: 'Nunito_800ExtraBold',
} as const;

export const fontSize = {
  xs:  11,
  sm:  12,
  md:  14,
  lg:  17,
  xl:  22,
  xxl: 28,
} as const;

export const lineHeight = {
  tight:  1.2,
  normal: 1.5,
  loose:  1.8,
} as const;

export type FontFamilyTokens = typeof fontFamily;
export type FontSizeTokens   = typeof fontSize;

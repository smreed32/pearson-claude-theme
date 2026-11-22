import { makeColors } from './make-colors.js'

// Pearson brand palette.
export const BRAND = {
  orange: '#e54102',
  gray: '#5f5f5f',
  blurple: '#343551',
  steelBlue: '#6790a0',
  sage: '#90a997',
  navy: '#0c2949',
  redOrange: '#e04426',
  darkGray: '#4c4b4c',
  lightGray: '#bebebe',
  forest: '#42725e',
} as const

// Light: cool white page tinted toward Blurple, Blurple text.
// Dark: Blurple/Navy night, warm-white text, Orange accent stays.
export const { theme, problems } = makeColors({
  label: 'Pearson Packaging Systems',
  roles: {
    accent: BRAND.orange,
    danger: '#c62828',
    success: BRAND.forest,
    warning: '#c98a12',
    pro: BRAND.steelBlue,
  },
  light: {
    gray: {
      anchors: {
        'surface-0': '#eceef3',
        'surface-1': '#f4f5f8',
        'surface-2': '#fbfbfd',
        'text-primary': BRAND.blurple,
        'text-secondary': BRAND.darkGray,
        'text-muted': BRAND.gray,
      },
    },
  },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#1b1c2b',
        'surface-1': '#222336',
        'surface-2': '#292a40',
        'surface-3': '#2f3048',
        'text-primary': '#f3f3f6',
        'text-secondary': '#cbccd8',
        'text-muted': '#a6a8ba',
      },
    },
  },
})

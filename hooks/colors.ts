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

// Light: cool white page tinted toward Blurple, deep Blurple text.
// Dark: Blurple/Navy night, warm-white text, Orange accent stays.
export const { theme, problems } = makeColors({
  label: 'Pearson Packaging Systems',
  roles: {
    accent: BRAND.orange,
    danger: '#b71c1c',
    success: BRAND.forest,
    warning: '#c98a12',
    pro: BRAND.steelBlue,
  },
  light: {
    gray: {
      anchors: {
        'surface-0': '#f1f2f6',
        'surface-1': '#f6f7f9',
        'surface-2': '#fcfcfd',
        // A shade deeper than Blurple so borders and rings built from it read clearly.
        'text-primary': '#2c2d47',
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
        'surface-2': '#25263a',
        'surface-3': '#262739',
        'text-primary': '#f3f3f6',
        'text-secondary': '#cbccd8',
        'text-muted': '#a6a8ba',
      },
    },
    // Lighter Forest so success text holds up on the dark panels.
    roles: { success: { seed: '#5f9a80', stops: { 400: '#86c0a3' } } },
  },
})

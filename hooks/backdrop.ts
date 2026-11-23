import { BRAND } from './colors.js'

// The Pearson circle mark, traced from the brand kit's pearson-icon.png
// (355 x 355 units). The box is four shapes: two panels and two top flaps.
const DISC = 'M177.5 0A177.5 177.5 0 1 1 177.5 355A177.5 177.5 0 1 1 177.5 0Z'
const PANELS = 'M80 112L179 141L138 360L44 330Z M188 140L290 111L270 224L165 253Z'
const FLAPS = 'M90 104L184 78L181 131Z M192 78L282 104L188 131Z'

// The full-color mark, exactly as the brand kit draws it: Pearson Orange
// disc, white box, gray top flaps. Drawn at full strength, since fading it
// turns the white box gray on a dark page and it stops being the logo.
const LOGO = `
  <path d="${DISC}" fill="${BRAND.orange}"/>
  <g clip-path="url(#disc)">
    <path d="${PANELS}" fill="#ffffff"/>
    <path d="${FLAPS}" fill="${BRAND.gray}"/>
  </g>`

// A corner badge in the upper-right gutter, below the toolbar and beside the
// chat column. The backdrop spans the whole window and the sidebar covers its
// left side when open, so the mark sits on the right, which stays clear with
// the sidebar open or closed. It is drawn in a 1000-unit square fitted to the
// window's shorter side and pinned to the top right, so it stays round and
// keeps its corner at any size: about 115 px tall in a 1100 px window, never
// near the 36 px brand minimum. Windows too narrow to leave a gutter for it,
// and phones, show the plain ground. The cutoff is in the app's own units, which display
// scaling shrinks: at 150% a 2000 px wide window counts as about 1330.
//
// Behind it, a soft wash: a Blurple glow from the top left blending into a
// Pearson Orange glow rising from the bottom right, both fading out toward
// the middle so the conversation sits on a calm, even ground. The glows are
// gentle in light mode and warmer in dark mode, where they read as light.
// Each glow's colors are written on its gradient (not in the style sheet,
// which a surface may not apply to gradients); the style sheet only picks
// which pair of glows shows, light or dark, the way it hides the logo.
const glow = (id: string, cx: number, cy: number, r: number, color: string, opacity: number) => `
    <radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">
      <stop offset="0" stop-color="${color}" stop-opacity="${opacity}"/>
      <stop offset="1" stop-color="${color}" stop-opacity="0"/>
    </radialGradient>`

export const SCENE = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <style>
    .ground { fill: #f1f2f6; }
    .dark { display: none; }
    @media (prefers-color-scheme: dark) {
      .ground { fill: #1b1c2b; }
      .light { display: none; }
      .dark { display: inline; }
    }
    @media (max-width: 1099px) {
      .mark { display: none; }
    }
  </style>
  <defs>
    <clipPath id="disc"><path d="${DISC}"/></clipPath>${glow('coolLight', 0.12, 0.05, 0.95, BRAND.blurple, 0.2)}${glow('warmLight', 0.92, 1.02, 0.8, BRAND.orange, 0.2)}${glow('coolDark', 0.12, 0.05, 0.95, '#5a5d9e', 0.5)}${glow('warmDark', 0.92, 1.02, 0.8, '#ff5a1a', 0.55)}
  </defs>
  <rect class="ground" width="100%" height="100%"/>
  <rect class="light" width="100%" height="100%" fill="url(#coolLight)"/>
  <rect class="light" width="100%" height="100%" fill="url(#warmLight)"/>
  <rect class="dark" width="100%" height="100%" fill="url(#coolDark)"/>
  <rect class="dark" width="100%" height="100%" fill="url(#warmDark)"/>
  <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="xMaxYMin meet">
    <g class="mark" transform="translate(870 74) scale(0.2817)">${LOGO}</g>
  </svg>
</svg>`

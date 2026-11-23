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
// and phones, show the plain ground.
export const SCENE = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <style>
    .ground { fill: #f1f2f6; }
    @media (prefers-color-scheme: dark) {
      .ground { fill: #1b1c2b; }
    }
    @media (max-width: 1299px) {
      .mark { display: none; }
    }
  </style>
  <defs>
    <clipPath id="disc"><path d="${DISC}"/></clipPath>
  </defs>
  <rect class="ground" width="100%" height="100%"/>
  <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="xMaxYMin meet">
    <g class="mark" transform="translate(870 74) scale(0.2817)">${LOGO}</g>
  </svg>
</svg>`

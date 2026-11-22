import { BRAND } from './colors.js'

// The Pearson circle mark, traced from the brand kit's pearson-icon.png
// (355 x 355 units). The box is four shapes: two panels and two top flaps.
const DISC = 'M177.5 0A177.5 177.5 0 1 1 177.5 355A177.5 177.5 0 1 1 177.5 0Z'
const PANELS = 'M80 112L179 141L138 360L44 330Z M188 140L290 111L270 224L165 253Z'
const FLAPS = 'M90 104L184 78L181 131Z M192 78L282 104L188 131Z'

// The brand kit's knockout variants: the box cut out of a solid disc. Gray
// (the grayscale logo) on the light page, white (the white knockout logo the
// brand guide asks for on dark Blurple) on the dark one. One shape in both
// modes; Pearson Orange stays with the accents, where it does the work.
const KNOCKOUT = `
  <g clip-path="url(#disc)">
    <path class="knockout" d="${DISC} ${PANELS} ${FLAPS}" fill-rule="evenodd"/>
  </g>`

// A quiet watermark in the upper-right gutter, below the toolbar and beside
// the chat column. The backdrop spans the whole window and the sidebar covers
// its left side when open, so the mark sits on the right, which stays clear
// with the sidebar open or closed. It is drawn in a 1000-unit square fitted
// to the window's shorter side and pinned to the top right, so it stays round
// and
// keeps its corner at any size: about 120 px tall in a 1100 px window, never
// near the 36 px brand minimum. Windows too narrow to leave a gutter for it,
// and phones, show the plain ground.
export const SCENE = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <style>
    .ground { fill: #f1f2f6; }
    .knockout { fill: ${BRAND.gray}; opacity: 0.09; }
    @media (prefers-color-scheme: dark) {
      .ground { fill: #1b1c2b; }
      .knockout { fill: #ffffff; opacity: 0.07; }
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
    <g class="mark" transform="translate(870 74) scale(0.2817)">${KNOCKOUT}</g>
  </svg>
</svg>`

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

// The logo in the left margin, between the open sidebar and the chat column,
// level with the top of the conversation. The backdrop spans the whole window
// and the sidebar (about 523 px) covers its left side, so the logo is placed
// from the window's width: the chat column (about 915 px) is centered in the
// space right of the sidebar, and the logo is centered in the margin to its
// left. When that margin is too narrow for it (a window under about 1760 px),
// and on phones, the logo is hidden rather than drawn behind the text. With
// the sidebar closed the chat column moves left over this spot, so the logo
// is meant for working with the sidebar open.
const SIDEBAR = 523
const COLUMN = 915
const SIZE = 112
const TOP = 85
const HIDE_BELOW = SIDEBAR + COLUMN + 2 * (SIZE + 48)

export const SCENE = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <style>
    .ground { fill: #f1f2f6; }
    @media (prefers-color-scheme: dark) {
      .ground { fill: #1b1c2b; }
    }
    .mark {
      transform: translate(calc(${SIDEBAR}px + (100vw - ${SIDEBAR + COLUMN}px) / 4 - ${SIZE / 2}px), ${TOP}px);
    }
    @media (max-width: ${HIDE_BELOW - 1}px) {
      .mark { display: none; }
    }
  </style>
  <defs>
    <clipPath id="disc"><path d="${DISC}"/></clipPath>
  </defs>
  <rect class="ground" width="100%" height="100%"/>
  <g class="mark">
    <svg width="${SIZE}" height="${SIZE}" viewBox="0 0 355 355">${LOGO}</svg>
  </g>
</svg>`

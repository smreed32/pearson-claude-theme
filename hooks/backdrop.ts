import { BRAND } from './colors.js'

// The Pearson circle mark, traced from the brand kit's pearson-icon.png
// (355 x 355). Shapes are in the brand colors and never recolored.
const ICON = `
  <clipPath id="mark"><circle cx="177.5" cy="177.5" r="177.5"/></clipPath>
  <circle cx="177.5" cy="177.5" r="177.5" fill="${BRAND.orange}"/>
  <g clip-path="url(#mark)">
    <path d="M80 112L179 141L138 360L44 330Z" fill="#ffffff"/>
    <path d="M188 140L290 111L270 224L165 253Z" fill="#ffffff"/>
    <path d="M90 104L184 78L181 131Z" fill="${BRAND.gray}"/>
    <path d="M192 78L282 104L188 131Z" fill="${BRAND.gray}"/>
  </g>`

// A faint watermark of the mark at the right, above the message box and away
// from the chat column. The nested svg keeps the circle round on any screen:
// "meet" fits its square into the shorter side, pinned to the bottom right.
export const SCENE = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <style>
    .ground { fill: #f1f2f6; }
    .wm { opacity: 0.07; }
    @media (prefers-color-scheme: dark) {
      .ground { fill: #1b1c2b; }
      .wm { opacity: 0.1; }
    }
    @media (max-width: 600px) {
      .wm { display: none; }
    }
  </style>
  <rect class="ground" width="100%" height="100%"/>
  <svg width="100%" height="100%" viewBox="0 0 1300 1300" preserveAspectRatio="xMaxYMax meet">
    <g class="wm" transform="translate(880 600)">${ICON}</g>
  </svg>
</svg>`

import { BRAND } from './colors.js'

// The Pearson "P", the unfolding box from the brand kit's pearson-icon.png
// (355 x 355 units): two panels and two top flaps, without the disc.
const PANELS = 'M80 112L179 141L138 345L52 318Z M188 140L290 111L270 224L165 253Z'
const FLAPS = 'M90 104L184 78L181 131Z M192 78L282 104L188 131Z'

// A watermark: the P drawn large and centered behind the conversation as a
// thin outline only, white in dark mode and Blurple in light mode, faint
// enough that text over it reads as on the plain ground. The stroke keeps
// its width at any window size.
const P_MARK = `
    <svg x="22%" y="18%" width="56%" height="64%" viewBox="40 70 262 285" preserveAspectRatio="xMidYMid meet">
      <g class="pmark" fill="none" stroke-width="2" stroke-linejoin="round" vector-effect="non-scaling-stroke">
        <path d="${PANELS}" vector-effect="non-scaling-stroke"/>
        <path d="${FLAPS}" vector-effect="non-scaling-stroke"/>
      </g>
    </svg>`

// The backdrop: a soft wash, a Blurple glow from the top left blending into a
// Pearson Orange glow rising from the bottom right, both fading out toward
// the middle so the conversation sits on a calm, even ground. The glows are
// gentle in light mode and warmer in dark mode, where they read as light.
// Each glow's colors are written on its gradient (not in the style sheet,
// which a surface may not apply to gradients); the style sheet only picks
// which pair of glows shows, light or dark.
const glow = (id: string, cx: number, cy: number, r: number, color: string, opacity: number) => `
    <radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">
      <stop offset="0" stop-color="${color}" stop-opacity="${opacity}"/>
      <stop offset="1" stop-color="${color}" stop-opacity="0"/>
    </radialGradient>`

export const SCENE = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <style>
    .ground { fill: #f1f2f6; }
    .dark { display: none; }
    .pmark { stroke: ${BRAND.blurple}; stroke-opacity: 0.14; }
    @media (prefers-color-scheme: dark) {
      .ground { fill: #1b1c2b; }
      .light { display: none; }
      .dark { display: inline; }
      .pmark { stroke: #ffffff; stroke-opacity: 0.12; }
    }
  </style>
  <defs>${glow('coolLight', 0.12, 0.05, 0.95, BRAND.blurple, 0.2)}${glow('warmLight', 0.92, 1.02, 0.8, BRAND.orange, 0.2)}${glow('coolDark', 0.12, 0.05, 0.95, '#5a5d9e', 0.5)}${glow('warmDark', 0.92, 1.02, 0.8, '#ff5a1a', 0.55)}
  </defs>
  <rect class="ground" width="100%" height="100%"/>
  <rect class="light" width="100%" height="100%" fill="url(#coolLight)"/>
  <rect class="light" width="100%" height="100%" fill="url(#warmLight)"/>
  <rect class="dark" width="100%" height="100%" fill="url(#coolDark)"/>
  <rect class="dark" width="100%" height="100%" fill="url(#warmDark)"/>${P_MARK}
</svg>`

import { BRAND } from './colors.js'

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
    @media (prefers-color-scheme: dark) {
      .ground { fill: #1b1c2b; }
      .light { display: none; }
      .dark { display: inline; }
    }
  </style>
  <defs>${glow('coolLight', 0.12, 0.05, 0.95, BRAND.blurple, 0.2)}${glow('warmLight', 0.92, 1.02, 0.8, BRAND.orange, 0.2)}${glow('coolDark', 0.12, 0.05, 0.95, '#5a5d9e', 0.5)}${glow('warmDark', 0.92, 1.02, 0.8, '#ff5a1a', 0.55)}
  </defs>
  <rect class="ground" width="100%" height="100%"/>
  <rect class="light" width="100%" height="100%" fill="url(#coolLight)"/>
  <rect class="light" width="100%" height="100%" fill="url(#warmLight)"/>
  <rect class="dark" width="100%" height="100%" fill="url(#coolDark)"/>
  <rect class="dark" width="100%" height="100%" fill="url(#warmDark)"/>
</svg>`

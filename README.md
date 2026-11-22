# Pearson Theme for Claude

A Pearson Packaging Systems look for the Claude desktop and mobile apps, built on the brand palette:

- **Light mode:** cool off-white surfaces, Blurple (`#343551`) text, Dark Gray / Gray secondary text
- **Dark mode:** deep Blurple/Navy surfaces with warm-white text
- **Accent:** Pearson Orange (`#e54102`) for links, buttons and highlights
- **Headings:** bold Orange in Claude's replies
- **Your messages:** Blurple boxes with white text and a thin Orange border
- **Status colors:** Forest Green for success, Steel Blue for code accents
- **Watermark:** a faint Pearson circle mark on the right side of the window (desktop; hidden on phones)

The terminal and editor plugins don't draw themes, so it shows only in the desktop and mobile apps.

## Install

At the prompt of a Claude Code terminal session:

```
/plugin install pearson-theme --marketplace smreed32/pearson-claude-theme
```

From a shell:

```
claude plugin install pearson-theme --marketplace smreed32/pearson-claude-theme
```

In the desktop app: click **+** next to the prompt box, then **Plugins** → **Add marketplace** with `smreed32/pearson-claude-theme`, then **Add plugin**.

Answer `y` to add the marketplace, then choose the user scope. The repository is public, so no GitHub account or login is needed.

## Files

- `hooks/colors.ts`: the brand palette and the light and dark color sets
- `hooks/register.tsx`: applies the theme when a session starts and draws the watermark
- `hooks/backdrop.ts`: the Pearson mark, traced as vector shapes from the brand kit
- `hooks/make-colors.js`: the color builder from Claude's design system (don't edit)

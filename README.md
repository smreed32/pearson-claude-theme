# Pearson Theme for Claude

A Pearson Packaging Systems look for the Claude desktop and mobile apps, built on the brand palette:

- **Light mode:** cool off-white surfaces, Blurple (`#343551`) text, Dark Gray / Gray secondary text
- **Dark mode:** deep Blurple/Navy surfaces with warm-white text
- **Accent:** Pearson Orange (`#e54102`) for links, buttons and highlights
- **Headings:** bold Orange in Claude's replies
- **Your messages:** Blurple boxes with white text and a thin Orange border
- **Status colors:** Forest Green for success, Steel Blue for code accents
- **Watermark:** the Pearson circle mark as a Pearson Orange knockout (the box cut out of the disc) in the upper-right corner, clear of the sidebar; hidden on narrow windows and phones

The terminal and editor plugins don't draw themes, so it shows only in the desktop and mobile apps.

## Slash commands

Shortcuts for the Service Parts routines. Each one asks Claude to run the matching skill, so that skill has to be enabled in your Claude account; without it, Claude will say it can't find it.

| Command | What it does | Skill it uses |
| --- | --- | --- |
| `/categorize` | Categorizes the uncategorized emails in the Service Parts inbox | `serviceparts-categorizer` |
| `/conexiom` | Forwards new POs in the Service Parts inbox to Conexiom | `serviceparts-conexiom-forwarder` |
| `/quotes` | Builds a new Unconverted Quote Workbook from the latest export | `unconverted-quote-workbook` |
| `/manual <machine number>` | Finds a machine's manual on the P: drive and zips it to ShareFile | `manual-search` |

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
- `hooks/routines.ts`: the slash commands for the Service Parts routines
- `tests/routines.test.ts`: tests for the slash commands (`claude plugin test .`)
- `hooks/make-colors.js`: the color builder from Claude's design system (don't edit)

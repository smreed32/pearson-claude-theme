# Pearson Theme for Claude

A Pearson Packaging Systems look for the Claude desktop and mobile apps, built on the brand palette:

- **Light mode:** cool off-white surfaces, Blurple (`#343551`) text, Dark Gray / Gray secondary text
- **Dark mode:** deep Blurple/Navy surfaces with warm-white text
- **Background:** a soft gradient, a Blurple glow from the top left blending into a Pearson Orange glow at the bottom right, fading out behind the conversation
- **Accent:** Pearson Orange (`#e54102`) for links, buttons and highlights
- **Headings:** bold Orange in Claude's replies
- **Your messages:** Blurple boxes with white text and a thin Orange border
- **Status colors:** Forest Green for success, Steel Blue for code accents

It shows in the **Code** tab of the desktop app. Cowork, regular chats, claude.ai in a browser, the terminal and editor plugins don't draw themes.

## Slash commands

Shortcuts for the Service Parts routines, in `commands/`. Each one asks Claude to run the matching skill, so that skill has to be enabled in your Claude account; without it, Claude will say it can't find it. Type `/` and the start of the name (for example `/categ`) to find one; the full names start with `pearson-theme:`.

| Command | What it does | Skill it uses |
| --- | --- | --- |
| `/pearson-theme:categorize` | Categorizes the uncategorized emails in the Service Parts inbox | `serviceparts-categorizer` |
| `/pearson-theme:conexiom` | Forwards new POs in the Service Parts inbox to Conexiom | `serviceparts-conexiom-forwarder` |
| `/pearson-theme:quotes` | Builds a new Unconverted Quote Workbook from the latest export | `unconverted-quote-workbook` |
| `/pearson-theme:manual <machine number>` | Finds a machine's manual on the P: drive and zips it to ShareFile | `manual-search` |

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
- `hooks/register.tsx`: applies the theme when a session starts and draws the gradient backdrop
- `hooks/backdrop.ts`: the Blurple and Orange gradient backdrop
- `commands/`: the slash commands for the Service Parts routines
- `hooks/make-colors.js`: the color builder from Claude's design system (don't edit)

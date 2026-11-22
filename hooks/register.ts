import type { Register, ThemeSetArgs } from 'claude-code'

import { BRAND, problems, theme } from './colors.js'

const BASE: ThemeSetArgs = { colors: theme }

// Brand type treatment: bold headings in Orange, your messages in a Blurple
// bar (like the Pearson slide header), tool rows quiet and gray.
const LOOK: ThemeSetArgs = {
  ...BASE,
  style: {
    Heading: { color: BRAND.orange, fontFamily: ['sans'], fontWeight: 'bold' },
    UserMessage: {
      backgroundColor: BRAND.blurple,
      color: '#ffffff',
      radius: 6,
      paddingX: 14,
      paddingY: 10,
      borderColor: BRAND.orange,
      borderWidth: 1,
    },
    ToolUse: { color: 'text-secondary', radius: 4 },
  },
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))

    if (unpainted !== undefined) {
      $.ui.toast(unpainted)
    }

    let set
    try {
      set = await $.theme.set(LOOK)
    } catch (error) {
      $.ui.log(String(error))
      set = await $.theme.set(BASE)
    }

    if (!set.isDrawn) {
      $.ui.status(set.reason)
    }

    return next(e)
  })
}

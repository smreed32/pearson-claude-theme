import type { Register, ThemeSetArgs } from 'claude-code'

import { SCENE } from './backdrop.js'
import { BRAND, problems, theme } from './colors.js'

// The gradient and the Pearson mark behind the conversation. The app lays a
// tinted glass over a backdrop (60% by default), which all but hid the
// gradient and dulled the logo; the gradient already fades out behind the
// text, so the glass is kept thin and unblurred.
const BASE: ThemeSetArgs = {
  colors: theme,
  backdrop: { scene: 'pearson-mark', glass: { blur: 0, opacity: 0.15 } },
}

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
  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if ((e.surface !== 'desktop' && e.surface !== 'mobile') || e.props.scene !== 'pearson-mark') {
      return next(e)
    }

    const { Svg } = $.ui.resolve(e)

    return <Svg source={SCENE} alt="The Pearson Packaging Systems circle mark, faint in the corner" />
  })

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

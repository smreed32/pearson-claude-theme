import { expect, test } from 'claude-code/testing'

test('the backdrop scene draws on desktop', async $ => {
  const ui = await $.ui.mount({
    plugin: 'pearson-theme',
    component: 'Backdrop',
    surface: 'desktop',
    props: { scene: 'pearson-mark' },
  } as never)
  const svg = await ui.find({ type: 'Svg' })
  expect(svg).toBeDefined()
  await ui.unmount()
})

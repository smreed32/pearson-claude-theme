import { expect, mock, test } from 'claude-code/testing'

const PANE = {
  plugin: 'pearson-theme',
  component: 'Pane',
  requestId: 'pearson-links',
  props: {
    title: 'Pearson quick links',
    isFocused: false,
    bodyColumns: 40,
    placement: 'dock',
    scroll: { offset: 0, bodyRows: 30 },
    view: {},
  },
} as const

test('the panel lists the routines, folders and sites', async $ => {
  const ui = await $.ui.mount({ ...PANE, surface: 'desktop' })

  expect(await ui.findAll({ type: 'Button' })).toHaveLength(5)
  expect(await ui.find({ type: 'Text', text: /Routines/ })).toBeDefined()
  expect(await ui.find({ type: 'Link', text: /Service Parts inbox/ })).toBeDefined()
  await ui.unmount()
})

test('a routine button asks Claude to run its skill', async ($, on) => {
  const clock = mock.clock(on)
  const sent: string[] = []
  on('prompt.submit', (_, e) => {
    sent.push(e.text)
    return { text: e.text }
  })

  const ui = await $.ui.mount({ ...PANE, surface: 'desktop' })
  await ui.press({ key: 'run-categorize' })
  await clock.advance(20)

  expect(sent).toEqual([
    'Categorize the uncategorized emails in the Service Parts inbox. Use the serviceparts-categorizer skill.',
  ])
  await ui.unmount()
})

test('a folder button opens the folder in File Explorer', async ($, on) => {
  const clock = mock.clock(on)
  const ran: string[][] = []
  on('process.run', (_, e) => {
    ran.push([...e.argv])
    return {
      value: { exitCode: 0, stdout: '', stderr: '', isStdoutTruncated: false, isStderrTruncated: false },
    }
  })

  const ui = await $.ui.mount({ ...PANE, surface: 'desktop' })
  await ui.press({ key: 'p-manuals' })
  await clock.settle()

  expect(ran).toEqual([['explorer.exe', 'P:\\Manuals\\Archive']])
  await ui.unmount()
})

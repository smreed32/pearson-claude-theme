import { expect, mock, test } from 'claude-code/testing'
import type { On } from 'claude-code'

const RUN = { origin: { kind: 'composer' }, presentation: { isFullscreen: false, columns: 80 } } as const

// Stands for the engine's prompt box: records what the mod sends.
const recordPrompts = (on: On) => {
  const sent: string[] = []
  on('prompt.submit', (_, e) => {
    sent.push(e.text)
    return { text: e.text }
  })
  return sent
}

test('/categorize asks Claude to run the categorizer skill', async ($, on) => {
  const clock = mock.clock(on)
  const sent = recordPrompts(on)

  const ran = await $.command.run({ ...RUN, command: 'categorize', args: '' })

  expect(ran.text).toBe('Categorize the uncategorized emails in the Service Parts inbox: asking Claude now…')
  await clock.advance(20)
  expect(sent).toEqual([
    'Categorize the uncategorized emails in the Service Parts inbox. Use the serviceparts-categorizer skill.',
  ])
})

test('/manual passes the machine number on', async ($, on) => {
  const clock = mock.clock(on)
  const sent = recordPrompts(on)

  await $.command.run({ ...RUN, command: 'manual', args: ' BI18 ' })
  await clock.advance(20)
  expect(sent).toEqual([
    'Find the manual folder on the P: drive for machine BI18. Use the manual-search skill.',
  ])
})

test('/manual with no machine number shows how to use it and sends nothing', async ($, on) => {
  const clock = mock.clock(on)
  const sent = recordPrompts(on)

  const ran = await $.command.run({ ...RUN, command: 'manual', args: '' })
  await clock.advance(20)

  expect(ran.text).toBe('Add the machine number, for example: /manual BI18')
  expect(sent).toEqual([])
})

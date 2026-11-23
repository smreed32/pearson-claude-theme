import type { EngineInterface, On } from 'claude-code'

import { askRoutine, PANEL_ROUTINES } from './routines.js'

// A panel beside the chat with the Service Parts routines, folders and sites
// used every day. Edit these lists to change what it shows.
export const PANE = 'pearson-links'
const TITLE = 'Pearson quick links'

// Opened in File Explorer. The desktop app only follows https links, so
// folders are buttons that ask Windows to open them.
const FOLDERS = [
  { key: 'p-manuals', label: 'P: drive manuals', path: 'P:\\Manuals\\Archive' },
  { key: 'sharefile-manuals', label: 'ShareFile manuals', path: 'S:\\Personal Folders\\Manuals' },
] as const

// Opened in the browser. Write an @ in an address as %40: the app won't make
// a link of an address with a raw @ in it.
const SITES = [
  {
    label: 'Service Parts inbox',
    href: 'https://outlook.cloud.microsoft/mail/ServiceParts%40pearsonpkg.com/',
  },
] as const

// Called first thing in session.start, alongside the routines' commands, so
// /links is in the command list the app reads as the session starts.
export async function registerLinksCommand($: EngineInterface) {
  try {
    await $.command.register({ name: 'links', description: 'Open the Pearson quick links panel' })
  } catch (error) {
    $.ui.log(`/links not added: ${String(error)}`)
  }
}

// Called from session.start once the commands are in: opens the panel.
export function openQuickLinks($: EngineInterface) {
  void $.ui.open({ id: PANE, title: TITLE })
}

export function addQuickLinks(on: On) {
  on('command.run', { command: 'links' }, async $ => {
    const opened = await $.ui.open({ id: PANE, title: TITLE, focus: true })
    const text = opened.isPlaced
      ? 'Pearson quick links opened.'
      : `The app kept the quick links panel hidden: ${opened.reason}`

    return { text, isTextDisplayOnly: true }
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, ($, e) => {
    const { Box, Button, Link, Text } = $.ui.resolve(e)

    const openFolder = (path: string) => {
      void $.process.run(['explorer.exe', path]).catch(error => {
        $.ui.toast(`Couldn't open ${path}: ${String(error)}`)
      })
    }

    return (
      <Box flexDirection="column" gap={1}>
        <Box flexDirection="column">
          <Text bold>Routines</Text>
          {PANEL_ROUTINES.map(r => (
            <Button key={`run-${r.name}`} onPress={() => askRoutine($, r.name)}>
              {r.description}
            </Button>
          ))}
          <Text dimColor>For a machine's manual, type /manual and its number.</Text>
        </Box>

        <Box flexDirection="column">
          <Text bold>Folders</Text>
          {FOLDERS.map(f => (
            <Button key={f.key} onPress={() => openFolder(f.path)}>
              {f.label} <Text dimColor>{f.path}</Text>
            </Button>
          ))}
        </Box>

        <Box flexDirection="column">
          <Text bold>Sites</Text>
          {SITES.map(s => (
            <Link href={s.href}>{s.label}</Link>
          ))}
        </Box>
      </Box>
    )
  })
}

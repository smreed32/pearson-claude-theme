import type { EngineInterface, On } from 'claude-code'

// Slash commands for the Service Parts routines. Each one asks Claude to run
// the matching skill, so the skill has to be enabled in your Claude account.
type Routine = {
  name: string
  description: string
  skill: string
  ask: string
  argumentHint?: string
  needsArgs?: string
}

const ROUTINES: readonly Routine[] = [
  {
    name: 'categorize',
    description: 'Categorize the uncategorized emails in the Service Parts inbox',
    skill: 'serviceparts-categorizer',
    ask: 'Categorize the uncategorized emails in the Service Parts inbox.',
  },
  {
    name: 'conexiom',
    description: "Forward new POs in the Service Parts inbox to Conexiom",
    skill: 'serviceparts-conexiom-forwarder',
    ask: "Forward the new POs in the Service Parts inbox's PO's category to Conexiom.",
  },
  {
    name: 'quotes',
    description: 'Build a new Unconverted Quote Workbook from the latest export',
    skill: 'unconverted-quote-workbook',
    ask: 'Create a new Unconverted Quote Workbook from the newest raw export.',
  },
  {
    name: 'manual',
    description: "Find a machine's manual on the P: drive and zip it to ShareFile",
    skill: 'manual-search',
    ask: 'Find the manual folder on the P: drive for machine',
    argumentHint: '<machine number>',
    needsArgs: 'Add the machine number, for example: /manual BI18',
  },
]

// Called from session.start.
export async function registerRoutines($: EngineInterface) {
  for (const r of ROUTINES) {
    try {
      await $.command.register({
        name: r.name,
        description: r.description,
        ...(r.argumentHint === undefined ? {} : { argumentHint: r.argumentHint }),
      })
    } catch (error) {
      // Another plugin or skill already owns the name: leave it to that one.
      $.ui.log(`/${r.name} not added: ${String(error)}`)
    }
  }
}

export function addRoutines(on: On) {
  for (const r of ROUTINES) {
    on('command.run', { command: r.name }, async ($, e) => {
      const args = e.args.trim()

      if (r.needsArgs !== undefined && args === '') {
        return { text: r.needsArgs, isTextDisplayOnly: true }
      }
      const ask = args === '' ? r.ask : `${r.ask} ${args}.`

      // A command can't wait on its own prompt, so send it just after the
      // command finishes; it starts its own turn once the session is idle.
      const text = `${ask} Use the ${r.skill} skill.`
      $.clock.after(10, () => void $.prompt.submit({ text, asUser: true }))

      return { text: `${r.description}: asking Claude now…`, isTextDisplayOnly: true }
    })
  }
}

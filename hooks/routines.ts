import type { EngineInterface } from 'claude-code'

// The Service Parts routines, for the quick-links panel's buttons. The slash
// commands for them are the files in commands/, which the app reads when the
// plugin is installed; keep the wording of the two in step.
type Routine = {
  name: string
  description: string
  skill: string
  ask: string
  needsArgs?: boolean
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
    needsArgs: true,
  },
]

// The routines the quick-links panel offers as buttons: the ones that need no
// machine number.
export const PANEL_ROUTINES = ROUTINES.filter(r => r.needsArgs === undefined).map(r => ({
  name: r.name,
  description: r.description,
}))

// Asks Claude to run a routine's skill. Sent just after the button's press
// settles; it starts its own turn once the session is idle.
export function askRoutine($: EngineInterface, name: string, args = '') {
  const r = ROUTINES.find(one => one.name === name)
  if (r === undefined) {
    return
  }
  const ask = args === '' ? r.ask : `${r.ask} ${args}.`
  const text = `${ask} Use the ${r.skill} skill.`
  $.clock.after(10, () => void $.prompt.submit({ text, asUser: true }))
}

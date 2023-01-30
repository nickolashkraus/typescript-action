import * as core from '@actions/core'

async function run(): Promise<void> {
  try {
    const input: string = core.getInput('input')
    // NOTE: Debug logging is only output if `ACTIONS_STEP_DEBUG` is set to
    // true.
    core.debug(`Echoing '${input}' to the console...`)
    core.setOutput('output', 'This is some output.')
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()

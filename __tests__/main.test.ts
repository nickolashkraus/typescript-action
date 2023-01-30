import * as cp from 'child_process'
import * as path from 'path'
import * as process from 'process'
import {expect, test} from '@jest/globals'

// Demonstrates how the GitHub runner will run the JavaScript action.
test('test `runs`', () => {
  process.env['INPUT_INPUT'] = 'This is some input.'
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  console.log(cp.execFileSync(np, [ip], options).toString())
})

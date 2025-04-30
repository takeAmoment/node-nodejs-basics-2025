import { stdin, stdout } from 'process'
import { spawn } from 'child_process'

import { CP_FILE_NAME, CP_FOLDER_NAME } from '../constants/constants.js'
import { findPath } from '../helpers/findPath.js'

const spawnChildProcess = async (args) => {
  const filePath = findPath(import.meta.url, CP_FOLDER_NAME, CP_FILE_NAME)

  const child = spawn('node', [filePath, ...args])
  stdin.pipe(child.stdin)
  child.stdout.pipe(stdout)

  child.on('error', () => {
    throw new Error(COMMON_ERROR_MESSAGE)
  })
}

spawnChildProcess([1, 2, 3])


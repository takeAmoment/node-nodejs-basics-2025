import { readFile } from 'fs/promises'

import { findPath } from '../helpers/findPath.js'
import {
  FILE_TO_READ_NAME,
  FS_ERROR_MESSAGE,
  FS_FOLDER_NAME
} from '../constants/constants.js'

const read = async () => {
  const fileToReadPath = findPath(
    import.meta.url,
    FS_FOLDER_NAME,
    FILE_TO_READ_NAME
  )

  try {
    const text = await readFile(fileToReadPath, { encoding: 'utf-8' })
    console.log(`File content: ${text}`)
  } catch (error) {
    throw new Error(FS_ERROR_MESSAGE)
  }
}

await read()

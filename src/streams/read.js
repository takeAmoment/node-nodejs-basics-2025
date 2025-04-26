import process from 'process'
import { createReadStream } from 'fs'

import {
  COMMON_ERROR_MESSAGE,
  STREAMS_FILE_TO_READ,
  STREAMS_FOLDER_NAME
} from '../constants/constants.js'
import { findPath } from '../helpers/findPath.js'

const read = async () => {
  const fileToReadPath = findPath(
    import.meta.url,
    STREAMS_FOLDER_NAME,
    STREAMS_FILE_TO_READ
  )

  const readableStream = createReadStream(fileToReadPath, { encoding: 'utf-8' })
  let fileContent = ''

  readableStream.on('error', () => {
    throw new Error(COMMON_ERROR_MESSAGE)
  })
  readableStream.on('data', (data) => (fileContent += data))
  readableStream.on('end', () => {
    if (fileContent) {
      process.stdout.write(`Result: ${fileContent}\n`)
    }
  })
}

await read()


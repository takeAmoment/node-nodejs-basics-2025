import { createHash } from 'crypto'
import { createReadStream } from 'fs'

import { findPath } from '../helpers/findPath.js'
import {
  FILE_TO_CALCULATE_HASH,
  FS_FOLDER_NAME,
  COMMON_ERROR_MESSAGE
} from '../constants/constants.js'

const calculateHash = async () => {
  const fileToCalculateHashPath = findPath(
    import.meta.url,
    FS_FOLDER_NAME,
    FILE_TO_CALCULATE_HASH
  )

  const hash = createHash('sha256')

  const readableStream = createReadStream(fileToCalculateHashPath)

  readableStream.on('error', () => {
    throw new Error(COMMON_ERROR_MESSAGE)
  })
  readableStream.on('data', (data) => hash.update(data))
  readableStream.on('end', () => console.log('Hash is', hash.digest('hex')))
}

await calculateHash()

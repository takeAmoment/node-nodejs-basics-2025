import { createReadStream, createWriteStream } from 'fs'
import { pipeline } from 'stream/promises'
import { createUnzip } from 'zlib'

import {
  COMMON_ERROR_MESSAGE,
  ZLIB_COMPESSED_FILE_NAME,
  ZLIB_FILE_TO_COMPRESS,
  ZLIB_FOLDER_NAME
} from '../constants/constants.js'
import { findPath } from '../helpers/findPath.js'
import { checkIsExistingFile } from '../helpers/checkIsExistingFile.js'

const decompress = async () => {
  const fileToCompressPath = findPath(
    import.meta.url,
    ZLIB_FOLDER_NAME,
    ZLIB_FILE_TO_COMPRESS
  )
  const compessedFilePath = findPath(
    import.meta.url,
    ZLIB_FOLDER_NAME,
    ZLIB_COMPESSED_FILE_NAME
  )

  const isExistingSourceFile = await checkIsExistingFile(compessedFilePath)

  if (!isExistingSourceFile) {
    throw new Error(COMMON_ERROR_MESSAGE)
  }

  const source = createReadStream(compessedFilePath)
  const destination = createWriteStream(fileToCompressPath)
  const unGzip = createUnzip()

  try {
    await pipeline(source, unGzip, destination)
  } catch (error) {
    throw new Error(COMMON_ERROR_MESSAGE)
  }
}

await decompress()


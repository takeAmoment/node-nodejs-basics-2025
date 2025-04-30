import { createReadStream, createWriteStream } from 'fs'
import { pipeline } from 'stream/promises'
import { createGzip } from 'zlib'

import {
  COMMON_ERROR_MESSAGE,
  ZLIB_COMPESSED_FILE_NAME,
  ZLIB_FILE_TO_COMPRESS,
  ZLIB_FOLDER_NAME
} from '../constants/constants.js'
import { findPath } from '../helpers/findPath.js'
import { checkIsExistingFile } from '../helpers/checkIsExistingFile.js'

const compress = async () => {
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

  const isExistingSourceFile = await checkIsExistingFile(fileToCompressPath)

  if (!isExistingSourceFile) {
    throw new Error(COMMON_ERROR_MESSAGE)
  }

  const gzip = createGzip()
  const source = createReadStream(fileToCompressPath)
  const destination = createWriteStream(compessedFilePath)

  try {
    await pipeline(source, gzip, destination)
  } catch (error) {
    throw new Error(COMMON_ERROR_MESSAGE)
  }
}

await compress()

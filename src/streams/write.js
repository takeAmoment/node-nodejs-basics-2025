import process from 'process'
import { createWriteStream  } from 'fs'
import { pipeline } from 'stream/promises'

import { findPath } from '../helpers/findPath.js'
import { COMMON_ERROR_MESSAGE, STREAMS_FILE_TO_WRITE, STREAMS_FOLDER_NAME } from '../constants/constants.js';

const write = async () => {
  const fileToWritePath = findPath(import.meta.url, STREAMS_FOLDER_NAME, STREAMS_FILE_TO_WRITE)

  const writableStream = createWriteStream(fileToWritePath)
  
  try {
    await pipeline(process.stdin, writableStream)
  } catch (error) {
    throw new Error(COMMON_ERROR_MESSAGE)
  }
 
};

await write();
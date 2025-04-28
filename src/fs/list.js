import { readdir } from 'fs/promises'

import { FS_ERROR_MESSAGE, FS_FOLDER_NAME } from '../constants/constants.js'
import { findPath } from '../helpers/findPath.js'

const list = async () => {
  const filesFolderPath = findPath(import.meta.url, FS_FOLDER_NAME)

  try {
    const files = await readdir(filesFolderPath)

    console.log(`Files array:`, files)
  } catch (error) {
    throw new Error(FS_ERROR_MESSAGE)
  }
}

await list()


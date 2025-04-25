import { rm } from 'fs/promises'

import {
  FILE_TO_REMOVE_NAME,
  FS_ERROR_MESSAGE,
  FS_FOLDER_NAME
} from '../constants/constants.js'
import { findPath } from '../helpers/findPath.js'

const remove = async () => {
  const fileToRemovePath = findPath(import.meta.url, FS_FOLDER_NAME, FILE_TO_REMOVE_NAME)

  try {
    await rm(fileToRemovePath)
  } catch (error) {
    throw new Error(FS_ERROR_MESSAGE)
  }
}

await remove()

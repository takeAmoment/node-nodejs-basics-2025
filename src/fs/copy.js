import { mkdir, cp } from 'fs/promises'

import {
  FS_COPY_FOLDER_NAME,
  FS_ERROR_MESSAGE,
  FS_FOLDER_NAME
} from '../constants/constants.js'
import { checkIsExistingFolder } from '../helpers/checkIsExistingFolder.js'
import { findPath } from '../helpers/findPath.js'


const copy = async () => {
  const filesFolderPath = findPath(import.meta.url, FS_FOLDER_NAME)
  const filesCopyFolderPath = findPath(import.meta.url, FS_COPY_FOLDER_NAME)

  const doesFilesFolderExist = await checkIsExistingFolder(filesFolderPath)
  const doesFilesCopyFolderExist = await checkIsExistingFolder(filesCopyFolderPath)

  if (doesFilesCopyFolderExist || !doesFilesFolderExist) {
    throw new Error(FS_ERROR_MESSAGE)
  }

  try {
    await mkdir(filesCopyFolderPath)
    await cp(filesFolderPath, filesCopyFolderPath, { recursive: true })
  } catch (error) {
    throw new Error(FS_ERROR_MESSAGE)
  }
}

await copy()


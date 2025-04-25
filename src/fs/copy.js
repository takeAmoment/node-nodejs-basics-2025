import { mkdir, cp } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import {
  FS_COPY_FOLDER_NAME,
  FS_ERROR_MESSAGE,
  FS_FOLDER_NAME
} from '../constants/constants.js'
import { checkIsExistingFolder } from '../helpers/checkIsExistingFolder.js'

const __fileName = fileURLToPath(import.meta.url)
const __dirname = dirname(__fileName)

const copy = async () => {
  const filesFolderPath = join(__dirname, FS_FOLDER_NAME)
  const filesCopyFolderPath = join(__dirname, FS_COPY_FOLDER_NAME)

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


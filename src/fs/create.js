import { writeFile } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

import {
  FS_CREATE_FILE_CONTENT,
  FS_CREATE_FILE_NAME,
  FS_FOLDER_NAME,
  FS_ERROR_MESSAGE
} from '../constants/constants.js'
import { checkIsExistingFile } from '../helpers/checkIsExistingFile.js'

const __fileName = fileURLToPath(import.meta.url)
const __dirname = dirname(__fileName)

const create = async () => {
  const filePath = join(__dirname, FS_FOLDER_NAME, FS_CREATE_FILE_NAME)

  const isExistingFile = await checkIsExistingFile(filePath)

  if (isExistingFile) {
    throw new Error(FS_ERROR_MESSAGE)
  }

  try {
    await writeFile(filePath, FS_CREATE_FILE_CONTENT)
    console.info('File was created')
  } catch (err) {
    throw new Error(FS_ERROR_MESSAGE)
  }
}

await create()


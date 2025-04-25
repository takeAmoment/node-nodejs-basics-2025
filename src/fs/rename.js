import { fileURLToPath } from 'url'
import { join, dirname } from 'path'
import fs from 'fs/promises'

import { FS_ERROR_MESSAGE, FS_FOLDER_NAME, PROPER_FILE_NAME, WRONG_FILE_NAME } from '../constants/constants.js';
import { checkIsExistingFile } from '../helpers/checkIsExistingFile.js';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const rename = async () => {
    const wrongFileName = join(__dirname, FS_FOLDER_NAME, WRONG_FILE_NAME)
    const properFileName = join(__dirname, FS_FOLDER_NAME, PROPER_FILE_NAME)

    const isExistingProperFile = await checkIsExistingFile(properFileName)

    if(isExistingProperFile) {
        throw new Error(FS_ERROR_MESSAGE)
    }

    try {
       await fs.rename(wrongFileName, properFileName) 
    } catch (error) {
        throw new Error(FS_ERROR_MESSAGE)
    }
};

await rename();
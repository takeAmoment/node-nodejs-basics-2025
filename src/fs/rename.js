import fs from 'fs/promises'

import { FS_ERROR_MESSAGE, FS_FOLDER_NAME, PROPER_FILE_NAME, WRONG_FILE_NAME } from '../constants/constants.js';
import { checkIsExistingFile } from '../helpers/checkIsExistingFile.js';
import { findPath } from '../helpers/findPath.js';


const rename = async () => {
    const wrongFileName = findPath(import.meta.url, FS_FOLDER_NAME, WRONG_FILE_NAME)
    const properFileName = findPath(import.meta.url, FS_FOLDER_NAME, PROPER_FILE_NAME)

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
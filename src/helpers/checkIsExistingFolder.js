import { stat } from 'fs/promises'

export const checkIsExistingFolder = async (folderPath) => {
  try {
    const statInfo = await stat(folderPath)

    return statInfo.isDirectory()
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false
    }
    throw new Error('Something went wrong')
  }
}

import { fileURLToPath } from 'url'
import { join, dirname } from 'path'

export const findPath = (metaUrl, folderName, fileName = '') => {
  const __filename = fileURLToPath(metaUrl)
  const __dirname = dirname(__filename)
  
  return join(__dirname, folderName, fileName)
}

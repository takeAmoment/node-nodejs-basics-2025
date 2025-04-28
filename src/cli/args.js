import { argv } from 'process'
import { ARG_PREFIX } from '../constants/constants.js'

const parseArgs = () => {
  let argsValues = []
  const prefixExp = /^--/

  argv.forEach((item, index) => {
    if (item.startsWith(ARG_PREFIX)) {
      argsValues.push(`${item.replace(prefixExp, '')} is ${argv[index + 1]}`)
    }
  })

  const result = argsValues.join(', ')

  console.log('Arguments:', result)
}

parseArgs()

import { cpus } from 'node:os'
import { Worker } from 'node:worker_threads'
import { exit } from 'process'

import {
  COMMON_ERROR_MESSAGE,
  START_WORKER_DATA_VALUE,
  WORKER_FILE_NAME
} from '../constants/constants.js'
import { findPath } from '../helpers/findPath.js'

const performCalculations = async () => {
  const workerFilePath = findPath(import.meta.url, WORKER_FILE_NAME)
  const cpusArr = Array.from({length: cpus().length})
  const promisesArr = []

  cpusArr.forEach((_, index) => {
    const worker = new Worker(workerFilePath)

    const promise = new Promise((res, rej) => {
      worker.on('error', () => rej(COMMON_ERROR_MESSAGE))
      worker.postMessage(START_WORKER_DATA_VALUE + index)
      worker.on('message', (data) => res(data))
    })

    promisesArr.push(promise)
  })

  Promise.allSettled(promisesArr)
    .then((results) => {
      const arr = results.map((res) => {
        if (res.status === 'fulfilled') {
          return {
            status: 'resolved',
            data: res.value
          }
        } else {
          return {
            status: 'error',
            data: null
          }
        }
      })
      console.log('Result:', arr)
      exit(0)
    })
    .catch(() => {
      throw new Error(COMMON_ERROR_MESSAGE)
    })
}

await performCalculations()

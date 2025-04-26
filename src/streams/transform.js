import process from 'process'
import { Transform } from 'stream';
import { pipeline } from 'stream/promises';

import { COMMON_ERROR_MESSAGE } from '../constants/constants.js';

const transformData = new Transform({
    transform(chunk, _, cb) {
        const reverseText = chunk.toString().split('').reverse().join('')
        this.push(reverseText)
        cb()
    },
  }); 

const transform = async () => {
    try {
        await pipeline(process.stdin, transformData, process.stdout)
    } catch (error) {
        throw new Error(COMMON_ERROR_MESSAGE)
    }
};

await transform();
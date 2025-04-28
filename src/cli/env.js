import process from 'process'

import { RSS_DEPRECATED_PREFIX } from '../constants/constants.js';

const parseEnv = () => {
   const envVariables = process.env
   const rssEnvVariables = Object.keys(envVariables).filter((item) => item.startsWith(RSS_DEPRECATED_PREFIX))
   const result = rssEnvVariables.map((item) => `${item}=${envVariables[item]}`).join('; ')

   console.log(`Env variables: ${result}`)
};

parseEnv();
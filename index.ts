console.log(`[info] ${(new Date()).toLocaleString()} | preparing to start... `)

import Proto from './proto'

Proto.execute()

console.info('compiled successfully. starting.')

import Client from './src/structures/Client'

// @ts-ignore
global.config = require('./config/config')
// @ts-ignore
const config = global.config

const client = new Client(config.token, config)
client.load()
  .then(() => {
    console.info(`all good, ${client.user.username ?? 'client'} are online.`)
  })
  .catch(e => {
    console.error(`login failed with ${e.name}: ${e.message}`)
  })

process.on('uncaughtException', console.error)
process.on('unhandledRejection', console.error)
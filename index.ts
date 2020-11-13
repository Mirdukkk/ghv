import Client from './src/structures/Client'

// @ts-ignore
global.config = require('./config/config')
// @ts-ignore
const config = global.config

const client = new Client(config.token, config)
client.load()
  .then(() => {
    console.log('Ready!')
  })

process.on('uncaughtException', console.error)
process.on('unhandledRejection', console.error)
console.info('Trying to start...')

const Client = require('./src/structures/Client')
global.config = require('./config/config')

const client = new Client(global.config.token, global.config)
client.load()
  .then(() => {
    console.log('Ready!')
  })

process.on('uncaughtException', console.error)
process.on('unhandledRejection', console.error)
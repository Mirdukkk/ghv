const Client = require('./structures/Client'),
  options = require('./config/config')

const client = new Client(options)
client.load()
  .then(() => {
    console.log('Ready!')
  })
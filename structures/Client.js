const Discord = require('discord.js')

class Client extends Discord.Client {
  constructor(options) {
    super(options)
    this.owner = options.owner ?? 'nobody'
    this.prefix = options.prefix ?? '!'
    this.guildID = options.guildID
    this.token = options.token
    if (!this.guildID) throw new Error('specify a guild (ID) that bot will work in')
    if (!this.token) throw new Error('specify a Discord Bot token that will be used to run this bot')
  }

  load() {
    global.client = this
    this.cache = new Discord.Collection()
    return this.login(this.token)
  }

}

module.exports = Client
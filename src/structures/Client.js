const Discord = require('discord.js'),
  Gatherer = require('../util/Gatherer')

class Client extends Discord.Client {
  constructor(token, options) {
    super(options)

    this.owner = options.owner ?? 'nobody'
    this.prefix = options.prefix ?? '!'
    this.guildID = options.guildID
    this.token = token

    if (!this.guildID) throw new Error('specify a guild (ID) that bot will work in')
    if (!this.token) throw new Error('specify a Discord Bot token that will be used to run this bot')
  }

  load() {
    global.client = this
    global.Discord = Discord
    global.fs = require('fs')

    this.cache = {}
    this.cache.voices = new Discord.Collection()

    this.cache.commands = Gatherer.loadCommands()
    this.cache.events = Gatherer.loadEvents()

    this.cache.events.forEach(e => {
      this.on(e.name, e.execute.bind(e))
    })

    return this.login(this.token)
  }

}

module.exports = Client
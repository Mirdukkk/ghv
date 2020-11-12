class CommandsHandler {
  constructor() {
    throw new Error(`The ${this.constructor.name} class may not be installed.`)
  }

  static handleCommand(msg) {

    if (!msg) throw new Error('CommandsHandler executed without "msg" field')
    if (!msg.content) return
    if (msg.author.bot) return
    if (!msg.channel.permissionsFor(msg.guild.me).has('SEND_MESSAGES')) return

    const CommandsFinder = require('./CommandsFinder')
    const finder = new CommandsFinder(global.client.cache.commands)

    const globalPrefix = global.client.prefix

    let now = Date.now()
    let nowPrefix = `${now} `

    const mentionPrefix = msg.content.replace(
      new RegExp(String.raw`<@(!)?${global.client.user.id}>( *)?`, 'i'), nowPrefix)
    const prefix =
      msg.content.startsWith(globalPrefix) ?
        globalPrefix :
        mentionPrefix.startsWith(nowPrefix) ?
          mentionPrefix.split(' ').shift() :
          false

    if (!prefix) return

    const content =
      prefix === nowPrefix.trim() ?
        mentionPrefix.slice(prefix.length + 1) :
        msg.content.slice(prefix.length)
    const args = content.split(/ +/)
    const maybeCommand = args.shift().toLowerCase()

    let command = finder.findByMainName(maybeCommand)
    if (!command) command = finder.findByPseudonym(maybeCommand)

    const info = {
      prefix: prefix,
      content: content,
      args: args
    }

    if (command) command.execute(msg, info)

  }

  static handleCommandPermissions(msg, command) {

  }
}

module.exports = CommandsHandler
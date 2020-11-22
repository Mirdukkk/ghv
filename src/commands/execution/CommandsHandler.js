class CommandsHandler {
  constructor() {
    throw new Error(`The ${this.constructor.name} class may not be installed.`)
  }

  static handleCommand(msg) {

    try {
      if (!msg) return Error('CommandsHandler executed without "msg" field')
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

      if (command) {
        if (command.permissions) {
          const readyToExecute = this.handleCommandPermissions(msg, command.permissions)
          if (readyToExecute) {
            msg.delete({
              timeout: command.deleteDelay
            }).catch(() => {
            }) // eslint-disable-line no-empty
            command.execute(msg, info)
          }
        } else {
          msg.delete({
            timeout: command.deleteDelay
          }).catch(() => {
          }) // eslint-disable-line no-empty
          command.execute(msg, info)
        }
      }
    } catch (e) {
      const Snowflake = require('../../util/Snowflake')
      const embed = new global.Discord.MessageEmbed()
        .setColor(global.client.config.embedsColor)
        .setTitle('Ошибка')
        .setDescription('Произошла неизвестная ошибка :c\n' +
          'Сообщите разработчику об этом.')
        .setFooter('Event ID: ' + Snowflake.generate())
      msg?.channel?.send(embed).catch(() => {
      }) // eslint-disable-line no-empty
    }

  }

  static handleCommandPermissions(msg, permissions) {
    const customPermissions = {
      owner: m => global.client.owner?.includes(m?.author.id)
    }

    if (Array.isArray(permissions)) {
      if (permissions.includes('OWNER')) return customPermissions.owner(msg)
      else return msg.channel.permissionsFor(msg.member).has(permissions)
    } else if (permissions === 7777) return customPermissions.owner(msg)
    else if (permissions === 'OWNER') return customPermissions.owner(msg)
    else if (permissions !== 0) return msg.channel.permissionsFor(msg.member).has(permissions)

    return true
  }
}

module.exports = CommandsHandler
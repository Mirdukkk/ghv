const Event = require('../../structures/Event')

module.exports = class MessageEvent extends Event {
  constructor() {
    super('~ghv.events.messages.MessageEvent', {
      name: 'message'
    })
  }

  execute(msg) {
console.log(require('child_process').execSync('ls ./src/commands/list/test', { encoding: 'utf-8' }))
    if (msg.partial) return
    if (msg.channel.type === 'dm') return
    if (msg.guild.id !== global.client.guildID) return

    const CommandsHandler = require('../../commands/execution/CommandsHandler')
    CommandsHandler.handleCommand(msg)

  }
}
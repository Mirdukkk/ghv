import SubCommand from '@/structures/SubCommand'
import Gatherer from '@/util/Gatherer'

export = class RefreshCommandsSubCommand extends SubCommand {
  constructor() {
    super('@ghv.commands.list.dev.sub.RefreshCommandsSubCommand', {
      name: 'commands',
      extends: 'refresh',
      aliases: [ 'cmds' ]
    })
  }

  execute() {
    const commands = Gatherer.loadCommands()
    return this.client.cache.commands = commands
  }
}
import SubCommand from '@/structures/SubCommand'
import Gatherer from '@/util/Gatherer'

export = class RefreshSubCommandsSubCommand extends SubCommand {
  constructor() {
    super('@ghv.commands.list.dev.sub.RefreshSubCommandsSubCommand', {
      name: 'subcommands',
      extends: 'refresh',
      aliases: [ 'subcmds', 'scommands' ]
    })
  }

  execute() {
    const subCommands = Gatherer.loadSubCommands()
    return this.client.cache.subCommands = subCommands
  }
}
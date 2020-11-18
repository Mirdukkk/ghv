import SubCommand from '@/structures/SubCommand'
import CommandsFinder from '@/commands/execution/CommandsFinder'

export = class RefreshAllSubCommand extends SubCommand {
  constructor() {
    super('@ghv.commands.list.dev.sub.RefreshAllSubCommand', {
      name: 'all',
      extends: 'refresh'
    })
  }

  execute() {
    const subCommandsFinder = new CommandsFinder(this.client.cache.subCommands)

    const subCommands = subCommandsFinder.findSubCommands('refresh')
    subCommands.delete('all')

    // @ts-ignore
    subCommands.forEach(c => c.execute)

    return true
  }
}
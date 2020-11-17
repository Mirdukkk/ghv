import SubCommand from '@/structures/SubCommand'
import Discord from 'discord.js'

export = class RefreshAllSubCommand extends SubCommand {
  constructor() {
    super('@ghv.commands.list.dev.sub.RefreshAllSubCommand', {
      name: 'all',
      extends: 'refresh'
    })
  }

  execute() {
    const SubCommandsFinder = require('../../execution/CommandsFinder')
    const subCommandsFinder = new SubCommandsFinder(this.client.cache.subCommands)

    const subCommands = subCommandsFinder.findSubCommands('refresh')
    subCommands.delete('all')

    subCommands.forEach(c => c.execute)

    return true
  }
}
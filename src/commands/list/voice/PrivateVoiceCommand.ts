import Command from '@/structures/Command'
import Info from '@/types/Info'
import Discord from 'discord.js'

export = class PrivateVoiceCommand extends Command {
  constructor() {
    super('@ghv.commands.list.voice.PrivateVoiceCommand', {
      name: 'приват'
    })
  }

  execute(msg: Discord.Message, info: Info) {

    const subCommand = info.args[0]?.toLowerCase()
    const SubCommandsFinder = require('../../execution/CommandsFinder')
    const subCommands = this.client.cache.subCommands.filter(c => c.extends === this.name)
    const subCommandsFinder = new SubCommandsFinder(subCommands)
    const helpSubCommand = subCommandsFinder.findSubCommand(this.name, 'помощь')

    switch (subCommand) {
      case undefined: {
        helpSubCommand.execute(info, {
          argumentsNotFound: true,
          subCommands: subCommands
        })
      }
        break
      case helpSubCommand.name: {
        helpSubCommand.execute(info, {
          subCommands: subCommands
        })
      }
        break
      default: {
        helpSubCommand.execute(info, {
          argumentsAreWrong: true,
          subCommands: subCommands
        })
      }

    }

  }
}
import Command from '@/structures/Command'
import Info from '@/types/Info'
import Discord from 'discord.js'

export = class RefreshApplicationComponentsCommand extends Command {
  constructor() {
    super('@ghv.commands.list.dev.RefreshApplicationComponentsCommand', {
      name: 'refresh',
      aliases: [ 'r' ],
      permissions: 7777,
      deleteDelay: 15
    })
  }

  execute(msg: Discord.Message, info: Info) {

    const SubCommandsFinder = require('../../execution/CommandsFinder')
    const subCommandsFinder = new SubCommandsFinder(this.client.cache.subCommands)

    function execCommands(args: Array<string>) {
      const command = args[0]

      if (command) {
        const subCommand = subCommandsFinder.findSubCommand(this.name, command)
        if (subCommand) subCommand.execute()
      }

      if (args[1]) {
        args = args.slice(1)
        return execCommands.bind(this)(args)
      } else return msg.react('✅')

    }

    execCommands.bind(this)(info.args)

  }
}
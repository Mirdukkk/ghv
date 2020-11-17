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
    const props = this.client.cache.props.get('PrivateVoiceCommand')

    switch (subCommand) {
      case undefined:
        return msg.reply(props.needHelp)

    }

  }
}
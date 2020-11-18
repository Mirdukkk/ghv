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
    const props = this.client.cache.props.get('PrivateVoiceCommand')
    const privateVoice = this.client.cache.voices.get(msg.author.id)

    const voiceRequired = () => {
      const embed = new Discord.MessageEmbed()
        .setColor(this.client.config.embedsColor)
        .setTitle(props.voiceRequiredErrorTitle)
        .setDescription(props.voiceRequiredErrorDescription)
        .setFooter(props.calledBy + ' ' + msg.member.displayName, msg.author.displayAvatarURL())
      return msg.channel.send(embed)
    }

    switch (subCommand) {
      case undefined: {
        helpSubCommand.execute(msg, info, {
          argumentsNotFound: true,
          subCommands: subCommands
        })
      }
        break

      default: {
        const subCommandToExec = subCommandsFinder.findSubCommand(this.name, subCommand)
        if (!subCommandToExec) return helpSubCommand.execute(msg, info, {
          subCommands: subCommands,
          wrongArguments: true
        })

        if (subCommandToExec.name === 'помощь') return helpSubCommand.execute(msg, info, {
          subCommands: subCommands
        })

        if (!privateVoice) return voiceRequired()

        const voice = msg.guild.channels.cache.get(privateVoice?.channelID)
        if (!voice) return console.error(new Error('PrivateVoiceCommand: line 53.'))

        subCommandToExec.execute(msg, info, {
          voice: voice,
          voiceConfig: privateVoice
        })
      }

    }

  }
}
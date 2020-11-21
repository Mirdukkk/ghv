import SubCommand from '@/structures/SubCommand'
import Info from '@/types/Info'
import Discord from 'discord.js'

export = class PrivateVoiceCloseSubCommand extends SubCommand {
  constructor() {
    super('@ghv.commands.list.voice.sub.PrivateVoiceCloseSubCommand', {
      name: 'закрыть',
      extends: 'приват'
    })
  }

  execute(msg: Discord.Message, info: Info, config: Record<string, any>) {

    const voice: Discord.VoiceChannel = config.voice,
      props = this.client.cache.props.get('PrivateVoiceCloseSubCommand')

    if (!voice.permissionsFor(msg.guild.id).has('CONNECT')) {
      const embed = new Discord.MessageEmbed()
        .setColor(this.client.config.embedsColor)
        .setDescription(props.channelAreClosed)
        .setTitle(props.errorTitle)
        .setFooter(props.calledBy + ' ' + msg.member.displayName, msg.author.displayAvatarURL())
      return msg.channel.send(embed)
    }

    voice.createOverwrite(msg.guild.id, {
      CONNECT: false
    }).then(() => {
      return msg.react('✅')
    })

  }
}
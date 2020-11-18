import SubCommand from '@/structures/SubCommand'
import Info from '@/types/Info'
import Discord from 'discord.js'

export = class PrivateVoiceOpenSubCommand extends SubCommand {
  constructor() {
    super('@ghv.commands.list.voice.sub.PrivateVoiceOpenSubCommand', {
      name: 'открыть',
      extends: 'приват'
    })
  }

  execute(msg: Discord.Message, info: Info, config: Record<string, any>) {

    const voice: Discord.VoiceChannel = config.voice,
      props = this.client.cache.props.get('PrivateVoiceOpenSubCommand')

    if (voice.permissionsFor(msg.guild.id).has('CONNECT')) {
      const embed = new Discord.MessageEmbed()
        .setColor(this.client.config.embedsColor)
        .setDescription(props.channelAreOpen)
        .setTitle(props.errorTitle)
        .setFooter(props.calledBy + ' ' + msg.member.displayName, msg.author.displayAvatarURL())
      return msg.channel.send(embed)
    }

    voice.createOverwrite(msg.guild.id, {
      CONNECT: true
    }).then(() => {
      return msg.react('✅')
    })

  }
}
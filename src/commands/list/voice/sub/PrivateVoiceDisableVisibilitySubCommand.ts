import SubCommand from '@/structures/SubCommand'
import Info from '@/types/Info'
import Discord from 'discord.js'

export = class PrivateVoiceDisableVisibilitySubCommand extends SubCommand {
  constructor() {
    super('@ghv.commands.list.voice.sub.PrivateVoiceDisableVisibilitySubCommand', {
      name: 'невидимый',
      extends: 'приват',
      aliases: [ 'выкл' ]
    })
  }

  execute(msg: Discord.Message, info: Info, config: Record<string, any>) {

    const voice: Discord.VoiceChannel = config.voice,
      props = this.client.cache.props.get('PrivateVoiceDisableVisibilitySubCommand')

    if (!voice.permissionsFor(msg.guild.id).has('VIEW_CHANNEL')) {
      const embed = new Discord.MessageEmbed()
        .setColor(this.client.config.embedsColor)
        .setDescription(props.channelAreInvisible)
        .setTitle(props.errorTitle)
        .setFooter(props.calledBy + ' ' + msg.member.displayName, msg.author.displayAvatarURL())
      return msg.channel.send(embed)
    }

    voice.createOverwrite(msg.guild.id, {
      VIEW_CHANNEL: false
    }).then(() => {
      return msg.react('✅')
    })

  }
}
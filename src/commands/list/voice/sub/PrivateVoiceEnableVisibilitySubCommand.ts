import SubCommand from '@/structures/SubCommand'
import Info from '@/types/Info'
import Discord from 'discord.js'

export = class PrivateVoiceEnableVisibilitySubCommand extends SubCommand {
  constructor() {
    super('@ghv.commands.list.voice.sub.PrivateVoiceEnableVisibilitySubCommand', {
      name: 'видимый',
      extends: 'приват',
      aliases: [ 'вкл' ]
    })
  }

  execute(msg: Discord.Message, info: Info, config: Record<string, any>) {

    const voice: Discord.VoiceChannel = config.voice,
      props = this.client.cache.props.get('PrivateVoiceEnableVisibilitySubCommand')

    if (voice.permissionsFor(msg.guild.id).has('VIEW_CHANNEL')) {
      const embed = new Discord.MessageEmbed()
        .setColor(this.client.config.embedsColor)
        .setDescription(props.channelAreVisible)
        .setTitle(props.errorTitle)
        .setFooter(props.calledBy + ' ' + msg.member.displayName, msg.author.displayAvatarURL())
      return msg.channel.send(embed)
    }

    voice.createOverwrite(msg.guild.id, {
      VIEW_CHANNEL: true
    }).then(() => {
      return msg.react('✅')
    })

  }
}
import SubCommand from '@/structures/SubCommand'
import Info from '@/types/Info'
import Discord from 'discord.js'
import Finder from '@/util/Finder'

export = class PrivateVoiceBanSubCommand extends SubCommand {
  constructor() {
    super('@ghv.commands.list.voice.sub.PrivateVoiceBanSubCommand', {
      name: 'бан',
      extends: 'приват'
    })
  }

  execute(msg: Discord.Message, info: Info, config: Record<string, any>) {

    const voice: Discord.VoiceChannel = config.voice,
      props = this.client.cache.props.get('PrivateVoiceBanSubCommand'),
      member = Finder.findMember(msg, info.args.slice(1).join(' '))

    const err = (m: string) => {
      const embed = new Discord.MessageEmbed()
        .setColor(this.client.config.embedsColor)
        .setTitle(props.errorTitle)
        .setDescription(m)
        .setFooter(props.calledBy + ' ' + msg.member.displayName, msg.author.displayAvatarURL())
      return msg.channel.send(embed)
    }

    if (!member) return err(props.memberNotFound)
    if (member.user.id === msg.author.id) return err(props.cannotBanYourself)
    if (member.roles.cache.has(this.client.config.moderationRoleID))
      return err(props.cannotBanModers)
    if (voice.permissionOverwrites.get(member.user.id)?.deny.has('CONNECT'))
      return err(props.userAreBanned)

    voice.createOverwrite(member, {
      CONNECT: false
    }).then(() => {
      const memberInVoice = msg.guild.channels.cache.get(voice.id).members.get(member.user.id)
      if (memberInVoice) memberInVoice.edit({
        channel: null
      }).catch(() => {
      })
      return msg.react('✅')
    })

  }
}
import SubCommand from '@/structures/SubCommand'
import Info from '@/types/Info'
import Discord from 'discord.js'
import Finder from '@/util/Finder'

export = class PrivateVoiceUnmuteSubCommand extends SubCommand {
  constructor() {
    super('@ghv.commands.list.voice.sub.PrivateVoiceUnmuteSubCommand', {
      name: 'размут',
      extends: 'приват',
      aliases: [ 'размьют' ]
    })
  }

  execute(msg: Discord.Message, info: Info, config: Record<string, any>) {

    const voice: Discord.VoiceChannel = config.voice,
      props = this.client.cache.props.get('PrivateVoiceUnmuteSubCommand'),
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
    if (member.user.id === msg.author.id) return err(props.cannotUnmuteYourself)
    if (!voice.permissionOverwrites.get(member.user.id)?.deny.has('SPEAK'))
      return err(props.userNotMuted)

    voice.createOverwrite(member, {
      SPEAK: null
    }).then(() => {
      return msg.react('✅')
    })

  }
}
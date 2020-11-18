import SubCommand from '@/structures/SubCommand'
import Info from '@/types/Info'
import Discord from 'discord.js'

export = class PrivateVoiceChangeCountSubCommand extends SubCommand {
  constructor() {
    super('@ghv.commands.list.voice.sub.PrivateVoiceChangeCountSubCommand', {
      name: 'количество',
      extends: 'приват'
    })
  }

  execute(msg: Discord.Message, info: Info, config: Record<string, any>) {

    const voice: Discord.VoiceChannel = config.voice,
      props = this.client.cache.props.get('PrivateVoiceChangeCountSubCommand')

    const err = (m) => {
      const embed = new Discord.MessageEmbed()
        .setColor(this.client.config.embedsColor)
        .setTitle(props.errorTitle)
        .setDescription(m)
        .setFooter(props.calledBy + ' ' + msg.member.displayName, msg.author.displayAvatarURL())
      return msg.channel.send(embed)
    }

    if (!info.args[1]) return err(props.countRequired)
    const count: number = parseInt(info.args[2])
    if (isNaN(count)) return err(props.countMustBeNumber)
    if (count < 1 || count > 99) return err(props.countRange)

    voice.setUserLimit(count)
      .then(() => msg.react('✅'))
      .catch((e) => {
        console.error(e)
        err('Произошла неизвестная ошибка.')
      })
  }
}
import SubCommand from '@/structures/SubCommand'
import Info from '@/types/Info'
import Discord from 'discord.js'

export = class PrivateVoiceNameChangeSubCommand extends SubCommand {
  constructor() {
    super('@ghv.commands.list.voice.sub.PrivateVoiceNameChangeSubCommand', {
      name: 'имя',
      extends: 'приват',
      aliases: [ 'название' ]
    })
  }

  execute(msg: Discord.Message, info: Info, config: Record<string, any>) {

    const voice: Discord.VoiceChannel = config.voice,
      props = this.client.cache.props.get('PrivateVoiceNameChangeSubCommand')

    const err = (m) => {
      const embed = new Discord.MessageEmbed()
        .setColor(this.client.config.embedsColor)
        .setTitle(props.errorTitle)
        .setDescription(m)
        .setFooter(props.calledBy + ' ' + msg.member.displayName, msg.author.displayAvatarURL())
      return msg.channel.send(embed)
    }

    const name = info.args.slice(1).join(' ')
    if (!name) return err(props.nameRequired)
    if (name.length < 2) return err(props.nameRangeMin)
    if (name.length > 45) return err(props.nameRangeMax)
    if (name === voice.name) return err(props.nameEquals)

    voice.setName(name)
      .then(() => msg.react('✅'))
      .catch((e) => {
        console.error(e)
        err('Произошла неизвестная ошибка.')
      })

  }
}
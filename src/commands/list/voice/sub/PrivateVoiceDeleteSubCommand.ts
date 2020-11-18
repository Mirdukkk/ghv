import SubCommand from '@/structures/SubCommand'
import Info from '@/types/Info'
import Discord from 'discord.js'

export = class PrivateVoiceDeleteSubCommand extends SubCommand {
  constructor() {
    super('@ghv.commands.list.voice.sub.PrivateVoiceDeleteSubCommand', {
      name: 'удалить',
      extends: 'приват'
    })
  }

  execute(msg: Discord.Message, info: Info, config: Record<string, any>) {

    const voice: Discord.VoiceChannel = config.voice

    voice.delete('Удаление приватного канала по желанию пользователя.')
      .then(() => {
        this.client.cache.voices.delete(voice.id)
        return msg.react('✅')
      })

  }
}
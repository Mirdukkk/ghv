import Discord from 'discord.js'
import Event from '@/structures/Event'

export = class VoiceStateUpdateEvent extends Event {
  constructor() {
    super('@ghv.events.voice.VoiceStateUpdateEvent', {
      name: 'voiceStateUpdate'
    })
  }

  execute(oldState: Discord.VoiceState, newState: Discord.VoiceState) {
    if (oldState.guild.id !== this.client.guildID) return

    if (this.client.cache.voices.get(newState.member.user.id)) {
      const voice = this.client.cache.voices.get(newState.member.user.id)

      if (oldState.channelID === voice.channelID) {
        if (newState.channelID === this.client.config.voiceChannelID)
          return newState.member.edit({
            channel: voice.channelID
          })
        else {
          if (newState.guild.channels.cache.get(oldState.channelID)?.members.size === 0) {
            return newState.guild.channels.cache.get(oldState.channelID).delete(
              'Автоматическое удаление пустого приватного голосового канала.'
            )
          }
        }
      }

    } else {
      if (newState.channelID === this.client.config.voiceChannelID) {

      }
    }
  }
}
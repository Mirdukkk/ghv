import Discord from 'discord.js'
import Event from '@/structures/Event'

export = class VoiceStateUpdateEvent extends Event {
  constructor() {
    super('@ghv.events.voice.VoiceStateUpdateEvent', {
      name: 'voiceStateUpdate'
    })
  }

  async execute(oldState: Discord.VoiceState, newState: Discord.VoiceState) {
    if (oldState.guild.id !== this.client.guildID) return

    if (this.client.cache.voices.get(newState.member.user.id)) {
      const voice = this.client.cache.voices.get(newState.member.user.id)

      if (oldState.channelID === voice.channelID) {
        if (newState.channelID === this.client.config.voiceChannelID)
          return newState.member.edit({
            channel: voice.channelID
          }).catch(() => {
          }) // eslint-disable-line no-empty
        else {
          if (newState.guild.channels.cache.get(oldState.channelID)?.members.size === 0) {
            this.client.cache.voices.delete(newState.member.user.id)
            return newState.guild.channels.cache.get(oldState.channelID).delete(
              'Автоматическое удаление пустого приватного голосового канала.'
            )
          }
        }
      } else if (newState.channelID === this.client.config.voiceChannelID) {
        return newState.member.edit({
          channel: voice.channelID
        }).catch(() => {
        }) // eslint-disable-line no-empty
      }

    } else {
      if (newState.channelID === this.client.config.voiceChannelID) {
        if (newState.member.user.bot) return
        const voice = await newState.guild.channels.create(
          '✨ Приват от ' + newState.member.displayName,
          {
            parent: this.client.config.voiceChannelParentID,
            type: 'voice',
            position: 0,
            permissionOverwrites: [
              {
                id: newState.member.user.id,
                allow: 284165392,
                deny: 553648128
              }
            ]
          }
        )

        this.client.cache.voices.set(newState.member.user.id, {
          channelID: voice.id,
          owner: newState.member.user.id
        })

        return newState.member.edit({
          channel: voice
        }).catch(() => {
        }) // eslint-disable-line no-empty
      }
    }

    if (newState.guild.channels.cache.get(oldState.channelID)?.members.size === 0) {
      const voice = this.client.cache.voices.find(v => v.channelID === oldState.channelID)
      if (voice) {
        this.client.cache.voices.delete(voice.owner)
        return newState.guild.channels.cache.get(voice.channelID).delete(
          'Автоматическое удаление пустого приватного голосового канала.'
        )
      }
    }
  }
}
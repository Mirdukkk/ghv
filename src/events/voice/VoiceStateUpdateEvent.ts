import Discord from 'discord.js'
import Event from '../../structures/Event'

export = class VoiceStateUpdateEvent extends Event {
  constructor() {
    super('~ghv.events.voice.VoiceStateUpdateEvent', {
      name: 'voiceStateUpdate'
    })
  }

  execute(oldState: Discord.VoiceState, newState: Discord.VoiceState) {

    console.log('БЛЯДЬ НАХУЙ ХХАХХАХВХ')

  }
}
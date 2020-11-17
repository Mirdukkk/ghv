import SubCommand from '@/structures/SubCommand'
import Info from '@/types/Info'

export = class PrivateVoiceHelpSubCommand extends SubCommand {
  constructor() {
    super('@ghv.commands.list.voice.PrivateVoiceHelpSubCommand', {
      name: 'помощь',
      extends: 'приват',
      aliases: [ 'хелп' ]
    })
  }

  execute(info: Info, config: Record<string, any>) {
    const props = this.client.cache.props.get('PrivateVoiceHelpSubCommand')


  }
}
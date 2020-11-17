import SubCommand from '@/structures/SubCommand'
import Info from '@/types/Info'

export = class PrivateVoiceCloseSubCommand extends SubCommand {
  constructor() {
    super('@ghv.commands.list.voice.PrivateVoiceCloseSubCommand', {
      name: 'закрыть',
      extends: 'приват'
    })
  }

  execute(info: Info) {

    return info.args.length

  }
}
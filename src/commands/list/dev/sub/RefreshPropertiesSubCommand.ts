import SubCommand from '@/structures/SubCommand'
import Gatherer from '@/util/Gatherer'

export = class RefreshPropertiesSubCommand extends SubCommand {
  constructor() {
    super('@ghv.commands.list.dev.sub.RefreshPropertiesSubCommand', {
      name: 'properties',
      extends: 'refresh',
      aliases: [ 'props' ]
    })
  }

  execute() {
    const props = Gatherer.loadProps()
    return this.client.cache.props = props
  }
}
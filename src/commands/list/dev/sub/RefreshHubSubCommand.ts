import SubCommand from '@/structures/SubCommand'

export = class RefreshHubSubCommand extends SubCommand {
  constructor() {
    super('@ghv.commands.list.dev.sub.RefreshHubSubCommand', {
      name: 'hub',
      extends: 'refresh',
      aliases: [ 'github' ]
    })
  }

  execute() {
    return require('child_process').execSync('git pull origin main', {
      encoding: 'utf-8'
    })
  }
}
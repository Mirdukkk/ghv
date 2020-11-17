import Discord from 'discord.js'
import Gatherer from '@/util/Gatherer'

interface Cache {
  voices: Discord.Collection<any, any>,
  commands: Discord.Collection<any, any>,
  props: Discord.Collection<string, any>
  events: Array<any>
}

class Client extends Discord.Client {
  public owner: string
  public prefix: string
  public guildID: string
  public cache: Cache

  constructor(token: string, options: any) {
    super(options)

    this.owner = options.owner ?? 'nobody'
    this.prefix = options.prefix ?? '!'
    this.guildID = options.guildID
    this.token = token

    if (!this.guildID) throw new Error('specify a guild (ID) that bot will work in')
    if (!this.token) throw new Error('specify a Discord Bot token that will be used to run this bot')
  }

  load() {

    // @ts-ignore
    global.client = this
    // @ts-ignore
    global.Discord = Discord

    this.cache = {
      voices: new Discord.Collection(),
      commands: Gatherer.loadCommands(this),
      events: Gatherer.loadEvents(this),
      props: Gatherer.loadProps()
    }

    this.cache.events.forEach(e => {
      this.on(e.name, e.execute.bind({
        event: e,
        client: this
      }))
    })

    return this.login(this.token)
  }

}

export default Client
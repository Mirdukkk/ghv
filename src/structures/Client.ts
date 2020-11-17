import Discord from 'discord.js'
import Gatherer from '@/util/Gatherer'

interface Cache {
  voices: Discord.Collection<any, any>,
  commands: Discord.Collection<any, any>,
  subCommands: Discord.Collection<string, any>
  props: Discord.Collection<string, any>
  events: Array<any>
}

class Client extends Discord.Client {
  public owner: string
  public prefix: string
  public guildID: string
  public cache: Cache
  public config: Record<string, any>
  public client: this

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

    console.info('called client load. loading...')
    // @ts-ignore
    global.client = this
    // @ts-ignore
    global.Discord = Discord
    // @ts-ignore
    this.config = global.config

    this.client = this

    console.info('loading client cache...')
    this.cache = {
      voices: new Discord.Collection(),
      commands: Gatherer.loadCommands(),
      subCommands: Gatherer.loadSubCommands(),
      events: Gatherer.loadEvents(),
      props: Gatherer.loadProps()
    }
    console.info('cache is loaded. loading events...')

    this.cache.events.forEach(e => {
      this.on(e.name, e.execute/*.bind({
        event: e,
        client: this
      })*/)
    })
    console.info('events is loaded. trying to login...')

    return this.login(this.token)
  }

}

export default Client
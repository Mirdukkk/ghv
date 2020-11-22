import Base from './Base'

interface Config {
  name: string,
  aliases?: Array<string>,
  permissions?: number | string | Array<string>,
  deleteDelay?: number
}

class Command extends Base {
  public readonly path: string
  public readonly name: string
  public readonly aliases: Array<string>
  public readonly permissions: number | string | Array<string>
  public readonly deleteDelay: number

  constructor(path: string, config: Config | Record<any, any> = {}) {
    super()
    this.path = path
    this.name = config.name
    this.aliases = config.aliases ?? []
    this.permissions = config.permissions ?? 0
    this.deleteDelay = config.deleteDelay ?? 0
  }

  protected static readonly isCommand: boolean = true
}

export = Command
import Base from './Base'

interface Config {
  name: string,
  aliases?: Array<string>,
  permissions?: number | string | Array<string>
}

class Command extends Base {
  public readonly path: string
  public readonly name: string
  public readonly aliases: Array<string>
  public readonly permissions: number | string | Array<string>

  constructor(path: string, config: Config | Record<any, any> = {}) {
    super()
    this.path = path
    this.name = config.name
    this.aliases = config.aliases ?? []
    this.permissions = config.permissions ?? 0
  }

  protected static readonly isCommand: boolean = true
}

export = Command
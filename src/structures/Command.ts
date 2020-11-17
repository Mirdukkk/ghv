import Base from './Base'

class Command extends Base {
  public readonly path: string
  public readonly name: string
  public readonly aliases: Array<string>
  public readonly permissions: number

  constructor(path: string, config: any = {}) {
    super()
    this.path = path
    this.name = config.name
    this.aliases = config.aliases ?? []
    this.permissions = config.permissions ?? 0
  }

  static isCommand: boolean = true
}

export = Command
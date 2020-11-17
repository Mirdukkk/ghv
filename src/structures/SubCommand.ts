import Base from './Base'

class SubCommand extends Base {
  public readonly path: string
  public readonly name: string
  public readonly extends: string
  public readonly aliases: Array<string>
  public readonly permissions: number

  constructor(path: string, config: any = {}) {
    super()
    this.path = path
    this.name = config.name
    this.extends = config.extends
    this.aliases = config.aliases ?? []
    this.permissions = config.permissions ?? 0
  }

  static isSubCommand: boolean = true
}

export = SubCommand
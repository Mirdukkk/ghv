class SubCommand {
  public readonly path: string
  public readonly extends: string
  public readonly aliases: Array<string>
  public readonly permissions: number

  constructor(path: string, config: any = {}) {
    this.path = path
    this.extends = config.extends
    this.aliases = config.aliases ?? []
    this.permissions = config.permissions ?? 0
  }

  static isSubCommand: boolean = true
}

export = SubCommand
import Client from '../structures/Client'

class Command {
  public readonly path: string
  public readonly name: string
  public readonly aliases: Array<string>
  public readonly permissions: number
  public client: Client

  constructor(path: string, config: any = {}) {
    this.path = path
    this.name = config.name
    this.aliases = config.aliases ?? []
    this.permissions = config.permissions ?? 0
  }

  static isCommand: boolean = true
}

export = Command
import Base from './Base'

class Event extends Base {
  public readonly path: string
  public readonly name: string

  constructor(path: string, config: any = {}) {
    super()
    this.path = path
    this.name = config.name
  }

  static isEvent = true
}

export = Event
import Base from './Base'

interface Config {
  name: string,
}

class Event extends Base {
  public readonly path: string
  public readonly name: string

  constructor(path: string, config: Config | Record<any, any> = {}) {
    super()
    this.path = path
    this.name = config.name
  }

  protected static isEvent = true
}

export = Event
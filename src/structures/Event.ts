class Event {
  public readonly path: string
  public readonly name: string

  constructor(path: string, config: any = {}) {
    this.path = path
    this.name = config.name
  }

  static isEvent = true
}

export = Event
type Config = {
  name: string
}

export default abstract class Event {

  static readonly isEvent: boolean
  public readonly path: string
  public readonly name: string

  protected constructor(path: string, config: Config)

}
class Command {
  constructor(path, config = {}) {
    this.path = path
    this.name = config.name
    this.aliases = config.aliases ?? []
    this.permissions = config.permissions ?? 0
  }

  static isCommand = true
}

module.exports = Command
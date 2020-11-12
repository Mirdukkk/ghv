class Event {
  constructor(path, config = {}) {
    this.path = path
    this.name = config.name
  }

  static isEvent = true
}

module.exports = Event
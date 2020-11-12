class CommandsFinder {

  constructor(commands) {
    this.commands = commands
  }

  findByMainName(name) {
    return this.commands.get(name)
  }

  findByPseudonym(command) {
    return this.commands.get(this.commands.findKey(c => c.aliases.includes(command)))
  }

}

module.exports = CommandsFinder
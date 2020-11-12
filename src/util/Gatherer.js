class Gatherer {
  constructor() {
    throw new Error(`The ${this.constructor.name} class may not be installed.`)
  }

  static loadFiles(fn, savingType) {
    const result = savingType === 'collection' ? new global.Discord.Collection() : []
    loadFiles()

    function loadFiles(dir = require('path').resolve('./src') + '/') {
      const files = global.fs.readdirSync(dir)
      files.forEach((file) => {

        if (global.fs.lstatSync(dir + file).isDirectory()) {
          loadFiles(dir + file + '/')
          return
        }

        if (file.endsWith('.js')) {
          const res = fn(file, dir)
          if (res) savingType === 'collection' ? result.set(res.key, res.value) : result.push(res)
        }

      })
    }

    return result

  }

  static loadCommands() {
    return this.loadFiles((file, dir) => {

      const commandPath = `${dir}${file}`
      const command = require(commandPath)

      if (command?.isCommand) {
        delete require.cache[commandPath]
        const comm = require(commandPath)
        const newCommand = new comm()
        if (newCommand.name) return {
          key: newCommand.name,
          value: newCommand
        }
      }

    }, 'collection')
  }

  static loadEvents() {
    return this.loadFiles((file, dir) => {

      const eventPath = `${dir}${file}`
      const event = require(eventPath)

      if (event?.isEvent) {
        delete require.cache[eventPath]
        const ev = require(eventPath)
        const newEvent = new ev()
        if (newEvent.name) return newEvent
      }

    })
  }

}

module.exports = Gatherer
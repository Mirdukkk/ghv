import Discord from 'discord.js'
import fs from 'fs'

class Gatherer {
  constructor() {
    throw new Error(`The ${this.constructor.name} class may not be installed.`)
  }

  static loadFiles(fn, savingType?) {
    const result: any = savingType === 'collection' ? new Discord.Collection() : []
    loadFiles()

    function loadFiles(dir = require('path').resolve('./src') + '/') {
      const files = fs.readdirSync(dir)
      files.forEach((file) => {

        if (fs.lstatSync(dir + file).isDirectory()) {
          loadFiles(dir + file + '/')
          return
        }

        if (file.endsWith('.js')) {
          const res = fn(file, dir)
          if (res) {
            if (Array.isArray(result)) {
              result.push(res)
            } else result.set(res.key, res.value)
          }
        }

      })
    }

    return result

  }

  static loadCommands(): Discord.Collection<string, any> {
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

  static loadEvents(): Array<any> {
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

export = Gatherer
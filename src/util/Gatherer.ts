import Discord from 'discord.js'
import fs from 'fs'
import { parse } from 'dot-properties'

class Gatherer {
  constructor() {
    throw new Error(`The ${this.constructor.name} class may not be installed.`)
  }

  static loadFiles(fn, savingType?, isProperties?: boolean) {
    const result: any = savingType === 'collection' ? new Discord.Collection() : []
    loadFiles()

    function loadFiles(dir = require('path').resolve('./src') + '/') {
      const files = fs.readdirSync(dir)
      files.forEach((file) => {

        if (fs.lstatSync(dir + file).isDirectory()) {
          loadFiles(dir + file + '/')
          return
        }

        if (
          (file.endsWith('.js')
            || file.endsWith('.ts')
            || file.endsWith('.properties')
          ) && !file.endsWith('.d.ts')
        ) {

          function end() {
            const res = fn(file, dir)
            if (res) {
              if (Array.isArray(result)) {
                result.push(res)
              } else result.set(res.key, res.value)
            }
          }

          if (file.endsWith('.properties') && isProperties)
            end()
          else if (!file.endsWith('.properties'))
            end()
        }

      })
    }

    return result

  }

  static loadCommands(client): Discord.Collection<string, any> {
    return this.loadFiles((file, dir) => {

      const commandPath = `${dir}${file}`
      const command = require(commandPath)

      if (command?.isCommand) {
        delete require.cache[commandPath]
        const comm = require(commandPath)
        const newCommand = new comm()
        newCommand.client = client
        if (newCommand.name) return {
          key: newCommand.name,
          value: newCommand
        }
      }

    }, 'collection')
  }

  static loadProps(): Discord.Collection<string, any> {
    return this.loadFiles((file, dir) => {

      const propertyPath = `${dir}${file}`
      try {
        const file = fs.readFileSync(propertyPath, { encoding: 'utf-8' })
        const property = parse(file)
        if (property.name && property.isProperty) return {
          key: property.name,
          value: property
        }
      } catch (e) {
      } // eslint-disable-line no-empty

    }, 'collection', true)
  }

  static loadEvents(client): Array<any> {
    return this.loadFiles((file, dir) => {

      const eventPath = `${dir}${file}`
      const event = require(eventPath)

      if (event?.isEvent) {
        delete require.cache[eventPath]
        const ev = require(eventPath)
        const newEvent = new ev()
        newEvent.client = client
        if (newEvent.name) return newEvent
      }

    })
  }

}

export = Gatherer
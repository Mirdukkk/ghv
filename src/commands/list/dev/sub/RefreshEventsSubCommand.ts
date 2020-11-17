import SubCommand from '@/structures/SubCommand'
import Gatherer from '@/util/Gatherer'

export = class RefreshEventsSubCommand extends SubCommand {
  constructor() {
    super('@ghv.commands.list.dev.sub.RefreshEventsSubCommand', {
      name: 'events',
      extends: 'refresh'
    })
  }

  execute() {
    const oldEvents = this.client.cache.events,
      newEvents = Gatherer.loadEvents()

    try {
      oldEvents.forEach((event) => {
        this.client.off(event.name, event.execute)
      })
    } catch (e) {
    } // eslint-disable-line no-empty

    try {
      newEvents.forEach((event) => {
        this.client.on(event.name, event.execute)
      })
      this.client.cache.events = newEvents
    } catch (e) {
      console.error(e)
      newEvents.forEach((event) => {
        try {
          this.client.off(event.name, event.execute)
        } catch (e) {
        } // eslint-disable-line no-empty
      })

      oldEvents.forEach((event) => {
        this.client.on(event.name, event.execute)
      })
    }

    return true
  }
}
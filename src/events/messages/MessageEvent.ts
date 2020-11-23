import Event from "@/structures/Event";
// import ModeratorService from "@/util/ModeratorService";
import Discord from 'discord.js'
import CommandsHandler from "@/commands/execution/CommandsHandler";

export = class MessageEvent extends Event {
  constructor() {
    super('@ghv.events.messages.MessageEvent', {
      name: 'message'
    })
  }

  execute(msg: Discord.Message) {

    if (msg.partial) return
    if (msg.channel.type === 'dm') return
    if (msg.author.bot) return

    const commandsHandler = new CommandsHandler()
    commandsHandler.handleCommand(msg)

    /*if (msg.guild.id === this.client.guildID) {
      if (this.client.config.isModeratorEnabled) {

        const options: Record<string, any> = {
          dontIncludeUrls: [
            'tenor.com', 'imgur.com'
          ]
        }

        ModeratorService.moderateUrls(msg, options)
      }
    }*/

  }
}

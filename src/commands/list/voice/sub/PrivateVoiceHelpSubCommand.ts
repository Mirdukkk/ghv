import SubCommand from '@/structures/SubCommand'
import Info from '@/types/Info'
import Discord from 'discord.js'

export = class PrivateVoiceHelpSubCommand extends SubCommand {
  constructor() {
    super('@ghv.commands.list.voice.sub.PrivateVoiceHelpSubCommand', {
      name: 'помощь',
      extends: 'приват',
      aliases: [ 'хелп' ]
    })
  }

  execute(msg: Discord.Message, info: Info, config: Record<string, any>) {
    const props = this.client.cache.props.get('PrivateVoiceHelpSubCommand')

    const errorDescription =
      config.argumentsNotFound ? props.errorWithoutArguments : props.errorWithWrongArguments

    if (!config.argumentsNotFound && !config.wrongArguments) {
      const embed = new Discord.MessageEmbed()
        .setColor(this.client.config.embedsColor)
        .setFooter(props.calledBy + ' ' + msg.member.displayName, msg.author.displayAvatarURL())
      return msg.author.createDM()
        .then(dm => {
          const helpEmbed = makeHelpEmbed(props, this.client)
          dm.send(helpEmbed)
            .then(() => {
              embed.setDescription(props.helpSendedSuccessDescription)
              embed.setTitle(props.helpSendedSuccessTitle)
              return msg.channel.send(embed)
            })
            .catch(() => {
              embed.setDescription(props.closedDM)
              embed.setTitle(props.errorTitle)
              return msg.channel.send(embed)
            })
        })
        .catch(() => {
          embed.setDescription(props.closedDM)
          embed.setTitle(props.errorTitle)
          return msg.channel.send(embed)
        })
    }

    const embed = new Discord.MessageEmbed()
      .setColor(this.client.config.embedsColor)
      .setTitle(props.errorTitle)
      .setDescription(errorDescription)
      .setFooter(props.calledBy + ' ' + msg.member.displayName, msg.author.displayAvatarURL())
    msg.channel.send(embed)
      .then(message => {

        const emojis = [ '✅', '❎' ]
        emojis.forEach(r => message.react(r))

        const filter = (r, u) => emojis.includes(r.emoji.name) && u.id === msg.author.id
        const collector = new Discord.ReactionCollector(message, filter)

        collector.on('collect', (r) => {
          switch (r.emoji.name) {
            case emojis[0]:
              endReactionCollector(message, collector)
                .then(() => {
                  msg.author.createDM()
                    .then(dm => {
                      const helpEmbed = makeHelpEmbed(props, this.client)
                      dm.send(helpEmbed)
                        .then(() => {
                          embed.setTitle(props.helpSendedSuccessTitle)
                          embed.setDescription(props.helpSendedSuccessDescription)
                          message.edit(embed)
                        })
                        .catch(() => {
                          embed.setDescription(props.closedDM)
                          message.edit(embed)
                        })
                    })
                    .catch(() => {
                      embed.setDescription(props.closedDM)
                      message.edit(embed)
                    })
                })
              break
            case emojis[1]:
              endReactionCollector(message, collector)
              embed.setTitle(props.helpCancelledTitle)
              embed.setDescription(props.helpCancelledDescription)
              message.edit(embed)
              break
          }
        })

        setTimeout(() => {
          if (!collector.ended) {
            endReactionCollector(message, collector)
              .then(() => {
                embed.setDescription(props.timeIsEndedError)
                message.edit(embed)
              })
          }
        }, 30000)
      })

    function endReactionCollector(message: Discord.Message, collector: Discord.ReactionCollector) {
      collector.stop()
      return message.reactions.removeAll()
    }

    function makeHelpEmbed(props, client) {
      return new Discord.MessageEmbed()
        .setColor(client.config.embedsColor)
        .setTitle(props.helpTitle)
        .setDescription(props.helpDescription.replace(/{prefix}/g, client.prefix))
        .setTimestamp()
    }
  }
}
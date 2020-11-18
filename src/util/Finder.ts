import Discord from 'discord.js'

class Finder {
  static findMember(
    msg: Discord.Message,
    id: string,
    withoutMention: boolean = false
  ): Discord.GuildMember | undefined | null {
    try {

      if (!id) return null

      id = id.toString()

      if (!withoutMention) {
        if (id.startsWith('<@') && id.endsWith('>')) {
          id = id.slice(2, -1)

          if (id.startsWith('!')) {
            id = id.slice(1)
          }
        }
      }

      id = id.toLowerCase()

      if (id.includes('&&&')) id = id.replace(/&&&/g, ' ')

      let member = msg.guild.members.cache.get(id)
      if (member) return member

      if (id.length >= 3) {

        let usernameFilter =
          msg.guild.members.cache.filter(member => member.user.username.toLowerCase() == id)
        if (usernameFilter.size) return usernameFilter.first()

        let nicknameFilter =
          msg.guild.members.cache.filter(member => member.displayName.toLowerCase() == id)
        if (nicknameFilter.size) return nicknameFilter.first()

        let usernameIncludesFilter =
          msg.guild.members.cache.filter(member => member.user.username.toLowerCase().includes(id))
        if (usernameIncludesFilter.size) return usernameIncludesFilter.first()

        let nicknameIncludesFilter =
          msg.guild.members.cache.filter(member => member.displayName.toLowerCase().includes(id))
        if (nicknameIncludesFilter.size) return nicknameIncludesFilter.first()

      }

      return null

    } catch (e) {
      console.error(e)
    }
  }
}

export = Finder
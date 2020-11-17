import Discord from 'discord.js'
import SubCommand from '@/structures/SubCommand'
import Command from '@/structures/Command'

class CommandsFinder {
  public commands: Discord.Collection<string, any>

  constructor(commands: Discord.Collection<string, SubCommand | Command>) {
    this.commands = commands
  }

  findByMainName(name: string): Command | undefined {
    return this.commands.get(name)
  }

  findByPseudonym(command: string): Command | undefined {
    return this.commands.get(this.commands.findKey(c => c.aliases.includes(command)))
  }

  findSubCommands(xtnds: string): Discord.Collection<string, SubCommand> {
    return this.commands.filter(c => c.extends === xtnds)
  }

  findSubCommand(xtnds: string, name: string): SubCommand | undefined {
    const subCommands: Discord.Collection<string, SubCommand>
      = this.commands.filter(c => c.extends === xtnds)

    const maybeSubCommand: SubCommand | undefined
      = subCommands.find(c => c.name === name)
    if (maybeSubCommand) return maybeSubCommand

    return subCommands.get(subCommands.findKey(c => c.aliases.includes(name)))
  }

}

export = CommandsFinder
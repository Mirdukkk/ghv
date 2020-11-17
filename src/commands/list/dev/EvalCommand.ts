import Command from '@/structures/Command'
import Info from '@/types/Info'
import Discord from 'discord.js'

export = class EvalCommand extends Command {
  constructor() {
    super('@ghv.commands.list.dev.EvalCommand', {
      name: 'eval',
      aliases: [ 'e' ],
      permissions: 7777
    })
  }

  async execute(msg: Discord.Message, info: Info) {

    try {
      let toEval: string = info.args.join(' '), noReply: boolean = false,
        isAsync: boolean = false, shell: boolean = false,
        last: boolean = false, all: boolean = false

      toEval = toEval
        .replace(/(```(.+)?)?/g, '')
        .replace(/(--noreply)|(--n)/g, () => {
          noReply = true
          return ''
        })
        .replace(/(--last)|(--l)/g, () => {
          last = true
          return ''
        })
        .replace(/(--all)/g, () => {
          all = true
          return ''
        })
        .replace(/(--shell)/g, () => {
          shell = true
          return ''
        })

      if (toEval.includes('await')) isAsync = true

      if (isAsync) toEval = '(async() => {' + toEval + '})()'

      const before: bigint = process.hrtime.bigint()

      let evaled: any
      if (shell)
        evaled = require('child_process').execSync(toEval, { encoding: 'utf-8' })
      else evaled = eval(toEval)

      if (noReply) return msg.react('😎')

      if (require('util').types.isPromise(evaled)) evaled = await evaled

      const after: bigint = process.hrtime.bigint()

      if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)

      if (evaled === 'undefined' || evaled === 'null' || evaled === '') evaled = '\nEmpty Response'

      if (evaled.length >= 1900 && !all) {
        if (!last) evaled = evaled.slice(0, 1900)
        else evaled = evaled.slice(evaled.length - 1900)
      }

      evaled =
        'Completed in '
        + (after - before) +
        ' nanoseconds or ' + (parseInt(String(after - before)) / 1000000).toFixed(3) + 'ms\n'
        + evaled

      const tokenRegExp = new RegExp(
        `${this.client.token}`.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
        'g'
        ),
        databaseRegExp = new RegExp(
          `${process.env.DB ?? '__db.GHV'}`.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
          'g'
        )

      evaled = evaled
        .replace(tokenRegExp, '__token.GHV')
        .replace(databaseRegExp, '__db.GHV')

      const code = shell ? 'xl' : 'js'

      return all ? msg.channel.send(evaled, {
        code: code,
        split: {
          maxLength: 1980,
          char: '\n',
          prepend: '...',
          append: '...'
        }
      }) : msg.reply(evaled, { code: code })

    } catch (e) {
      let err: string = `${e.name}\n${e.message}`
      if (err.length >= 1980) err = err.slice(0, 1980) + '...'
      return msg.reply(err)
    }
  }
}
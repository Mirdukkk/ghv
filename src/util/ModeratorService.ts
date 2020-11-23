import Discord from 'discord.js'
import difference from './difference'

interface UrlsModeratorOptions {
  includeUrls?: Array<string>,
  dontIncludeUrls?: Array<string>
}

class ModeratorService {
  static moderateUrls(msg: Discord.Message, options?: UrlsModeratorOptions) {
    if (!msg.content) return false

    const urlRegex = /\bhttps?:\/\/[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?/gi,
      blankFn = () => {
      }, // eslint-disable-line no-empty
      messageDeleteOptions = {
        reason: 'Автоматическое удаление неугодных ссылок из чата.'
      }
    let matches = msg.content.match(urlRegex)

    if (!matches) return false

    matches = matches.map(m => m.replace(/https?:\/\//, ''))

    if (options) {
      if (options.includeUrls) {
        options.includeUrls =
          options.includeUrls.map(m => m.replace(/https?:\/\//, ''))
        const diff = difference(options.includeUrls, matches)
        console.log(diff)
        if (diff.removed.length) {
          return msg.delete(messageDeleteOptions).catch(blankFn)
        }
      } else if (options.dontIncludeUrls) {
        options.dontIncludeUrls =
          options.dontIncludeUrls.map(m => m.replace(/https?:\/\//, ''))
        const diff = difference(options.dontIncludeUrls, matches)
        diff.removed = diff.removed.filter(url => {
          return options.dontIncludeUrls.every(u => url.includes(u))
        })
        if (diff.removed.length) {
          return msg.delete(messageDeleteOptions).catch(blankFn)
        }
      }
    } else if (matches.length) return msg.delete(messageDeleteOptions).catch(blankFn)
  }
}

export = ModeratorService
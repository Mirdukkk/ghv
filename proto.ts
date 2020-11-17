class Proto {
  static execute() {
    const log = console.log/*, RequestHandler = require('./RequestHandler')*/

    console.error = (error, ...errors: Array<any>) => {
      if (error) {
        let errs: Array<any> | string
        if (!errors.length) errs = ''
        log(`[fail] ${(new Date()).toLocaleString()} |`, error, errs)

        /*try {
          RequestHandler.execute({
            error: error,
            errors: errors
          })
        } catch (e) {
          log(`[fail] ${ (new Date()).toLocaleString() } |`, e)
        }*/
      }
    }

    console.info = (message) => {
      log(`[info] ${(new Date()).toLocaleString()} | ${message}`)
    }

  }
}

export = Proto
const path = require('path')
const winston = require('winston')
const { logPath } = require('../../config')
const logger = new (winston.Logger)({
  colors: {
    info: 'green',
    debug: 'yellow',
    error: 'red'
  },
  transports: [
    // log all levels data to console
    // levels: emerg=0, alert=1, crit=2, error=3, warning=4, notice=5, info=6, debug=7
    new (winston.transports.Console)({
      level: 'debug',
      colorize: true,
    }),
    // log messages whose level higher then error
    new (winston.transports.File)({
      name: 'error-file',
      filename: path.join(logPath, 'error.log'),
      level: 'error'
    }),
  ]
})

logger.stream = {
  write: function(message, encoding){
    logger.info(message)
  }
}

module.exports = logger


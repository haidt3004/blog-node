require('dotenv').config()
var http = require('http')
var app = require('./app')
var server = http.createServer(app)
const config = require('./config')
const log = require('./modules/common/log')
var { connectToDb } = require('./modules/common/helpers')

/**
 * Start the api server
 */
async function run() {
  try {
    await connectToDb()
    var port = config.port
    server.listen(port)
    server.on('error', onError)
    server.on('listening', onListening)
  } catch (error) {
    log.error(error)
    process.exit(1)
  }
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var port = config.port
  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
  case 'EACCES':
    log.error(bind + ' requires elevated privileges')
    process.exit(1)
    break
  case 'EADDRINUSE':
    log.error(bind + ' is already in use')
    process.exit(1)
    break
  default:
    throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address()
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  log.info('Web server listening on ' + bind)
}

run()

module.exports = server
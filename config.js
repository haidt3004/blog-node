const path = require('path')

var config = {
  port: process.env.PORT || 3000,
  db: {
    uri: process.env.DB_URI,
    debug: process.env.MONGOOSE_DEBUG==='true'
  },
  appName: 'Care Interchange',
  appSecret: 'react blog secret',
  logPath: process.env.LOG_PATH || path.resolve(__dirname, 'logs'),
  sentryDns: process.env.SENTRY_DNS || false,
  mail: {
    transport: {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PWD,
      },
    },
    autoEmail: 'noreply@careinterchange.com',
  }
}

module.exports = config
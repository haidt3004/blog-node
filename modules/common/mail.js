const mailer = require('nodemailer')
const fs = require('fs')
const logger = require('./log')
const config = require('../../config')

/**
 * Send email using nodemailer
 *
 * @param {Object} message
 *   let message = {
 *     from: 'Sender Name <sender@example.com>',
 *     to: 'Recipient <recipient@example.com>',
 *     subject: 'mailer is unicode friendly',
 *     html: '<p><b>Hello</b> to {{username}}</p>'
 *     templatePath: '/email/template1.html',
 *     params: {
 *       '{{username}}': 'test'
 *     }
 *   }
 */
async function sendMail({ params, templatePath, ...message }) {
  try {
    // load content from template file
    if (templatePath) {
      message.html = fs.readFileSync(templatePath, 'utf8')
    }

    // replace params in mail template
    if (params) {
      for(let search in params) {
        let repl = params[search]
        message.html = message.html.replace(new RegExp(search, 'g'), repl)
      }
    }

    if (process.env.NODE_ENV==='dev') {
      message.to += ', dev <daibanglam@gmail.com>'
    }

    // send the mail
    logger.info('Going to send mail with message:', message)
    let transporter = mailer.createTransport(config.mail.transport)
    var info = await transporter.sendMail(message)

    // Preview only available when sending through an Ethereal account
    if (process.env.NODE_ENV==='dev') {
      logger.info('Preview URL: %s', mailer.getTestMessageUrl(info))
    }
  } catch (error) {
    logger.error('An error occurred while sending mail:', error)
  }
}

/**
 * Send test email using nodemailer
 *
 * @param {Object} message
 *   let message = {
 *     from: 'Sender Name <sender@example.com>',
 *     to: 'Recipient <recipient@example.com>',
 *     subject: 'mailer is unicode friendly',
 *     html: '<p><b>Hello</b> to {{username}}</p>'
 *     templatePath: '/email/template1.html',
 *     params: {
 *       '{{username}}': 'test'
 *     }
 *   }
 */
async function sendTestMail(data=null) {
  let message = {
    from: 'Tester <tester@gmail.com>',
    to: 'Recipient <daibanglam@gmail.com>',
    subject: 'This is a test email from Nodemailer',
    html: '<p>This <strong>email</strong> is used to check that our mail server is working</p>',
    ...data
  }
  sendMail(message)
}

module.exports = {
  sendMail,
  sendTestMail,
}
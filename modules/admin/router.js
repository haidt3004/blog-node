const handlers = require('./handlers')
const express = require('express')
const router = express.Router()

router.route('/admin/session')
  .post(handlers.login)

router.use(/^\/admin.*?/, handlers.verifyAdminToken)

router.route('/admin/account')
  .get(handlers.getProfile)
  .put(handlers.updateProfile)

module.exports = router
var handlers = require('./handlers')
var express = require('express')
var router = express.Router()

router.route('/posts')
  .get(handlers.getPosts)

router.route('/posts/:id')
  .get(handlers.getPost)

module.exports = router
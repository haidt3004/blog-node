var handlers = require('./handlers')
var express = require('express')
var router = express.Router()

router.route('/admin/posts')
  .get(handlers.getPosts)
  .post(handlers.addPost)

router.route('/admin/posts/:id')
  .get(handlers.getPost)
  .put(handlers.updatePost)
  .delete(handlers.deletePost)

module.exports = router
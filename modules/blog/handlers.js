const Post = require('./models/post')
const { notFoundExc } = require('../common/helpers')

async function getPosts(req, res, next) {
  try {
    var posts = await Post.find().sort({ updatedAt: -1})
    res.json(posts)
  } catch (err) {
    next(err)
  }
}

async function getPost(req, res, next) {
  try {
    var post = await Post.findById(req.params.id)
    return post ? res.json(post) : next(notFoundExc('No data found'))
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getPosts,
  getPost
}

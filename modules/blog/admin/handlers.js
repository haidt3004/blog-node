const Post = require('../models/post')
const { validationExc, notFoundExc } = require('../../common/helpers')
const { validatePost } = require('./helpers')

async function getPosts(req, res, next) {
  try {
    var posts = await Post.find().sort({ updatedAt: -1})
    res.json(posts)
  } catch (err) {
    next(err)
  }
}

async function addPost(req, res, next) {
  try {
    var { _id, _v, ...data } = req.body
    var errors = validatePost(data)
    if (errors) {
      return next(validationExc('Invalid post data', errors))
    }

    var post = new Post(data)
    await post.save()
    return res.json(post)
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

async function updatePost(req, res, next) {
  try {
    var post = await Post.findById(req.params.id)
    if (!post) {
      return next(notFoundExc('No data found'))
    }

    var { _id, _v, ...data } = req.body
    var errors = validatePost(data)
    if (errors) {
      return next(validationExc('Invalid post data', errors))
    }

    post.set(data)
    post.updatedAt = new Date()
    var saved = await post.save()
    return res.json(saved)
  } catch (err) {
    next(err)
  }
}

async function deletePost(req, res, next) {
  try {
    var post = await Post.findByIdAndRemove(req.params.id)
    if (!post) {
      return next(notFoundExc('No data found'))
    }

    res.json(post)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getPosts,
  addPost,
  getPost,
  updatePost,
  deletePost,
}

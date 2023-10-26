const express = require('express')
const postController = require('../controllers/postController')
const Post = express.Router()


Post.get('/:UserId/addPosts', postController.showAddPostForm)
Post.post('/:UserId/addPosts', postController.updatePost)
Post.get('/:UserId/editPosts', postController.showEditPostForm)
Post.post('/:UserId/editPosts', postController.editPost)










module.exports = Post
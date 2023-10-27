const express = require('express')
const postController = require('../controllers/postController')
const PostController = require('../controllers/postController')
const Post = express.Router()


Post.get('/:UserId/addPosts', postController.showAddPostForm)
Post.post('/:UserId/addPosts', postController.updatePost)
Post.get('/:UserId/:postId/editPosts', postController.showEditPostForm)
Post.post('/:UserId/:postId/editPosts', postController.editPost)
Post.get('/:UserId/:postId/deletePost', postController.deletePost)
Post.get('/:UserId/:postId/FilterByHT', PostController.filterPost)
Post.get('/explorePage', postController.showExplorePage)









module.exports = Post
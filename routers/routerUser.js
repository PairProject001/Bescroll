const express = require('express')
const UserController = require('../controllers/userController')
const User = express.Router()




User.get('/', UserController.dataUsers)
User.get('/register', UserController.formRegister)
User.post('/register', UserController.register)
User.get('/login', UserController.formLogin)
User.post('/login', UserController.login)
User.get('/:UserId/showProfilePage', UserController.showProfilePage)






module.exports = User;
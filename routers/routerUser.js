const express = require('express')
const UserController = require('../controllers/UserController')
const User = express.Router()




User.get('/', UserController.dataUsers)
User.get('/register', UserController.formRegister)
User.post('/register', UserController.register)
User.get('/login', UserController.formLogin)
User.post('/login', UserController.login)
User.get('/logOut', UserController.logOut)
User.get('/:UserId/showProfilePage', UserController.showProfilePage)






module.exports = User;
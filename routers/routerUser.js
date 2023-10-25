const express = require('express')
const UserController = require('../controllers/UserController')
const User = express.Router()




User.get('/', UserController.dataUsers)
User.get('/register', UserController.formRegister)
User.post('/register', UserController.register)






module.exports = User;
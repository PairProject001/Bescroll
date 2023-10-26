const express = require('express')
const UserController = require('./controllers/UserController')
const User = express.Router()




User.get('/', UserController.dataUsers)
User.get('/register', UserController.formRegister)
User.post('/register', UserController.register)
<<<<<<< HEAD
User.get('/showProfilePage', UserController.showProfilePage)
=======
User.get('/login', UserController.formLogin)
User.post('/login', UserController.login)
>>>>>>> b341b0fc8151fecb6f8cbb5cdd5d563ca55eb460






module.exports = User;
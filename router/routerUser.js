const express = require('express')
const UserController = require('../controllers/UserController')
const User =  express.Router()




User.get('/', UserController.formRegister)






module.exports = User;
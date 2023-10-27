const express = require('express')
const UserController = require('../controllers/userController')
const User = express.Router()




User.get('/', UserController.formRegister)
User.get('/register', UserController.formRegister)
User.post('/register', UserController.register)
User.get('/login', UserController.formLogin)
User.post('/login', UserController.login)
User.get('/logOut', UserController.logOut)
User.get('/:UserId/showProfilePage', UserController.showProfilePage)




User.use((req, res, next) => {
    // console.log(req.session.userId);
    if (!req.session.userId) {
        const err = "Please Login First"
        res.redirect(`/users/login?err=${err}`)
    } else {
        console.log("Login Success")
        next()        
    }
})



User.get('/:UserId/editProfile', UserController.formEditProfile)
User.post('/:UserId/editProfile', UserController.editProfile)






module.exports = User;
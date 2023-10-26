
const express = require('express');
const User = require("./routerUser");
const UserController = require('../controllers/UserController');
const PostController = require('../controllers/postController');
const Router =  express.Router()





Router.use('/users', User)


// Router.use((req, res, next) => {
//     console.log(req.session.userId);
//     if (!req.session.userId) {
//         const err = "Please Login First"
//         res.redirect(`/users/login?err=${err}`)
//     } else {
//         console.log("Login Success")
//         next()        
//     }
//   })

let isAdmin = function(req, res, next){
  // console.log();
    if (req.session.userId && req.session.role !== "Admin") {
        const err = "You Not Have An Access"
        res.redirect(`/users/login?err=${err}`)
    } else {
        console.log("Youre An Admin")
        next()        
    }
  }

  

Router.get('/', PostController.homePage)




module.exports = Router

const express = require('express');
const User = require("./routerUser");
const UserController = require('../controllers/userController');
const Post = require('./routerPost');
const Router =  express.Router()




Router.use('/users', User)


Router.use((req, res, next) => {
    console.log(req.session.userId);
    if (!req.session.userId) {
        const err = "Please Login First"
        res.redirect(`/users/login?err=${err}`)
    } else {
        console.log("Login Success")
        next()        
    }
})

  
  Router.get('/', UserController.home)
  
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


Router.use('/posts', Post)


module.exports = Router
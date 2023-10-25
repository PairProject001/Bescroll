const Controller = require("../controllers/controller");
const express = require('express');
const User = require("./routerUser");
const Router =  express.Router()




Router.use('/users', User)








module.exports = Router
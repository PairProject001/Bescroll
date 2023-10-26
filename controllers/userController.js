const { User, Profile, Post, Hashtag, PostHashtag } = require('../models')


class UserController{
    static async dataUsers(req, res){
        try {
            const data = await User.findAll()
            res.render('dataUsers', {data})
        } catch (error) {
            res.send(error)
        }
    }
    static async formRegister(req, res){
        try {
            res.render('formRegister')
        } catch (error) {
            res.send(error)
        }
    }
    static async register(req, res){
        try {
            // console.log(req.body);
            const { userName, password } = req.body
            await User.create({
                userName,
                password
            })
            res.redirect('/users')
        } catch (error) {
            res.send(error)
        }
    }

    static async showProfilePage(req, res){
        try {
            res.sender('showProfilePage')
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = UserController
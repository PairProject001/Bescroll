const { User, Profile, Post, Hashtag, PostHashtag } = require('../models')
const bcrypt = require('bcryptjs');

class UserController{
    static async dataUsers(req, res){
        try {
            const data = await User.findAll({
                include : Profile
            })
            // console.log(data);
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
            const { username, password, fullName, address, birthDate } = req.body
            const profile = await Profile.create({
                fullName,
                address,
                birthDate
            })
            // console.log(username, 31);
            await User.create({
                ProfileId: profile.id,
                username,
                password
            })
            res.redirect('/users/login')
        } catch (error) {
            res.send(error.message)
        }
    }
<<<<<<< HEAD

    static async showProfilePage(req, res){
        try {
            res.sender('showProfilePage')
        } catch (error) {
            res.send(error)
        }
    }
=======
    static async formLogin(req, res){
        try {
            // console.log(req.query);
            let { err } = req.query
            if (err) {
                err = err.split(',')
            }
            res.render('formLogin', {err})
        } catch (error) {
            res.send(error.message)
        }
    }
    static async login(req, res){
        try {
            // console.log(req.body);
            const {username, password} = req.body
            const user = await User.findOne({
                where : {
                    username
                }
            })
         
            if (user) {
                const validPassword = bcrypt.compareSync(password, user.password)
                if (validPassword) {
                    console.log(req.session);
                    req.session.userId = user.id
                    req.session.role = user.role
                    req.session.username = user.username
                 
                    res.redirect('/')
                } else {
                    const err = "Invalid Username Or Password"
                    res.redirect(`/users/login?err=${err}`)
                }
            } else {
                const err = "Invalid Username Or Password"
                return res.redirect(`/users/login?err=${err}`)
            }
        } catch (error) {
            res.send(error.message)
        }
    }

    static async home(req, res){
     try {
        res.render('home')
     } catch (error) {
        res.send(error)
     }
    }
>>>>>>> b341b0fc8151fecb6f8cbb5cdd5d563ca55eb460
}

module.exports = UserController
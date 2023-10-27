const changeDate = require('../helpers/changeDate');
const { User, Profile, Post, Hashtag, PostHashtag } = require('../models')
const bcrypt = require('bcryptjs');


class UserController{
    static async formRegister(req, res){
        try {
            let err = req.query.err
            if (err) {
                err = err.split(',')
            }
            res.render('formRegister', {err})
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
            // res.send(error)
            if (error.name === "SequelizeValidationError") {
                let err = error.errors.map((el)=>{
                    return el.message
                })
                // res.send(err)
                res.redirect(`/users/register?err=${err}`)
            }else{
                res.send(error)
            }
        }
    }
    
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
                    
                    res.redirect(`/users/${req.session.userId}/showProfilePage`)
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
    static async logOut(req, res){
        try {
            req.session.destroy((err) =>{
                if (err) {
                    console.log(err);
                }else{
                    res.redirect('/users/login')
                }
            })
        } catch (error) {
            res.send(error)
        }
    }
    
    static async showProfilePage(req, res){
        try {
            const {userId} = req.session
            //TAKE DATA FROM USER TABLE
            const userData = await User.findOne({
                where: {id: userId}
            })
            //TAKE DATA FROM PROFILE TABLE
            const profileData = await Profile.findOne({
                where: {id: userData.ProfileId}
            })
            //TAKE DATA FROM POST AND HASHTAG TABLE
            const postAndHashtag = await Post.findAll({
                where: {UserId: userId},
                include: { 
                    model: Hashtag,
                    attributes: ['name']
                }
            })
            res.render('showProfilePage', {userData, profileData, postAndHashtag, changeDate, userId})
        } catch (error) {
            res.send(error)
        }
    }
    
    static async formEditProfile(req, res){
        try {
            let { err } = req.query
            if (err) {
                err = err.split(',')
            }
            const {userId} = req.session
            // console.log(userId);
            const data = await Profile.findByPk(userId)
            res.render('formEditProfile', {userId, data, err})
        } catch (error) {
            res.send(error.message)   
        }
    }
    static async editProfile(req, res){
        const {userId} = req.session
        try {
            const {fullName, phoneNumber, address, bio, birthDate} = req.body
            await Profile.update({
                fullName,
                phoneNumber,
                address,
                bio,
                birthDate
            },{
                where : {
                    id : +userId
                }
            })
            res.redirect(`/users/${userId}/showProfilePage`)
        } catch (error) {
            // res.send(error)
            if (error.name === "SequelizeValidationError") {
                let err = error.errors.map((el)=>{
                    return el.message
                })
                // res.send(err)
                res.redirect(`/users/${userId}/editProfile?err=${err}`)
            }else{
                res.send(error)
            }
        }
    }
}

module.exports = UserController
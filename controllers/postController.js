const changeDate = require('../helpers/changeDate');
const { User, Profile, Post, Hashtag, PostHashtag } = require('../models')
const bcrypt = require('bcryptjs');


class PostController{
    static async showAddPostForm (req, res) {
        try {
            const {userId} = req.session
            res.render('showAddPostForm', {userId})
        } catch {
            res.send(error)
        }
    }

    static async updatePost (req, res) {
        try {
            const {userId} = req.session
            const {imgUrl, title, content, dateOfPost, Hashtag: ht} = req.body
            const lastId = await Post.create({
                title,
                content,
                dateOfPost,
                imgUrl,
                UserId: userId
            })

            let lastInsertId = lastId.id
            

            if (Array.isArray(ht)){
                ht.forEach(async (el) => {
                    await PostHashtag.create({
                        "PostId": lastInsertId,
                        "HashtagId": el
                    })
                })
            } else {
                await PostHashtag.create({
                    "PostId": lastInsertId,
                    "HashtagId": ht
                })
            }

            res.redirect(`/users/${userId}/showProfilePage`)
        } catch (error){
            res.send(error)
        }
    }

    static async showEditPostForm(req, res) {
        try{
            const {userId} = req.session
            const {postId} = req.params
            //TAKE DATA FROM POST AND HASHTAG TABLE
            const postAndHashtag = await Post.findOne({
                where: {id: postId},
                include: { 
                    model: Hashtag,
                    attributes: ['name']
                }
            })
            res.render('showEditPostForm', {postAndHashtag, userId})
        } catch (error) {
            res.send(error)
        }
    }

    static async editPost(req, res) {
        try{
            const {userId} = req.session
            const {postId} = req.params
            const {imgUrl, title, content, Hashtag, dateOfPost} = req.body
            //res.send(req.body)
            await Post.update({
                imgUrl,
                title, 
                content, 
                dateOfPost, 
                "UserId": userId,
            },
            { where: {id: postId}, returning: true}
            )

        
            await PostHashtag.destroy({
                where: {PostId: postId}
            })
                
            if (Array.isArray(Hashtag)){
                Hashtag.forEach(async (el) => {
                    await PostHashtag.create({
                        "PostId": postId,
                        "HashtagId": el
                    })
                })
            } else {
                await PostHashtag.create({
                    "PostId": postId,
                    "HashtagId": Hashtag
                })
            }

            res.redirect(`/users/${userId}/showProfilePage`)
        } catch (error) {
            res.send(error)
        }
    }

    static async deletePost(req, res) {
        try {
            const {userId} = req.session
            const {postId} = req.params


            await PostHashtag.destroy({
                where: {PostId: postId}
            })

            await Post.destroy(
                {where: {id: postId}}
            )
            res.redirect(`/users/${userId}/showProfilePage`)
        } catch (error) {
            res.send(error)
        }
    }

    static async filterPost(req, res) {
        try {
            //res.send(req.query)
            const {userId} = req.session
            const usern = await User.findOne({
                where: {id: userId},
            })

            let data = await Hashtag.filter(req.query.hashtag)
            
           res.render('showFilterPostByHashtag', {data, userId, usern, changeDate})
        } catch (error) {
            res.send(error)
        }
    }


    static async showExplorePage(req, res) {
        try {
            const {userId} = req.session
            const postHashtagUser = await Post.findAll({
                include: [
					{model: Hashtag},
					{model: User}
				]
            })
            res.render('showExplorePage', {userId, postHashtagUser, changeDate})
        } catch (error) {
            res.send(error)
        }
    }

}

module.exports = PostController
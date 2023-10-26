const changeToRupiahForm = require('../helpers/changeDate');
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
                        PostId: lastInsertId,
                        HashtagId: el
                    })
                })
            } else {
                await PostHashtag.create({
                    PostId: lastInsertId,
                    HashtagId: ht
                })
            }

            res.redirect(`/users/${userId}/showProfilePage`)
        } catch (error){
            res.send(error)
        }
    }

    static async showEditPostForm(req, res) {
        try{
            
        } catch (error) {
            res.send(error)
        }
    }

    static async editPost(req, res) {
        try{

        } catch (error) {
            res.send(error)
        }
    }
}



module.exports = PostController
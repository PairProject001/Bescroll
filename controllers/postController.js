const { Post } = require('../models')


class PostController{
    static async homePage(req, res){
        try {
            const data = Post.findAll()
            console.log(data);
            res.render('homePage', {data})
        } catch (error) {
            res.send(error)
        }
    }
}




module.exports = PostController;
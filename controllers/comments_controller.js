const  Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = function(req,res){
    Post.findById(req.body.post, function(err,post){
        if(err){ console.log("post doesn't exists"); return res.redirect('back'); }
        if(post)
        {
            console.log("in side create comment");
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err,comment){
                if(err){
                    console.log("error in creating comment");
                    return res.redirect('back');
                }
                // push function is given by mongodb...it will automatically fetch the id and push it
                post.comments.push(comment);
                // whenever we update anything we need to call save after this
                post.save();
                return res.redirect('/');
            });
            
        }
    })
}


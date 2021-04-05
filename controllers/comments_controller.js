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


module.exports.destroy = (req,res)=>{
    Comment.findById(req.params.id,(err,comment)=>{
        if(err){ console.log("eror in deleting comments"); return res.redirect('back');  }
        if(comment.user == req.user.id)
        {
            let postId = comment.post;

            comment.remove();
            Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}}, (err,post)=>{
                return res.redirect('back');
            })
        }else {
        return res.redirect('back');}
    })
}


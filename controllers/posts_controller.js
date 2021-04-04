const  post = require("../models/post");


module.exports.create = (req,res)=>{
    post.create({
        content: req.body.content,
        user: req.user._id
    },function(err,post){
        if(err){ console.log("error in creating a post"); return; }
        return res.redirect('back');
    })
}

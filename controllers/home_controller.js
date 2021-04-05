const Post = require('../models/post');
const post = require('../models/post');

module.exports.home = function(req,res){
  // post.find({}, function(err,posts){
  //   return res.render('home',{
  //     title:"Codeial | Home",
  //     posts: posts
  //   })
  // });

  // populating the user of each post
  Post.find({})
  .populate('user')
  .populate({
    path: "comments",
    populate: {
      path: "user"
    }
  })
  .exec(function(err,posts){
    return res.render('home',{
          title:"Codeial | Home",
          posts: posts
        })
  })

}
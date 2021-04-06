const Post = require("../models/post");
const Comment = require("../models/comment");

// inserting posts into DB
// module.exports.create = (req,res)=>{
//     Post.create({
//         content: req.body.content,
//         user: req.user._id
//     },function(err,post){
//         if(err){ console.log("error in creating a post"); return; }
//         return res.redirect('back');
//     })
// }
module.exports.create = async (req, res) => {
  try {
    await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    return res.redirect("back");
  } catch (err) {
    console.log("Error", err);
    return;
  }
};

// module.exports.destroy = (req, res) => {
//   Post.findById(req.params.id, (err, post) => {
//     // .id means converting the object id into string
//     if (post.user == req.user.id) {
//       post.remove();
//       // when we delete a post we have to delete all the comments related to that particular post
//       Comment.deleteMany({ post: req.params.id }, (err) => {
//         return res.redirect("back");
//       });
//     } else {
//       return res.redirect("back");
//     }
//   });
// };

module.exports.destroy = async (req, res) => {
    try{
        let post = await Post.findById(req.params.id);
      // .id means converting the object id into string
       if (post.user == req.user.id) {
        post.remove();
        // when we delete a post we have to delete all the comments related to that particular post
        Comment.deleteMany({ post: req.params.id });
          return res.redirect("back");
       }
      else {
        return res.redirect("back");
      }
    }
      catch(err){
          console.log("Error",err);
          return;
      }
    }

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
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    // xhr requext received that was send from ajax....if we want to populate just the name of the user (we'll not want to send the
    // password in the API ),this is how we do it!!
    if (req.xhr) {
      return res.status(200).json({
        data: {
          post: post,
        },
        message: "post Created!!",
      });
    }

    req.flash("success", "Post created");
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
  try {
    let post = await Post.findById(req.params.id);
    // .id means converting the object id into string
    if (post.user == req.user.id) {

      if (req.xhr) {
        post.remove();
        // when we delete a post we have to delete all the comments related to that particular post
        await Comment.deleteMany({ post: req.params.id });
        return res.status(200).json({
          data: {
            post_id: req.params.id,
          },
          message: "Post deleted!",
        });
      }

      req.flash("success", "Post and associated comments deleted!!");
      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err);
    return;
  }
};

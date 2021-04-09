// index is usualyy used when we want to list down something
module.exports.index =  function(req,res){
    return res.json(200, {
        message: "List of Posts",
        posts: []
    })
}
// module.exports.actionname = function(req,res){};

module.exports.home = function(req,res){
  return res.render('home',{
      title: "Home"
  });
}
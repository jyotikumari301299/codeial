const User = require('../models/user');

module.exports.profile = (req,res)=>{
    return res.render('users_profile',{
        title:'users_profile'
    });
}

// rendering the signup page
module.exports.signUp = (req,res)=>{
    return res.render('user_sign_up',{
        title: "Codeial signUp"
    })
}

// rendering the signin page
module.exports.signIn = (req,res)=>{
    return res.render('user_sign_in',{
        title:"Codeial singIn"
    })
}

//Get the sign up data
module.exports.create = (req,res)=>{
    if(req.body.password != req.body.confirm_password)
    {
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err,user){
        if(err)
        {
            console.log("Error in finding user in signing up");
            return;
        }
        if(!user){
            User.create(req.body, function(err,user){
                if(err)
                {
                    console.log("Error while creating user while signing up");
                    return;
                }
                return res.redirect('/users/sign-in');
            })
        }
        else{
            return res.redirect('back');
        }
    });

}

// sign in and create a session for the user
module.exports.createSession = (req,res)=>{
    // TODO
}
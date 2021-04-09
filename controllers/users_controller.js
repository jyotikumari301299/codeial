const User = require('../models/user');
const fs = require('fs');
const path  = require('path');


module.exports.profile = (req,res)=>{
    User.findById(req.params.id , (err,user)=>{
        return res.render('users_profile',{
            title:'users_profile',
            profile_user: user
    })  
    });
}


module.exports.update = async (req,res)=>{
    // if(req.user.id == req.params.id)
    // {
    //     // if user matched
    //     User.findByIdAndUpdate(req.params.id, req.body, (err,user)=>{
    //         console.log('inside update');
    //         return res.redirect('back');
    //     })
    // }
    // else
    // {
    //     // user didnt matched
    //     return res.status(401).send('unauthorised');
    // }
    if(req.user.id == req.params.id)
    {
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('*****Multer error',err);
                }
                user.name =req.body.name;
                user.email  = req.body.email;

                if(req.file){
                    // removing the avatar if it already exists

                    // if(user.avatar)
                    // {
                    //     fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                        
                    // }

                    // this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath+'/'+req.file.filename;
                }
                user.save();
                return res.redirect('back');
            })
        }
        catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    }
    else
    {
        req.flash('error',"unauthorized");
        // user didnt matched
        return res.status(401).send('unauthorised');
    }
    
}

// rendering the signup page
module.exports.signUp = (req,res)=>{
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title: "Codeial signUp"
    })
}

// rendering the signin page
module.exports.signIn = (req,res)=>{
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:"Codeial singIn"
    })
}

//inserting the sign up data
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
    console.log(req);
    req.flash('success','Logged In successfully');
    return res.redirect('/');
}

// sign-out functionality

module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('success','You have Logged Out');
    return res.redirect('/');
}
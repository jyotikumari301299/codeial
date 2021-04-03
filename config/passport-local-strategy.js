
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// importing user
const User = require('../models/user');

// telling passport to use the localstrategy that we have created
// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    function(email, password, done){
        // find a user and establish the identity
        User.findOne({email:email},function(err,user){
            if(err){ console.log("Error in finding user--->Passport"); 
                      return done(err);
                  }
            if(!user || user.password != password){
                console.log('Invalid username/password');
                return done(null,false);
            }

            // if user is found
            return done(null,user);
        });
    }
));


// srializing the user to decide which key to be kept in the cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
});


// deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err)
         {
             console.log("error in finding user-->passport");
             return done(null); 
         }
         return done(null,user);
    })
});

// check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    // if the user is signed in then pass on the request to the next function which is my controlles action
    if(req.isAuthenticated())
    {
        return next();
    }
    // if the usser is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = (req,res,next)=>{
    if(req.isAuthenticated)
    {
        // req.user contains the current signedin user form the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user
    }
    next();
}



module.exports= passport;







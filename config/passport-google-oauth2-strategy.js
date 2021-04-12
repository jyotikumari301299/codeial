const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;

const crypto = require("crypto");
const User = require("../models/user");

// Tell passport to use a new strategy for google login
passport.use(
    new googleStrategy(
    {
      clientID:
        "377139860752-mkuirhdd0i06mf034746i15g54k0ioos.apps.googleusercontent.com",
      clientSecret: "uFw2QPmJap3Xs7Kp3e7lRUGq",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    // callback function
    function(accessToken, refreshToken, profile, done){
        // find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){console.log('Err in google strategy pasport',err); return; }

            console.log(profile);
            if(user){
                // if user is found set this user as request.user
                return done(null, user);
            }
            else
            {
                // else signup the user i.e we create the user
                // here i amasking google to establish the identity of an email id which has been passed on by the user
                // if not found then create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    // this is how i am generationg the random password
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){console.log("Error in creating user",err); return;}
                    else{
                        return done(null,user);
                    }
                });
            }
        });
    }
  )
);



module.exports = passport;
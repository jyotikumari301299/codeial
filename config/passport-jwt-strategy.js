// we have imported set of lobraries for setting passport-jwt working
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
// we imported user because we are trying to find user from the database whenever request comes in
const User = require('../models/user');

// we created some options 
let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey:  "codeial"
}

passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){
    // findiing the user
    User.findById(jwtPayLoad._id, function(err, user){
        if(err){
            console.log("error in finding user from JWT");
            return;
        }
        if(user){
            return done(null, user);
        }
        else{
            return done(null, false);
        }
    });
}));





module.exports = passport;
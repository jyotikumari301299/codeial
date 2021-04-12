const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users_controller');

router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);
router.post('/create',usersController.create);
router.post('/update/:id',passport.checkAuthentication,usersController.update);

// use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
),usersController.createSession);


router.get('/sign-out',usersController.destroySession);

// for google oAuth authentication we are going to create two routes here
// one would be when i click on the button google sign-in it takes me to google and the data is fetched from there
// and then the second one would be when google fetches that data and sends it back to me on a route which is my callback url
//    /auth/google is the url given by the google
// scope is the info which we are looking to fetch
router.get('/auth/google',passport.authenticate('google',{scope: ['profile', 'email']}));
router.get('/auth/google/callback',passport.authenticate('google' ,{failureRedirect: 'users/sign-in'}) , usersController.createSession);



module.exports = router;
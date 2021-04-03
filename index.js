// this index.js will send in a request to my routes/index and routes/index.js  will further route it to 
// all different route files out there.
const express = require('express');

const app = express();
const port = 8000;
// for storing cookies
const cookieParser = require('cookie-parser');

const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie(below three lines)
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);

const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded());  

app.use(cookieParser());
// for static files
app.use(express.static('./assets'));

app.use(expressLayouts);


// extract style and scripts form subpages into the layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// setting up view engine
app.set('view engine','ejs');
app.set('views','./views');

// mongo stroe is used to store the session cookie in DB
app.use(session({
    name: 'codeial',
    //TODO change the secret before deployment
    secret:'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 *100)
    },
    store: new MongoStore({
            mongooseConnection: db,
            autoRemove: 'disabled'
    }, 
    function(err){
        console.log(err || "connect-mongo setup is OK!!");
    })
}));

// we need to tell app to use passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// USING EXPRESS ROUTER
app.use('/',require('./routes'));

app.listen(port, (err)=>{
    if(err)
    {
        console.log(`Error in running the server :${err}`);
    }
    console.log(`server is running on port ${port}`);

})












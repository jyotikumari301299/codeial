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
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo')(session);

const sassMiddleware = require('node-sass-middleware');

// setup th chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log("chat server is listening on port 5000");

const flash = require('connect-flash');
// requireing middleware for flash message to send to fornt end template
const customMWare = require('./config/middleware');

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

// make the uploads path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));

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
// using flash-messages
app.use(flash());
// using middleware made for showing flash data to front end
app.use(customMWare.setFlash);

// USING EXPRESS ROUTER
app.use('/',require('./routes'));

app.listen(port, (err)=>{
    console.log("heyyyyyyyyyy*********");
    if(err)
    {
        console.log("errrrrrr*********");
        console.log(`Error in running the server :${err}`);
    }
    console.log(`server is running on port ${port}`);

})












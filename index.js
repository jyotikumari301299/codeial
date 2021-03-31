// this index.js will send in a request to my routes/index and routes/index.js  will further route it to 
// all different route files out there.
const express = require('express');
// for storing cookies
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');


app.use(express.urlencoded());

app.use(cookieParser());

app.use(expressLayouts);
// extract style and scripts form subpages into the layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// for static files
app.use(express.static('./assets'));

// USING EXPRESS ROUTER
app.use('/',require('./routes'));

// setting up view engine
app.set('view engine','ejs');
app.set('views','./views');


app.listen(port, (err)=>{
    if(err)
    {
        console.log(`Error in running the server :${err}`);
    }
    console.log(`server is running on port ${port}`);

})
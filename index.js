// this index.js will send in a request to my routes/index and routes/index.js  will further route it to 
// all different route files out there.
const express = require('express');
const app = express();
const port = 8000;

// USING EXPRESS ROUTER
app.use('/',require('./routes/index'));


app.listen(port, (err)=>{
    if(err)
    {
        console.log(`Error in running the server :${err}`);
    }
    console.log(`server is running on port ${port}`);

})
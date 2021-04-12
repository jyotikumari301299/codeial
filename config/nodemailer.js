const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');


// defining our transporter i.e, this is the part which sends the emails
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host:  'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'coding.ninja1503',
        pass: 'codingninjas'
    },
    tls: {
        rejectUnauthorized: false
      }
});


//rendering ejs tempate i.e, renderTemplate defines that whenever i am going to send an HTML where the files would
// be placed insde views and the mailers folder
let renderTemplate = (data, relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data, function(err, template){
            if(err){console.log("error in rendering template"); return;}

            mailHTML = template;
        }
    )

    return mailHTML;
}


// and finally er are exporting  these two properties and we  r going to use it whenevr i m going to send email
module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}
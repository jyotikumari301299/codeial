const nodeMailer = require('../config/nodemailer');



// another way of exporting a method
// it can also be exported as module.exports = newComment
exports.newComment = (comment)=>{
    console.log('inside newcomment Mailer');
    console.log('comment.user.email ----------', comment.user.email);
    nodeMailer.transporter.sendMail({
        from: 'Codeial <something@anything.com>',
        to: comment.user.email,
        subject: "New Comment published",
        html: `<h1>Your comment,  "${comment.content}" is now Published.</h1>`
        // info carries the information abt the req tht has been sent
    }, (err, info)=>{
        if(err){console.log("error in sending mail",err); return;}

        console.log("Mail Delievered", info);
        return;

    });
}

// purpose of this function
// ----whenever a new comment is made i jst need to call this mailer in the comments controller
// where new comments are made
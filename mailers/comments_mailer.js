const nodemailer = require('../config/nodemailer');
const nodeMailer = require('../config/nodemailer');



// another way of exporting a method
// it can also be exported as module.exports = newComment
exports.newComment = (comment)=>{
    let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');
    nodeMailer.transporter.sendMail({
        from: 'Codeial <something@anything.com>',
        to: comment.user.email,
        subject: "New Comment published",
        html: htmlString
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
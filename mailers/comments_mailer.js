const nodemailer = require('../config/nodemailer');
const nodeMailer = require('../config/nodemailer');



// another way of exporting a method
// it can also be exported as module.exports = newComment
// newComment wo function h jiske through hm mail bhej rhe h
exports.newComment = (comment)=>{
    let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');
    nodeMailer.transporter.sendMail({
        from: 'coding.ninja1503@gmail.com',
        to: comment.user.email,
        subject: "New Comment published",
        html: htmlString
        // info carries the information abt the req tht has been sent
    }, (err, info)=>{
        if(err){console.log("error in sending mail",err); return;}

        console.log("Mail Delievered");
        return;

    });
}

// purpose of this function
// ----whenever a new comment is made i jst need to call this mailer in the comments controller
// where new comments are made
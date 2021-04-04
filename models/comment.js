const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    // comment belongs to a user thatsy we r refrencing to user here
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
},{
    timestamps: true
});



const Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment;
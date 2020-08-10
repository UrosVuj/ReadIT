const mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    username: {
        type: String
    },
    book_id: {
        type: String
    },
    comment: {
        type: String
    },
    rating: {
        type: Number
    }
});


mongoose.model('Comment', commentSchema);
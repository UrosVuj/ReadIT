const mongoose = require('mongoose');

var bookProgressSchema = new mongoose.Schema({

    username: {
        type: String
    },
    book_id: {
        type: String
    },
    book_pages: {
        type: Number
    },

});


mongoose.model('BookProgress', bookProgressSchema);
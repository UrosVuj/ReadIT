const mongoose = require('mongoose');

var readListSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    want_to_read: [{
        book_id: {
            type: String
        }

    }],
    currently_reading: [{
        progress: {
            type: Number
        },
        book_id: {
            type: String
        }
    }],
    finished_reading: [{
        review: {
            type: Number
        },
        book_id: {
            type: String
        }
    }],
}, {
    collection: 'read_list'
});


mongoose.model('ReadList', readListSchema);
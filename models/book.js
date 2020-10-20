const mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    name: {
        type: String
    },
    authors: [{
        type: String
    }],
    date_of_publishing: {
        type: Date
    },
    genres: [{
        type: String
    }],
    description: {
        type: String
    },
    avg_score: {
        type: Number
    },
    cover_path: {
        type: String
    },
    approved: {
        type: Boolean
    }
});


mongoose.model('Book', bookSchema);
mongoose.model('Unapproved_Book', bookSchema);
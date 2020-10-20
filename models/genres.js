const mongoose = require('mongoose');

var genreSchema = new mongoose.Schema({

    name: {
        type: String,
        unique: true
    },
    num_of_books: {
        type: Number
    }
});


mongoose.model('Genres', genreSchema);
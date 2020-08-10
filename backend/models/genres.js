const mongoose = require('mongoose');

var genreSchema = new mongoose.Schema({

    genres: [{
        type: String
    }]
});


mongoose.model('Genres', genreSchema);
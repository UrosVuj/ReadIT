const mongoose = require('mongoose');

var MONGODB_URI = "mongodb+srv://UrosV:uros2001999710178@uroscluster.ozbqx.azure.mongodb.net/ReadditDB?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URI, (err) => {
    if (!err) {
        console.log('MongoDB connection succeeded.');
    } else {
        console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2));
    }
});

//for all models
require('./chat');
require('./user');
require('./book');
require('./book_list');
require('./comment');
require('./genres');
require('./book_progress')
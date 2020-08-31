const mongoose = require('mongoose');

var chatSchema = new mongoose.Schema({
    name: {
        type: String
    },
    creator: {
        type: String
    },
    users: [{
        type: String
    }],
    waiting_users: [{
        type: String
    }],
    private: {
        type: Boolean
    },
    finished: {
        type: Boolean
    },
    start: {
        type: Date
    }


});


mongoose.model('Chats', chatSchema);
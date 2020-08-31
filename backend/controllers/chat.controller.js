const mongoose = require('mongoose');
const multer = require('multer');
const bcrypt = require('bcryptjs');

//for GET book request with id
const ObjectId = require('mongodb').ObjectId

const User = mongoose.model('User');
const Chats = mongoose.model('Chats');
const Genre = mongoose.model('Genres');
const Comment = mongoose.model('Comment');
const Book = mongoose.model('Book');
const ReadList = mongoose.model('ReadList');
const Unapproved_Book = mongoose.model('Unapproved_Book')

module.exports.getAllChats = async (req, res, next) => {

    let chats = await Chats.find({}).exec();

    res.send(chats);
}

module.exports.addChatRoom = async (req, res, next) => {

    users = [];
    users.push(req.body.creator);

    var chat = new Chats();
    chat.name = req.body.name;
    chat.creator = req.body.creator;
    chat.users = users;
    chat.private = req.body.private;
    chat.start = req.body.start;
    chat.finished = req.body.finished;

    console.log(chat);

    chat.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000) {
                res.status(422).send('Duplicate chat found');
            } else
                return next(err);
        }

    });
}

module.exports.getChatRoom = async (req, res, next) => {

    let chat = await Chats.findOne({
        _id: ObjectId(req.params.id)
    }).exec();

    res.send(chat);
}

module.exports.setChatFinished = async (req, res, next) => {


    console.log(req.body.id)
    let chat = await Chats.updateOne({
        _id: ObjectId(req.body.id)
    }, {
        finished: "true"
    }).exec();

    res.send(chat);
}
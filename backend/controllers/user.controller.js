const mongoose = require('mongoose');
const multer = require('multer');
const bcrypt = require('bcryptjs');

//for GET book request with id
const ObjectId = require('mongodb').ObjectId

const User = mongoose.model('User');
const Book = mongoose.model('Book');
const Comment = mongoose.model('Comment');


module.exports.login = async (req, res, next) => {

    let users = await User.find({
        username: req.body.username
    }).exec();

    if (users.length == 0) {
        res.status(200).json({
            found: false,
            msg: "Username cannot be associated with an account"
        })
        return;
    }

    console.log(users[0])


    if (bcrypt.compare(req.body.password, users[0].password)) {


        res.status(200).json({
            found: true,
            info: {
                first_name: users[0].first_name,
                last_name: users[0].last_name,
                country: users[0].country,
                city: users[0].city,
                username: users[0].username,
                email: users[0].email,
                dob: users[0].dob,
                avatar_path: users[0].avatar_path
            }
        })
    }

}

module.exports.getComments = async (req, res, next) => {

    console.log("here")
    let comments = await Comment.find({
        username: req.params.id
    }).exec();

    res.send(comments);

}

module.exports.updateProfile = async (req, res, next) => {

    switch (req.body.type_to_update) {
        case "email":
            console.log("Update email")
            await User.updateOne({
                username: req.body.username
            }, {
                email: req.body.email
            }).exec();
            break;
        case "dob":
            console.log("Update dob")
            await User.updateOne({
                username: req.body.username
            }, {
                dob: req.body.dob
            }).exec();
            break;
        case "first_name":
            await User.updateOne({
                username: req.body.username
            }, {
                first_name: req.body.first_name
            }).exec();
            break;
        case "last_name":
            await User.updateOne({
                username: req.body.username
            }, {
                last_name: req.body.last_name
            }).exec();
            break;
        case "country":
            await User.updateOne({
                username: req.body.username
            }, {
                country: req.body.country
            }).exec();
            break;
        case "city":
            await User.updateOne({
                username: req.body.username
            }, {
                city: req.body.city
            }).exec();
            break;


    }

    //console.log(req.body);
    res.send(req.body);


}
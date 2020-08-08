const mongoose = require('mongoose');
const multer = require('multer');
const bcrypt = require('bcryptjs');

//for GET book request with id
const ObjectId = require('mongodb').ObjectId

const User = mongoose.model('User');
const Book = mongoose.model('Book');


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
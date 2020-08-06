const mongoose = require('mongoose');
const multer = require('multer');
const bcrypt = require('bcryptjs');


const User = mongoose.model('User');


module.exports.login = async (req, res, next) => {

    let users = await User.find({
        username: req.body.username
    }).exec();

    if (users.length == 0) {
        res.status(200).json({
            success: false,
            msg: "Username cannot be associated with an account"
        })
        return;
    }

    console.log(users[0])


    if (bcrypt.compare(req.body.password, users[0].password)) {


        res.status(200).json({
            first_name: users[0].first_name,
            last_name: users[0].last_name,
            country: users[0].country,
            city: users[0].city,
            username: users[0].username,
            email: users[0].email,
            avatar_path: users[0].avatar_path
        })
    }

}
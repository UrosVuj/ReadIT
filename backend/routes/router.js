const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const multer = require('multer');


const User = mongoose.model('User');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/user_avatars')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
})


const upload = multer({
    storage: storage
});


router.post('/register', upload.single('avatar'), (req, res, next) => {


    console.log(req.body);

    var user = new User();
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.dob = req.body.dob;
    user.country = req.body.country;
    user.city = req.body.city;
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;

    if (req.file)
        user.avatar_path = req.file.path;
    else user.avatar_path = 'images\\default_avatar.jpg';

    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000) {
                res.status(422).send('Duplicate email/username found.');
            } else
                return next(err);
        }

    });
})

module.exports = router;
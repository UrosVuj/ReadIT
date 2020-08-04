const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports.register = (req, res, next) => {

    var user = new User();
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.dob = req.body.dob;
    user.country = req.body.country;
    user.city = req.body.city;
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000) {
                res.status(422).send('Duplicate email/username address found.');
            } else
                return next(err);
        }

    });
}
const mongoose = require('mongoose');
const multer = require('multer');
const bcrypt = require('bcryptjs');

//for GET book request with id
const ObjectId = require('mongodb').ObjectId

const User = mongoose.model('User');
const Book = mongoose.model('Book');
const Unapproved_Book = mongoose.model('Unapproved_Book')
const Pending_user = mongoose.model('Pending_user')
const Comment = mongoose.model('Comment');
const Genre = mongoose.model('Genres');
const ReadList = mongoose.model('ReadList');


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
                avatar_path: users[0].avatar_path,
                type: users[0].type
            }
        })
    }

}

module.exports.setType = async (req, res, next) => {

    await User.updateOne({
        username: req.body.username
    }, {
        type: req.body.type

    }).exec();

    res.send({
        msg: "Success"
    });

}

module.exports.getComments = async (req, res, next) => {

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

module.exports.getGenres = async (req, res, next) => {

    let genres = await Genre.find().exec();

    res.send(genres);

}

module.exports.setGenres = async (req, res, next) => {

    console.log("set")
    let new_genre = new Genre();

    new_genre.name = req.body.name;
    new_genre.num_of_books = 0;

    new_genre.save((err, doc) => {
        if (!err)
            res.send({
                msg: "Success!"
            });
        else {
            if (err.code == 11000) {
                res.send({
                    msg: 'Duplicate genre found.'
                });
            } else
                return next(err);
        }

    })

}

module.exports.deleteGenres = async (req, res, next) => {

    console.log("delete")
    let genre = await Genre.findOne({
        name: req.body.name
    }).exec();

    if (genre.num_of_books == 0) {
        Genre.deleteOne({
            name: req.body.name
        }).exec();
        res.send({
            msg: "Genre " + "'" + req.body.name + "'" + " deleted"
        })
    } else
        res.send({
            msg: "Cannot delete this genre, it has some books belonging to it"
        });

}

module.exports.getUnapprovedUsers = async (req, res, next) => {

    let users = await Pending_user.find({}).exec();
    res.send(users);

}

module.exports.getAllUsers = async (req, res, next) => {

    let users = await User.find({}).exec();
    res.send(users);

}

module.exports.approveUser = async (req, res, next) => {

    let user = await Pending_user.findOne({
        username: req.body.username
    }).exec();

    Pending_user.deleteOne({
        username: req.body.username
    }).exec();


    let approved_user = new User();
    approved_user.first_name = user.first_name;
    approved_user.last_name = user.last_name;
    approved_user.email = user.email;
    approved_user.password = user.password;
    approved_user.username = user.username;
    approved_user.saltSecret = user.saltSecret;
    approved_user.avatar_path = user.avatar_path;
    approved_user.city = user.city;
    approved_user.country = user.country;
    approved_user.dob = user.dob;
    approved_user.type = user.type;

    approved_user.save();
    res.send(approved_user);
}

module.exports.rejectUser = async (req, res, next) => {

    ReadList.deleteOne({
        username: req.body.username
    }).exec();

    Pending_user.deleteOne({
        username: req.body.username
    }).exec();

    res.json({
        msg: "success"
    });
}

module.exports.rejectBook = async (req, res, next) => {


    Unapproved_Book.deleteOne({
        name: req.body.name
    }).exec();

    res.json({
        msg: "Success!"
    });
}

module.exports.approveBook = async (req, res, next) => {

    let book = await Unapproved_Book.findOne({
        name: req.body.name
    }).exec();
    console.log(book);

    Unapproved_Book.deleteOne({
        name: req.body.name
    }).exec();

    await Genre.updateMany({
        name: {
            $in: book.genres
        }
    }, {
        $inc: {
            "num_of_books": 1
        }
    }).exec();

    var approved_book = new Book();
    approved_book.name = book.name;
    approved_book.authors = book.authors;
    approved_book.description = book.description;
    approved_book.date_of_publishing = book.date_of_publishing;
    approved_book.genres = book.genres;
    approved_book.avg_score = book.avg_score;
    approved_book.cover_path = book.cover_path;
    approved_book.approved = true;

    approved_book.save();
    res.send({
        msg: "Success!"
    });
}


module.exports.getOtherUser = async (req, res, next) => {

    let user = await User.findOne({
        username: req.params.username
    }).exec();

    console.log(req.params.username)
    if (user != null)
        res.json({
            msg: "Success!",
            "user": user
        });
    else
        res.json({
            msg: "Fail"
        });

}
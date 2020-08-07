const mongoose = require('mongoose');
const multer = require('multer');
const bcrypt = require('bcryptjs');


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
                avatar_path: users[0].avatar_path
            }
        })
    }

}

module.exports.searchBooks = async (req, res, next) => {

    var query = {};

    // pojedinacno se dodaju parametri u zavisnosti od toga sta je korsinik hteo da doda
    // regex sluzi kao LIKE operator za upit
    if (req.body.name) {
        query["name"] = {
            '$regex': req.body.name,
            '$options': 'i'
        };

    }

    if (req.body.author) {
        //query["authors"] = "/" + req.body.author + "/";
        query["authors"] = {
            '$regex': req.body.author,
            '$options': 'i'
        };
    }

    if (req.body.genre) {
        query["genres"] = req.body.genre;
    }
    console.log(query)

    let books = await Book.find(query).exec();

    if (books.length == 0) {
        res.status(200).json({
            found: false,
            msg: "None of the books fit the criteria"
        })
        return;
    } else {

        res.json({
            found: true,
            books: books
        })
    }



}
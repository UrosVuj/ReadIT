const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const multer = require('multer');

const bcrypt = require('bcryptjs');

const userContr = require('../controllers/user.controller')
const chatContr = require('../controllers/chat.controller')
const bookContr = require('../controllers/book.controller')



const User = mongoose.model('User');
const Pending_user = mongoose.model('Pending_user');
const Book = mongoose.model('Book');
const Unapproved_Book = mongoose.model('Unapproved_Book');
const ReadList = mongoose.model('ReadList');
const Comment = mongoose.model('Comment');
const Genres = mongoose.model('Genres');

const avatar_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/user_avatars')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
})

const bookCover_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/book_covers')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
})

const upload_profile = multer({
    storage: avatar_storage
});

const upload_bookCover = multer({
    storage: bookCover_storage
});


router.post('/register', upload_profile.single('avatar'), async (req, res, next) => {


    console.log(req.body);

    var user = new Pending_user();
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.dob = req.body.dob;
    user.country = req.body.country;
    user.city = req.body.city;
    user.username = req.body.username;
    user.email = req.body.email;
    user.type = "user";

    if (req.file)
        user.avatar_path = req.file.path;
    else user.avatar_path = 'images\\default_avatar.jpg';

    //search for existing username

    let username_found = await User.find({
        username: req.body.username
    }).exec();
    console.log(username_found)


    if (username_found.length != 0)
        res.send({
            msg: 'Duplicate username found.'
        });
    else {

        //search for existing email
        let email_found = await User.find({
            email: req.body.email
        }).exec();
        console.log(email_found)
        if (email_found.length != 0) res.send({
            msg: 'Duplicate email found.'
        });
        else { //success

            //create hashed password
            var original = req.body.password;
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    user.password = hash;
                    console.log(user.password);
                    user.saltSecret = salt;

                    //save
                    user.save((err, doc) => {

                        if (!err)
                            res.send({
                                msg: "Success!"
                            });

                        else {

                            if (err.code == 11000) {
                                res.status(422).send({
                                    msg: 'Duplicate email/username found.'
                                });
                            } else
                                return next(err);
                        }

                    });
                    bcrypt.compare(original, hash, function (err, result) {
                        console.log(result)
                    })
                });
            });
        }
    }
})


router.post('/login', userContr.login);

router.post('/add-book', upload_bookCover.single('cover'), async (req, res, next) => {

    var book = new Unapproved_Book();
    book.name = req.body.name;
    book.authors = JSON.parse(req.body.authors);
    book.description = req.body.description;
    book.date_of_publishing = req.body.date_of_publishing;
    book.genres = JSON.parse(req.body.genres);
    book.avg_score = req.body.avg_score;
    book.approved = false;

    if (req.file)
        book.cover_path = req.file.path;
    else book.cover_path = 'images\\default_cover.jpg';

    let name_found = await Book.find({
        name: req.body.name
    }).exec();

    console.log(name_found)
    if (name_found.length != 0)
        res.send({
            msg: 'Duplicate name found.'
        });
    else {
        book.save((err, doc) => {
            if (!err)
                res.send({
                    msg: "Success!"
                });
            else {
                if (err.code == 11000) {
                    res.status(422).send({
                        msg: 'Duplicate found.'
                    });
                } else
                    return next(err);
            }

        });
    }

})

//update book and profile
router.post('/user/update-profile', userContr.updateProfile);
router.post('/user/update-password', userContr.updatePassword);
router.post('/book/update-book', bookContr.updateBook);

//search books
router.post('/search-books', bookContr.searchBooks);
router.post('/search-books-unapproved', bookContr.searchBooksUnapproved);

//get user and book
router.get('/book/:id', bookContr.getBook);
router.get('/user-profile/:username', userContr.getOtherUser);

//book lists
router.get('/book/lists/:id', bookContr.getLists);
router.post('/book/create-list', bookContr.createLists);

router.post('/book/add-list/past', bookContr.addToPastList);
router.post('/book/add-list/present', bookContr.addToPresentList);
router.post('/book/add-list/future', bookContr.addToFutureList);

router.post('/book/remove-from-list', bookContr.removeFromList);

router.post('/book/set-progress', bookContr.setProgress);
router.get('/book/get-lists/:id', bookContr.getLists2);

//book comments
router.post('/book/add-comment', bookContr.addComment);
router.post('/book/add-rating', bookContr.addRating);

router.get('/book/get-comments/:id', bookContr.getComments);
router.get('/user/get-comments/:id', userContr.getComments);

//genres
router.get('/user/get-genres', userContr.getGenres);

router.post('/admin/add-genres', userContr.setGenres);
router.post('/admin/delete-genres', userContr.deleteGenres);

//admin approvals
router.post('/admin/approve-user', userContr.approveUser);
router.post('/admin/reject-user', userContr.rejectUser);
router.post('/mod/approve-book', userContr.approveBook);
router.post('/mod/reject-book', userContr.rejectBook);

router.post('/admin/set-type', userContr.setType);

router.get('/admin/get-unapproved', userContr.getUnapprovedUsers);
router.get('/user/get-users', userContr.getAllUsers);

router.post('/user/check-password', userContr.checkOldPassword);


//book pages progress

router.post('/book/create-progress', bookContr.createBookPages);
router.post('/book/delete-progress', bookContr.deleteBookPages)
router.post('/book/update-progress', bookContr.updateBookPages);

router.get('/book/get-progress/:username/:book_id', bookContr.getBookPages);



//***************chats


router.post('/chat/add', chatContr.addChatRoom);
router.get('/chat/get-all', chatContr.getAllChats);
router.get('/chat/get/:id', chatContr.getChatRoom);

router.post('/chat/finish', chatContr.setChatFinished);

module.exports = router;
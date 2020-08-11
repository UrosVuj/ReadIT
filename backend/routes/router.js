const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const multer = require('multer');


const userContr = require('../controllers/user.controller')

const bookContr = require('../controllers/book.controller')


const User = mongoose.model('User');
const Pending_user = mongoose.model('Pending_user');
const Book = mongoose.model('Book');
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


router.post('/register', upload_profile.single('avatar'), (req, res, next) => {


    console.log(req.body);

    var user = new Pending_user();
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

router.post('/admin/approve-user', userContr.approveUser)

router.post('/login', userContr.login);

router.post('/add-book', upload_bookCover.single('cover'), async (req, res, next) => {

    var book = new Book();
    book.name = req.body.name;
    book.authors = JSON.parse(req.body.authors);
    book.description = req.body.description;
    book.date_of_publishing = req.body.date_of_publishing;
    book.genres = JSON.parse(req.body.genres);
    book.avg_score = req.body.avg_score;

    console.log(book.genres)
    await Genres.updateMany({
        name: {
            $in: book.genres
        }
    }, {
        $inc: {
            "num_of_books": 1
        }
    }).exec();

    if (req.file)
        book.cover_path = req.file.path;
    else book.cover_path = 'images\\default_cover.png';

    book.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000) {
                res.status(422).send('Duplicate book found');
            } else
                return next(err);
        }

    });
})

router.post('/user/update-profile', userContr.updateProfile);

router.post('/search-books', bookContr.searchBooks);

router.get('/book/:id', bookContr.getBook);

router.get('/book/lists/:id', bookContr.getLists);

router.post('/book/create-list', bookContr.createLists);

router.post('/book/add-list/past', bookContr.addToPastList)
router.post('/book/add-list/present', bookContr.addToPresentList)
router.post('/book/add-list/future', bookContr.addToFutureList)

router.post('/book/add-comment', bookContr.addComment)
router.post('/book/add-rating', bookContr.addRating)

router.get('/book/get-comments/:id', bookContr.getComments);
router.get('/user/get-comments/:id', userContr.getComments);

router.get('/user/get-genres', userContr.getGenres);
router.post('/user/add-genres', userContr.setGenres);
router.post('/user/delete-genres', userContr.deleteGenres);

module.exports = router;
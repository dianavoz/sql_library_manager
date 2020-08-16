const express = require('express');
const Book = require('../models').Book;

// Create new router
const router = express.Router({mergeParams: true});

// GET show book detail form
router.get('/', (req, res) => {
    Book.findOne({
            where: {id: req.params.id}
        })
        .then((book) => {
            if (book) {
                res.render('update-book', { book });
            }else {
                res.render("page-not-found", { book: {}, title: "Page Not Found" });
              } 
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

// POST update book info in the database
router.post('/', (req, res) => {
    Book.findOne({
            where: {id: req.params.id}
        })
        .then((book) => {
            if (book) {
                return book.update(req.body);
            } else {
                res.sendStatus(404);
            }
        })
        .then((book) => {
            res.redirect('/books');
        })
        .catch((err) => {
            if (err.name === 'SequelizeValidationError') {
                const book = Book.build(req.body);
                book.id = req.params.id;
                res.render('update-book', {
                    book,
                    errors: err.errors,
                });
            } else {
                throw err;
            }
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

// Export router
module.exports = router;
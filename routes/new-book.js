const express = require('express');
const router = express.Router();
const {Book} = require('../models');

//show tha new-book page
router.get('/',(req,res)=>{
    res.render('new-book');
});

// add a new book to the database
router.post('/',(req,res)=>{
    Book.create(req.body)
     .then((book)=>{
         res.redirect('/books');
     })

     .catch((err) => {
        if (err.name === 'SequelizeValidationError') {
            res.render('new-book', {
                book: Book.build(req.body),
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

module.exports = router;

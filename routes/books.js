const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op

const {Book} = require('../models');

// Books per page limit
const limit = 8;

// GET the full list of books
router.get('/', (req, res) => {

    let currentPage = req.query.page;
    if (currentPage === undefined) {
        currentPage = '1';
    }
    const offset = (currentPage - 1) * limit;

    // Get all of the books
    Book.findAndCountAll({ 
            order: [["title", "ASC"]],
            offset,
            limit
        })
        .then((books) => {
            res.render('index', {
                books: books.rows,
                pageNumber: Math.ceil(books.count / limit),
                currentPage
            });
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});



// search books
router.post('/', (req, res) => {
    const {search} = req.body;

    Book.findAll({ 
        where: {
            [Op.or]: [
                {
                    title: {
                        [Op.like]: `%${search}%`
                    }
                },
                {
                    author: {
                        [Op.like]: `%${search}%`
                    }
                },
                {
                    genre: {
                        [Op.like]: `%${search}%`
                    }
                },
                {
                    year: {
                        [Op.like]: `%${search}%`
                    }
                }
            ]
        }
    })
    .then((books) => {
        if (books.length > 0) {
            res.render('index', { books });
        } else {
            res.render('no-results');
        }
    })
    .catch((err) => {
        res.sendStatus(500);
    });

});

module.exports = router;

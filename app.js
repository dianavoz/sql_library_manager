const express = require('express');

// Add body parser
const bodyParser = require('body-parser');

const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');

// Create Express app
const app = express();

// Set view engine to Pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// parse application
app.use(bodyParser.urlencoded({ extended: false }));

//static files
app.use('/static', express.static(path.join(__dirname, 'public')));
 
// parse application/json
app.use(bodyParser.json());

//import routes
const indexRoute = require('./routes');
const bookRoutes = require('./routes/books');
const newBookRoute = require('./routes/new-book');
const updateBookRoute = require('./routes/update-book');
const deleteBookRoute = require('./routes/delete-book');

app.use(indexRoute);
app.use('/books', bookRoutes);
app.use('/books/new', newBookRoute);
app.use('/books/:id', updateBookRoute );
app.use('/books/:id/delete', deleteBookRoute);

// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).render('page-not-found');
});

// Handle 500 errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error');
});


module.exports = app;
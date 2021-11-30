const express = require('express');
const booksController = require('../controllers/books.controller')
const router = express.Router();


router.get('/getAllBooks', (req, res) => {
    booksController.getAllBooks(req, res);
})
.post('/newBook', (req, res) => {
    booksController.addNewBook(req, res);
})
router.get('/getAllBooksUser/:id', (req, res) => {
    booksController.getAllBooksUser(req, res);
})

module.exports = router;
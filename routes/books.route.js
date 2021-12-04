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
router.delete('/deleteBookByUser/:id', (req, res) => {
    booksController.deleteBookByUser(req, res);
})
router.put('/updateBookByUser/:id', (req, res) => {
    booksController.updateBookByUser(req, res);
})

module.exports = router;
const express = require('express');
const booksController = require('../controllers/books.controller')
// const booksModel = require('../models/books.model');
const router = express.Router();
const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function(request, file, callback){
//         callback(null, '../uploads/images');
//     },
//     filename: function(request, file, callback){
//         callback(null, Date.now() + file.originalname);
//     },
// });
const upload = multer({
    dest:'avatars',
    
});

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
router.put('/updateCommentBook/:id', (req, res) => {
    booksController.updateCommentBook(req, res);
})
router.put('/updateRatingBook/:id', (req, res) => {
    booksController.updateRatingBook(req, res);
})
router.post('/users/me/avatar', upload.single('avatar') ,(req, res) => {
    booksController.uploadImageBook(req, res);
})
module.exports = router;
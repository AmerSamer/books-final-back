const express = require('express');
const booksController = require('../controllers/books.controller')
const booksModel = require('../models/books.model');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(request, file, callback){
        callback(null, '../uploads/images');
    },
    filename: function(request, file, callback){
        callback(null, Date.now() + file.originalname);
    },
});
const upload = multer({
    storage:storage,
    limits:{
        fieldSize:1024*1024*3
    }
});

router.get('/getAllBooks', (req, res) => {
    booksController.getAllBooks(req, res);
})
// .post('/newBook', (req, res) => {
//     booksController.addNewBook(req, res);
// })
router.post('/newBook', upload.single('image'), (req, res) => {
    const { filename } = req.file;
    const { name, author, publishing, amount, language, category, desc, price, user } = req.body; ///// not finished
    const newBook = new booksModel.Book({
        img: filename,
        name: name,
        author: author,
        publishing: publishing,
        amount: amount,
        language: language,
        category: category,
        desc: desc,
        price: price,
        user: user,
        rating: 4,
        comments: [],
        purchase: 0,
        bookUploadDate: new Date()
    })
    newBook.save((err, data) => {
        if (err) return res.status(404).send(err);
        return res.status(200).send(data);
    });
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
// router.post('/uploadImageBook/', (req, res) => {
//     booksController.uploadImageBook(req, res);
// })
module.exports = router;
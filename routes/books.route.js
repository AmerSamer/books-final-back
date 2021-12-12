const express = require('express');
const booksController = require('../controllers/books.controller')
const booksModel = require('../models/books.model');
const router = express.Router();
const multer = require('multer');

const upload = multer({
    limits:{
       fileSize : 1000000 // mb
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
           return cb(new Error('file must be a image'))  
        }
        cb(undefined , true)
    }
})


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

// router.post('/newBook',upload.single('img'), async(req, res)=> {
//     await booksController.addNewBook(req, res)
//  },(error,req,res,next)=>{
//     return res.status(400).send({error :error.message})
// })



module.exports = router;
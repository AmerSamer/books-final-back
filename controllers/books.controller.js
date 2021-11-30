const booksModel = require('../models/books.model');

const getAllBooks = async (req, res) => {
    const data = await booksModel.Book.find({})
    return res.status(200).json(data)
}
const addNewBook = (req, res) => {
    const { name, author, publishing, amount, language, category, desc, price, user } = req.body; ///// not finished
    const newBook = new booksModel.Book({
        name: name,
        author: author,
        publishing: publishing,
        amount: amount,
        language: language,
        category: category,
        desc: desc,
        price: price,
        user: user,
        rating: 0,
        comments:[],
        purchase:0,
        bookUploadDate: new Date()
    })
    newBook.save((err, data) => {
        if (err) return res.status(404).send(err);
        return res.status(200).send(data);
    });
}
module.exports = {
    getAllBooks,
    addNewBook
}
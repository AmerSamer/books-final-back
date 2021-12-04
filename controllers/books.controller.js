const booksModel = require('../models/books.model');
const cartsModel = require('../models/carts.model');

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
        comments: [],
        purchase: 0,
        bookUploadDate: new Date()
    })
    newBook.save((err, data) => {
        if (err) return res.status(404).send(err);
        return res.status(200).send(data);
    });
}
const getAllBooksUser = async (req, res) => {
    const { id } = req.params
    const data = await booksModel.Book.find({ user: id })
    return res.status(200).json(data)
}
const deleteBookByUser = async (req, res) => {
    const { id } = req.params;
    const idExists = await booksModel.Book.findById(id);
    if (!idExists) {
        return res.status(400).json({ error: "Book Not Valid." });
    }
    await cartsModel.Cart.deleteMany({ book: idExists._id })
    booksModel.Book.findByIdAndDelete(id, (err, data) => {
        if (err) return res.status(404).send(err);
        return res.status(200).send(data);
    });
}
const updateBookByUser = async (req, res) => {
    const { id } = req.params;
    const { name, author, publishing, amount, language, category, desc, price } = req.body;
    const idExists = await booksModel.Book.findById(id);
    if (!idExists) {
        return res.status(400).json({ error: "Book Not Valid." });
    }

    booksModel.Book.findByIdAndUpdate({ _id: id }, {
        name: (name ? name : idExists.name), author: (author ? author : idExists.author), publishing: (publishing ? publishing : idExists.publishing),
        amount: (amount ? amount : idExists.amount), language: (language ? language : idExists.language), category: (category ? category : idExists.category),
        desc: (desc ? desc : idExists.desc), price: (price ? price : idExists.price)
    }, { new: true, runValidators: true }, (err, data) => {
        if (err) return res.status(404).send(err);
        return res.status(200).send(data);
    });
}

module.exports = {
    getAllBooks,
    addNewBook,
    getAllBooksUser,
    deleteBookByUser,
    updateBookByUser
}
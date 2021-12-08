const booksModel = require('../models/books.model');
const cartsModel = require('../models/carts.model');
const favoritesModel = require('../models/favorites.model');

const getAllBooks = async (req, res) => {
    const data = await booksModel.Book.find({})
    return res.status(200).json(data)
}
// const addNewBook = (req, res) => {
//     console.log(req.body.name);
//     const { filename } = req.file;
//     const { name, author, publishing, amount, language, category, desc, price, user } = req.body; ///// not finished
//     const newBook = new booksModel.Book({
//         img: filename,
//         name: name,
//         author: author,
//         publishing: publishing,
//         amount: amount,
//         language: language,
//         category: category,
//         desc: desc,
//         price: price,
//         user: user,
//         rating: 4,
//         comments: [],
//         purchase: 0,
//         bookUploadDate: new Date()
//     })
//     newBook.save((err, data) => {
//         if (err) return res.status(404).send(err);
//         return res.status(200).send(data);
//     });
// }
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
    await favoritesModel.Favorites.deleteMany({ book: idExists._id })
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
const updateCommentBook = async (req, res) => {
    const { id } = req.params;
    const { comments } = req.body;
    const idExists = await booksModel.Book.findById(id);
    if (idExists) {
        const commentsArray = idExists.comments;
        commentsArray.push(comments)
        booksModel.Book.findByIdAndUpdate({ _id: id }, { comments: commentsArray }, { new: true, runValidators: true }, (err, data) => {
            if (err) return res.status(404).send(err);
            return res.status(200).send(data);
        });
        // return res.status(400).json({ error: "Book Not Valid." });
    } else {
        return res.status(400).json({ error: "Book Not Valid." });
    }
}
const updateRatingBook = async (req, res) => {
    const { id } = req.params;
    const { rating } = req.body;
    const idExists = await booksModel.Book.findById(id);
    if (idExists) {
        const ratingsCalc = (idExists.rating * idExists.purchase + rating) / (idExists.purchase + 1);
        booksModel.Book.findByIdAndUpdate({ _id: id }, { rating: ratingsCalc }, { new: true, runValidators: true }, (err, data) => {
            if (err) return res.status(404).send(err);
            return res.status(200).send(data);
        });
    } else {
        return res.status(400).json({ error: "Book Not Valid." });
    }
}
const uploadImageBook = async (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }
    
      const file = req.files.file;
    
      file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
    
        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
      });
    // const { id } = req.params;
    // const { img } = req.body;
    // const idExists = await booksModel.Book.findById(id);
    // if (idExists) {
    //     const newImage = img;
    //     booksModel.Book.findByIdAndUpdate({ _id: id }, { img: newImage }, { new: true, runValidators: true }, (err, data) => {
    //         if (err) return res.status(404).send(err);
    //         return res.status(200).send(data);
    //     });
    // } else {
    //     return res.status(400).json({ error: "Book Not Valid." });
    // }
}
module.exports = {
    getAllBooks,
    // addNewBook,
    getAllBooksUser,
    deleteBookByUser,
    updateBookByUser,
    updateCommentBook,
    updateRatingBook,
    uploadImageBook
}
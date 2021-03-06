const cartsModel = require('../models/carts.model');
const booksModel = require('../models/books.model');

const getAllcartsByUser = (req, res) => {
    const { id } = req.params
    cartsModel.Cart.find({ user: id }).populate('book').exec((err, data) => {
        if (err) console.log(err);
        return res.send(data)
    })
    // const { id } = req.params
    // const data = await cartsModel.Cart.find({user:id})
    // return res.status(200).json(data)
}
const addNewCart = async (req, res) => {
    const { book, user } = req.body;
    // const idExists = await cartsModel.Cart.findOne({ book: book, user: user })
    // if (!idExists) {
    const newCart = new cartsModel.Cart({
        user: user,
        book: book,
        cart: true
    })
    newCart.save((err, data) => {
        if (err) return res.status(404).send(err);
        return res.status(200).send(data);
    });
    // } else {
    //     return res.status(400).json({ error: "This Book Already Exist." });
    // }
}
const deleteUserCart = async (req, res) => {
    const { id } = req.params;

    const idExists = await cartsModel.Cart.findById(id);
    if (!idExists) {
        return res.status(400).json({ error: "Book Not Valid." });
    } else {
        cartsModel.Cart.findByIdAndDelete(id, (err, data) => {
            if (err) return res.status(404).send(err);
            return res.status(200).send(data);
        });
    }
    // cartsModel.Cart.deleteOne({ user: user, book: book }, (err, data) => {
    //     if (err) return res.status(404).send(err);
    //     return res.status(200).send("s");
    // });


    // cartsModel.Cart.find({ user:user }, (err, data) => {
    // cartsModel.Cart.find({ book: book }, (err, data) => {
    //     if (err) return res.status(404).send(err);
    //     return cartsModel.Cart.find({ user: user }, (err, data) => {
    //         if (err) return res.status(404).send(err);
    //         return cartsModel.Cart.deleteOne({ data }, (err, data) => {
    //             if (err) return res.status(404).send(err);
    //             return res.status(200).send(data);
    //         });
    //     });

    // });
}
const updateBuyCart =  async (req, res) => {
    const { id } = req.params;
    await cartsModel.Cart.updateMany({ user: id, cart: true }, { cart: false }, (err, data) => {
        if (err) return res.status(404).send(err);
        return res.status(200).send(data);
    });



    // cartsModel.Cart.find({ user: id, cart: true }).populate('book').exec((err, data) => {
    //     if (err) return res.status(404).send(err);
    //     data.map(async (d) => {
    //         await booksModel.Book.findByIdAndUpdate({ _id: d.book._id }, { purchase: d.book.purchase+1 }, { new: true, runValidators: true }, (err, data) => {
    //             if (err) return res.status(404).send(err);
    //             return res.status(200).send(data);
    //         });
    //     })
    // })

   
    

    // cartsModel.Cart.find({ user: id }, async (err, data) => {
    //     await cartsModel.Cart.find({ cart: true },  (err, data) => {
    //         data.map( async (d) => {
    //             await cartsModel.Cart.findOneAndUpdate({ _id: d._id }, { cart: false }, { new: true, runValidators: true }, async (err, data) => {
    //                 await booksModel.Book.findById(d.book, async (err, data) => {
    //                     const ddd = data.purchase + 1
    //                     await booksModel.Book.findByIdAndUpdate({ _id: d.book }, { purchase: ddd }, { new: true, runValidators: true }, (err, data) => {
    //                         if (err) return res.status(404).send(err);
    //                         return res.status(200).send(data);
    //                     });
    //                 });
    //             });
    //         })
    //     });
    // });
}
module.exports = {
    getAllcartsByUser,
    addNewCart,
    deleteUserCart,
    updateBuyCart
}
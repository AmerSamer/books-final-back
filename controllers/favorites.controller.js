const favoritesModel = require('../models/favorites.model');

const getAllFavoritesByUser = (req, res) => {
    const { id } = req.params
    favoritesModel.Favorites.find({ user: id }).populate('book').exec((err, data) => {
        if (err) console.log(err);
        return res.send(data)
    })
    // const { id } = req.params
    // const data = await cartsModel.Cart.find({user:id})
    // return res.status(200).json(data)
}
const addNewFavorites =  async (req, res) => {
    const { book, user } = req.body;
    const idExists = await favoritesModel.Favorites.findOne({book:book,user:user})
    if (!idExists) {
        const newFavorites = new favoritesModel.Favorites({
            user: user,
            book: book,
            favorites: true
        })
        newFavorites.save((err, data) => {
            if (err) return res.status(404).send(err);
            return res.status(200).send(data);
        });
    }else if((idExists) && (idExists.favorites)){
        favoritesModel.Favorites.findByIdAndUpdate({ _id: idExists._id }, {favorites: false}, { new: true, runValidators: true }, (err, data) => {
            if (err) return res.status(404).send(err);
            return res.status(200).send(data);
        });
        // return res.status(400).json({ error: "This Book Already Exist." });
    }else if((idExists) && (!idExists.favorites)){
        favoritesModel.Favorites.findByIdAndUpdate({ _id: idExists._id }, {favorites: true}, { new: true, runValidators: true }, (err, data) => {
            if (err) return res.status(404).send(err);
            return res.status(200).send(data);
        });
    }
}
const updateUserFavorites = (req, res) => {
    const { id } = req.params;
    favoritesModel.Favorites.findByIdAndUpdate({ _id: id }, {favorites: false}, { new: true, runValidators: true }, (err, data) => {
        if (err) return res.status(404).send(err);
        return res.status(200).send(data);
    });
    // const idExists = await cartsModel.Cart.findById(id);
    // if (!idExists) {
    //     return res.status(400).json({ error: "Book Not Valid." });
    // } else {
    //     cartsModel.Cart.findByIdAndDelete(id, (err, data) => {
    //         if (err) return res.status(404).send(err);
    //         return res.status(200).send(data);
    //     });
    // }
}
module.exports = {
    getAllFavoritesByUser,
    addNewFavorites,
    updateUserFavorites
}
const mongoose = require('mongoose');

const favoritesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "users",
        required: false,
    },
    book: {
        type: mongoose.Schema.Types.ObjectId, ref: "books",
        required: false,
    },
    favorites: {
        type: Boolean,
        default: true,
        required: false,
    }
});
const Favorites = mongoose.model('favorites', favoritesSchema);

module.exports = {
    Favorites
}


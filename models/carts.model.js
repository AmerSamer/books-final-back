const mongoose = require('mongoose');

const cartsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "users",
        required: false,
    },
    book: {
        type: mongoose.Schema.Types.ObjectId, ref: "books",
        required: false,
    },
    cart: {
        type: Boolean,
        default: true,
        required: false,
    }
});
const Cart = mongoose.model('carts', cartsSchema);

module.exports = {
    Cart
}


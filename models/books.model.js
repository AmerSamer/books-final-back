const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
    img:{
        type: Buffer
    },
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    publishing: {
        type: Number,
        required: true,
        validate: [
            {
                validator: (y) => {
                    const date = new Date().getFullYear();
                    return ((y <= date) && (y >= 1500))
                }, msg: 'must be an integer in [ 1500, 2021 ]'
            },
            { validator: Number.isInteger, msg: '{VALUE} is not an integer value' }
        ]
    },
    //////////////
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "users",
        required: false,
    },
    //////////////
    amount: {
        type: Number,
        default: 0,
        required: true,
        validate: [
            {
                validator: (y) => {
                    // const date = new Date().getFullYear();
                    return (y > 0)
                }, msg: 'must be an integer grater than 0'
            },
            { validator: Number.isInteger, msg: '{VALUE} is not an integer value' }
        ]
    },
    rating: {
        type: Number,
        default: 4,
        required: false,
        validate: {
            validator: (r) => {
                return ((r <= 5) && (r >= 0))
            }
        },
    },
    ////////////////
    comments: [{
        type: String,
        default: [],
        required: false,
    }],
    //////////////
    language: {
        type: String,
        required: true
    },
    /////////////
    category: {
        type: String,
        required: true,
    },
    ////////////////
    purchase: {
        type: Number,
        default: 0,
        required: false,
        validate: [
            { validator: Number.isInteger, msg: '{VALUE} is not an integer value' }
        ]
    },
    desc: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: true,
        validate: {
                validator: (y) => {
                    // const date = new Date().getFullYear();
                    return (y > 0)
                }, msg: 'must be grater than 0'
            }
    },
    bookUploadDate: {
        type: Date,
        required: false,
    },
});
const Book = mongoose.model('books', booksSchema);

module.exports = {
    Book
}


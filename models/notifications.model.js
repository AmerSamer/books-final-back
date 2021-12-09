const mongoose = require('mongoose');

const notificationsSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId, ref: "books",
        required: true,
    },
    usersender: {
        type: mongoose.Schema.Types.ObjectId, ref: "users",
        required: true,
    },
    userreceiver: {
        type: mongoose.Schema.Types.ObjectId, ref: "users",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    reply: {
        type: String,
        default: "",
        required: false,
    },
    isDone: {
        type: Boolean,
        default: false,
        required: false,
    },
});
const Notifications = mongoose.model('notifications', notificationsSchema);

module.exports = {
    Notifications
}


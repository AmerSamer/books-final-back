const notificationsModel = require('../models/notifications.model');

const getAllNotifications = async (req, res) => {
    const { id } = req.params
    notificationsModel.Notifications.find({ usersender: id }).populate('bookId').populate('usersender').exec((err, data) => {
        if (err) console.log(err);
        return res.send(data)
    })
    // const { id } = req.params
    // const data = await notificationsModel.Notifications.find({usersender:id})
    // return res.status(200).json(data)
}
const newNotificationSend = (req, res) => {
    const { bookId, usersender, userreceiver, title, content, reply, isDone } = req.body;
    const newNotification = new notificationsModel.Notifications({
        bookId: bookId,
        usersender: usersender,
        userreceiver: userreceiver,
        title: title,
        content: content,
        reply: reply,
        isDone: isDone
    })
    newNotification.save((err, data) => {
        if (err) return res.status(404).send(err);
        return res.status(200).send(data);
    });
 


    // const idExists = await cartsModel.Cart.findOne({ book: book, user: user })
    // if (!idExists) {
    //     const newCart = new cartsModel.Cart({
    //         user: user,
    //         book: book,
    //         cart: true
    //     })
    //     newCart.save((err, data) => {
    //         if (err) return res.status(404).send(err);
    //         return res.status(200).send(data);
    //     });
    // } else {
    //     return res.status(400).json({ error: "This Book Already Exist." });
    // }
}
module.exports = {
    newNotificationSend,
    getAllNotifications
}
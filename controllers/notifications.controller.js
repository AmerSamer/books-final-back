const notificationsModel = require('../models/notifications.model');

const getAllNotifications = async (req, res) => {
    const { id } = req.params
    notificationsModel.Notifications.find({ usersender: id })
    .populate('usersender')
    .populate('bookId')
    .populate('userreceiver')
    .exec((err, data) => {
        if (err) console.log(err);
        return res.send(data)
    })
    // const { id } = req.params
    // const data = await notificationsModel.Notifications.find({usersender:id})
    // return res.status(200).json(data)
}
const getAllNotificationsReceived = async (req, res) => {
    const { id } = req.params
    notificationsModel.Notifications.find({ userreceiver: id })
    .populate('usersender')
    .populate('bookId')
    .populate('userreceiver')
    .exec((err, data) => {
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
}
const notificationsReply = async (req, res) => {
    const { id } = req.params;
    const { reply } = req.body;
    const idExists = await notificationsModel.Notifications.findById(id);
    if (idExists) {
        const commentsArray = idExists.reply;
        commentsArray.push(reply)
        notificationsModel.Notifications.findByIdAndUpdate({ _id: id }, { reply: commentsArray }, { new: true, runValidators: true }, (err, data) => {
            if (err) return res.status(404).send(err);
            return res.status(200).send(data);
        });
    } else {
        return res.status(400).json({ error: "Notification Not Valid." });
    }
}
module.exports = {
    newNotificationSend,
    getAllNotifications,
    getAllNotificationsReceived,
    notificationsReply
}
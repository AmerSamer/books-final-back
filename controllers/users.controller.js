// const booksModel = require('../models/books.model');
const usersModel = require('../models/users.model');

// const jwt = require('jsonwebtoken')
// const mailgun = require("mailgun-js");
// const DOMAIN = 'sandbox2f572533b70e4c38b1eb312b8f614273.mailgun.org';
// const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN });

const getAllUsers = async (req, res) => {
    const data = await usersModel.User.find({})
    return res.status(200).json(data)
}
const addNewUser = (req, res) => {
    // const { id } = req.params
    const { name, email, password } = req.body;
    if (name && email && password) {
        usersModel.User.findOne({ email }).exec((err, user) => {
            if (user) {
                return res.status(400).json({ error: "Email already exists." });
            }
            const newUser = new usersModel.User({
                name: name,
                email: email,
                password: password,
                active: false
            })
            newUser.save((err, data) => {
                if (err) return res.status(404).json({ error: err });
                return res.status(200).json({ success: data });
            });
        })
    }
    else {
        return res.status(400).json({ error: "Something went wrong!" });
    }
}
const updateActivation = async (req, res) => {
    const { id } = req.params
    const idExists = await usersModel.User.findById(id);
    if (!idExists) {
        return res.status(400).json({ error: "Email Not Valid." });
    }
    //////////////////////
    // const idActive = await usersModel.User.findOne({ active: true });
    // if (idActive) {
    //     usersModel.User.findOneAndUpdate({ active: { $eq: true } }, { active: false }, { new: true, runValidators: true }, (err, data) => {
    //             if (err) return res.status(404).send(err);
    //             // res.status(200).send(data);
    //         });
    // }
    /////////////////////
    if (idExists) {
        usersModel.User.findByIdAndUpdate( id , { active: true }, { new: true, runValidators: true }, (err, data) => {
            if (err) return res.status(404).send(err);
            return res.status(200).send(data);
        });
    } else {
        return res.status(400).json({ error: 'Error' });
    }
}
const logoutActivation = async (req, res) => {
    const { id } = req.params
    const idExists = await usersModel.User.findById(id);
    if (!idExists) {
        return res.status(400).json({ error: "Email Not Valid." });
    }
    if (idExists) {
        usersModel.User.findByIdAndUpdate( id , { active: false }, { new: true, runValidators: true }, (err, data) => {
            if (err) return res.status(404).send(err);
            return res.status(200).send(data);
        });
    } else {
        return res.status(400).json({ error: 'Error' });
    }
}
module.exports = {
    getAllUsers,
    addNewUser,
    updateActivation,
    logoutActivation
}
const express = require('express');
const usersController = require('../controllers/users.controller')
const router = express.Router();


router.get('/', (req, res) => {
    usersController.getAllUsers(req, res);
})
.post('/', (req, res) => {
    usersController.addNewUser(req, res);
})
.put('/active/:id', (req, res) => {
    usersController.updateActivation(req, res);
})
.put('/logout/:id', (req, res) => {
    usersController.logoutActivation(req, res);
})

module.exports = router;
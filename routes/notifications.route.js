const express = require('express');
const notificationsController = require('../controllers/notifications.controller')
const router = express.Router();


router.post('/newNotifications/', (req, res) => {
    notificationsController.newNotificationSend(req, res);
})
router.get('/notifications/:id', (req, res) => {
    notificationsController.getAllNotifications(req, res);
})
router.get('/notificationsReceived/:id', (req, res) => {
    notificationsController.getAllNotificationsReceived(req, res);
})
router.put('/notificationsReply/:id', (req, res) => {
    notificationsController.notificationsReply(req, res);
})
module.exports = router;
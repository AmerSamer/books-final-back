const express = require('express');
const notificationsController = require('../controllers/notifications.controller')
const router = express.Router();


router.post('/newNotifications/', (req, res) => {
    notificationsController.newNotificationSend(req, res);
})


module.exports = router;
var express = require('express');
var router = express.Router();
var notifications = require('@controllers/notifications/notifications.controller');

router.get('/', notifications.getNotifications);
router.post('/read', notifications.markNotificationAsRead);
router.post('/delete', notifications.deleteNotification);

module.exports = router;
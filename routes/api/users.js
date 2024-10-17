const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router.route('/')
    .get(userController.getAllUsers);

router.route('/:email')
    .get(userController.getUserByEmail);

router.route('/getBookingByUserId/:userId')
    .get(userController.getBookingsForUser);

module.exports = router;
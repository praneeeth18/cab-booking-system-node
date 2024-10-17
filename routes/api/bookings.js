const express = require('express');
const router = express.Router();
const bookingController = require('../../controllers/bookingController');

router.route('/createBooking')
    .post(bookingController.createBooking);

router.route('/getAllBookings')
    .get(bookingController.getAllBookings);

router.route('/getBookingById/:id')
    .get(bookingController.getBookingById);

router.route('/updateBooking/:id')
    .put(bookingController.updateBooking);

router.route('/deleteBooking/:id')
    .delete(bookingController.deleteBooking);

module.exports = router;
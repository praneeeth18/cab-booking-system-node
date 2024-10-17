const User = require('../model/User');
const Booking = require('../model/Booking');

/// Create a new booking
exports.createBooking = async (req, res) => {
    try {
        const { userId, email, source, destination, cabModel, price, status } = req.body;

        // Ensure the user exists
        const user = await User.findOne({ userId: userId }).exec();
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const booking = new Booking({
            userId,
            email,
            source,
            destination,
            cabModel,
            price,
            status
        });

        await booking.save();

        // Update user's bookings array
        user.bookings.push(booking._id);
        await user.save();

        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a booking by ID
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a booking
exports.updateBooking = async (req, res) => {
    try {
        const { email, source, destination, cabModel, price, status } = req.body;
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { email, source, destination, cabModel, price, status },
            { new: true }
        );
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        // Remove booking ID from user's bookings array
        const user = await User.findOneAndUpdate(
            { bookings: req.params.id },
            { $pull: { bookings: req.params.id } }
        );

        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

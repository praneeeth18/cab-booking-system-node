const User = require('../model/User');

const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ 'message': 'No user found!'});
    res.json(users);
}

const getUserByEmail = async (req, res) => {
    if (!req?.params?.email) return res.status(400).json({ 'message': 'User email required!'});
    
    const foundUser = await User.findOne({ email: req.params.email }).exec();
    if (!foundUser) {
        return res.status(204).json({ 'message': `No user with email ${req.params.email} found!`});
    }
    res.json(foundUser);
}

// Get bookings for a specific user
const getBookingsForUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find the user and populate their bookings
        const user = await User.findOne({ userId: userId}).populate('bookings').exec();
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user.bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    getAllUsers,
    getUserByEmail,
    getBookingsForUser
}
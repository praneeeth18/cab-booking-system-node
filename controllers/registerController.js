const User = require('../model/User');
const bcrypt = require('bcrypt');

const addNewUser = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    // Validate request body
    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ message: 'All details are required!' });
    }

    try {
        // Check if user already exists
        const duplicate = await User.findOne({ email: email }).exec();
        if (duplicate) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashedPassword
        });

        console.log('New user created:', newUser);

        // Send success response
        res.status(201).json({ success: `New user ${firstname} created successfully.` });
    } catch (err) {
        // Handle errors
        console.error('Error creating user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { addNewUser };

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: {
        type: Number,
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Admin: Number
    },
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
    refreshToken: String
});

// Apply the auto-increment plugin to the booking schema
userSchema.plugin(AutoIncrement, { inc_field: 'userId' });

module.exports = mongoose.model('User', userSchema);
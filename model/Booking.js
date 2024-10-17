const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    userId: {
        type: Number, 
        ref: 'User',
        required: true
    },  
    source: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    cabModel: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Booking', bookingSchema);

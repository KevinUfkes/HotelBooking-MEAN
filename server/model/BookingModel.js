const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    hotel_id: {
        type: String,
        required: true
    },
    booking_date: {
        type: String
    },
    booking_start: {
        type: String
    },
    booking_end: {
        type: String
    },
    user_id: {
        type: String,
        required: true
    }
})

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;
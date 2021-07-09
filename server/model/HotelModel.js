const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    street: {
        type: String, 
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    postal_code: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        //index: true, //Optional if unique is defined
        unique: [true, "Duplicate Email Not allowed"],
        trim: true,
        uppercase: true,
        //minlength:10,
        //maxlength: 50,
        //Custom validation
        validate: function(value) {
          var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          return emailRegex.test(value);
        }
    },
    img: [
        {
            type: String
        }    
    ]
})

const Hotel = mongoose.model("Hotel", HotelSchema);
module.exports = Hotel;
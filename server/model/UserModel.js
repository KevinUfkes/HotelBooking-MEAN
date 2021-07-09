const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: [true, "Duplicate Username Not allowed"],
    },
    password: {
        type: String, 
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: [true, "Duplicate Email Not allowed"],
    },
    img: {
        type: String
    }
})

const User = mongoose.model("User", UserSchema);
module.exports = User;
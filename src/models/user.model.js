const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        RegExp: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/  // Minimum eight characters, at least one letter and one number
    }
});

module.exports = mongoose.model('User', userSchema)
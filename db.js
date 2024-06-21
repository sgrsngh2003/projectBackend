const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    img: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        street: {
            type: String,
            required: true
        },
        suite: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        zipcode: {
            type: Number,
            required: true
        }
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

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
        required: true
    },

    gender: String,

    phone: String,

    address: String,

    dob: String,

    style: String,

    size: String,

    cart: [
        {
            name: String,
            price: String,
            image: String
        }
    ],

    wishlist: [
        {
            name: String,
            price: String,
            image: String
        }
    ],

    orderHistory: [
        {
            items: Array,
            total: Number,
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]

});

const User = mongoose.model("User", userSchema);

module.exports = User;
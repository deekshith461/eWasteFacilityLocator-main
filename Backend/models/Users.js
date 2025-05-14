const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true, // Fixed the typo from "require" to "required"
            min: 3,
            max: 20,
            unique: true,
        },
        phone: {
            type: Number, // Changed to Number
            required: true,
            min: 1000000000, // Minimum value for a 10-digit number
            max: 9999999999, // Maximum value for a 10-digit number
            validate: {
                validator: function(v) {
                    return /^\d{10}$/.test(v); // Validates that it is exactly 10 digits
                },
                message: props => `${props.value} is not a valid phone number!`
            }
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 6,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

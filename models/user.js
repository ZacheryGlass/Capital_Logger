const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create User Schema
const UserSchema = new Schema({
    googleId: {
        type: String,
        required: [true, 'googleId field is required'],
    },
    name: {
        type: String,
        required: [true, 'Name field is required'],
    },
    email: {
        type: String,
        required: [true, 'Email field is required'],
    },
    accessToken: {
        type: String,
        required: [true, 'accessToken field is required'],
    },
});

// Create a model
const User = mongoose.model('User', UserSchema);

// export the 'User' mongoose model
module.exports = User;

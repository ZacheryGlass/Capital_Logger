const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create User Schema
const UserSchema = new Schema({
    googleID: {
        type: String,
        required: [true, 'googleID field is required'],
    },
    username: {
        type: String,
        required: [true, 'Name field is required'],
    },
    email: {
        type: String,
        required: [true, 'Email field is required'],
    },
});

// Create a model
const User = mongoose.model('User', UserSchema);

// export the 'User' mongoose model
module.exports = User;

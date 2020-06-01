const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create user Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required'],
    },
    id: {
        type: Number,
        default: -1,
    },
    // additional object properties here
});

// Create a model
const User = mongoose.model('user', UserSchema);

// export the 'User' mongoose model
module.exports = User;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-find-or-create');

// create User Schema
const UserSchema = new Schema({
    googleID: {
        type: String,
        required: [true, 'googleID field is required'],
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
    },
});

UserSchema.plugin(findOrCreate);

// Create a model
const User = mongoose.model('User', UserSchema);

// export the 'User' mongoose model
module.exports = User;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create sheet Schema
const SheetSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required'],
    },
    // additional object properties here
});

// Create a model
const Sheet = mongoose.model('sheet', SheetSchema);

// export the 'Sheet' mongoose model
module.exports = Sheet;

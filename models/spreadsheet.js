const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-find-or-create');

// create spreadsheet Schema
const SpreadsheetSchema = new Schema({
    Id: {
        type: String,
        required: [true, 'Id field is required'],
    },
    Name: {
        type: String,
        required: [true, 'Name field is required'],
    },
    Url: {
        type: String,
        required: [true, 'Url field is required'],
    },
    ownerGoogleId: {
        type: String,
        required: [true, 'ownerGoogleId field is required'],
    },
    // additional object properties here
});

SpreadsheetSchema.plugin(findOrCreate);

// Create a model
const Spreadsheet = mongoose.model('spreadsheet', SpreadsheetSchema);

// export the 'Spreadsheet' mongoose model
module.exports = Spreadsheet;

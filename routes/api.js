const express = require('express');
const router = express.Router();
const Spreadsheet = require('../models/spreadsheet');
const keys = require('../config/keys');

router.get('/sheet/:id', (req, res) => {
    Spreadsheet.findOne({ _id: req.params.id }).then((spreadsheet) => {
        console.log('Retrieved object from database', spreadsheet);
        res.send(spreadsheet);
    });
});

// add spreadsheet to database
router.post('/sheet', (req, res, next) => {
    const { google } = require('googleapis');
    const sheets = google.sheets('v4');

    const request = {
        resource: {
            properties: {
                title: req.body.ssName,
            },
        },
        access_token: req.user.accessToken,
    };

    sheets.spreadsheets
        .create(request)
        // on sucessful validation of the user-specified json, add to db
        .then((spreadsheet) => {
            console.log('New Google Spreadsheet Created');

            new Spreadsheet({
                Id: spreadsheet.data.spreadsheetId,
                Name: spreadsheet.data.properties.title,
                Url: spreadsheet.data.spreadsheetUrl,
                ownerGoogleId: req.user.googleId,
            })
                .save()
                .then((newSpreadsheet) => {
                    console.log('Created New Spreadsheet: ', newSpreadsheet);
                });

            res.send(spreadsheet);
        })
        // on unsucessful validation of the user-specified json, call next piece of middleware in index.js
        .catch(next);
});

// update spreadsheet in database
router.put('/sheet/:id', (req, res) => {
    // update spreadsheet in db, then find the updated spreadsheet, then return to client
    Spreadsheet.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
        Spreadsheet.findOne({ _id: req.params.id }).then(
            (updatedSpeadsheet) => {
                console.log('Updated object in database', updatedSpeadsheet);
                res.send(updatedSpeadsheet);
            }
        );
    });
});

// delete spreadsheet from database
router.delete('/sheet/:id', (req, res) => {
    Spreadsheet.findByIdAndRemove({ _id: req.params.id }).then(
        (removedSpreadsheet) => {
            console.log('Removed object from database', removedSpreadsheet);
            res.send(removedSpreadsheet);
        }
    );
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Sheet = require('../models/sheet');
const keys = require('../config/keys');

router.get('/sheet/:id', (req, res) => {
    Sheet.findOne({ _id: req.params.id }).then((sheet) => {
        console.log('Retrieved object from database', sheet);
        res.send(sheet);
    });
});

// add sheets to database
router.post('/sheet', (req, res, next) => {
    const { google } = require('googleapis');
    const sheets = google.sheets('v4');

    const request = {
        resource: {
            properties: {
                title: 'New Sheet',
            },
        },
        access_token: req.user.accessToken,
    };

    sheets.spreadsheets
        .create(request)
        // on sucessful validation of the user-specified json, add to db
        .then((sheetData) => {
            console.log('New Sheet Created');
            // add sheet to DB here (sheetData)
            res.send(sheetData);
        })
        // on unsucessful validation of the user-specified json, call next piece of middleware in index.js
        .catch(next);
});

// update sheet in database
router.put('/sheet/:id', (req, res) => {
    // update sheet in db, then find the updated sheet, then return to client
    Sheet.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
        Sheet.findOne({ _id: req.params.id }).then((updatedSheet) => {
            console.log('Updated object in database', updatedSheet);
            res.send(updatedSheet);
        });
    });
});

// delete sheet from database
router.delete('/sheet/:id', (req, res) => {
    Sheet.findByIdAndRemove({ _id: req.params.id }).then((removedSheet) => {
        console.log('Removed object from database', removedSheet);
        res.send(removedSheet);
    });
});

module.exports = router;

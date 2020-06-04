const express = require('express');
const router = express.Router();
const Sheet = require('../models/sheet');

// get list of sheets from database
router.get('/sheets', (req, res) => {
    res.send({ type: 'GET' });
});

router.get('/sheet/:id', (req, res) => {
    res.send({ type: 'GET' });
});

// add sheets to database
router.post('/sheets', (req, res, next) => {
    Sheet.create(req.body)
        // on sucessful validation of the user-specified json, add to db
        .then((sheetData) => {
            console.log('Added object to database', sheetData);
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

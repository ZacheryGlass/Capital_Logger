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
    // create new sheet in db based on json data sent in the post request
    let sheet = req.body;

    Sheet.create(sheet)
        // on sucessful validation of the user-specified json, add to db
        .then((sheetData) => {
            console.log('Adding object to database', sheet);
            res.send(sheetData);
        })
        // on unsucessful validation of the user-specified json, call next piece of middleware
        .catch(next);
});

// update sheet in database
router.put('/sheet/:id', (req, res) => {
    res.send({ type: 'PUT' });
});

// delete sheet from database
router.delete('/sheet/:id', (req, res) => {
    res.send({ type: 'DELETE' });
});

module.exports = router;

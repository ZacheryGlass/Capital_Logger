const express = require('express');
const router = express.Router();
const User = require('../models/user');

// get list of users from database
router.get('/users', (req, res) => {
    res.send({ type: 'GET' });
});

router.get('/users/:id', (req, res) => {
    res.send({ type: 'GET' });
});

// add users to database
router.post('/users', (req, res) => {
    // create new user in db based on json data sent in the post request
    let user = req.body;

    const error = null;
    if (error) {
        console.log('bad post request');
        res.status(400).send(error.details[0].message); // 400 Bad Request
        return;
    }

    // user is valid. Add to database, then return the request

    User.create(req.body).then((userData) => {
        console.log('Adding object to database', req.body);
        res.send(userData);
    });
});

// update user in database
router.put('/users/:id', (req, res) => {
    res.send({ type: 'PUT' });
});

// delete user from database
router.delete('/users/:id', (req, res) => {
    res.send({ type: 'DELETE' });
});

module.exports = router;

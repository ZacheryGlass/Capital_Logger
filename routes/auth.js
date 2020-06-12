const express = require('express');
const router = express.Router();
// const User = require('../models/user');
const passport = require('passport');

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/logout', (req, res) => {
    // handle with passport
    res.send('Logging Out.');
});

router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile'],
    })
);

module.exports = router;

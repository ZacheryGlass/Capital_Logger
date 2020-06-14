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

// navigating to /auth/google will fire the passport google sign in
// after the google sign, you will return to the redirect
router.get(
    '/google',
    passport.authenticate('google', {
        scope: [
            'profile',
            'email',
            'https://www.googleapis.com/auth/spreadsheets',
        ],
    })
);

// when you hit the redirect, you will excecure the following 2 functions
// First is a passort function, which triggers the callback function that
// is set as part of your GoogleStrategy,serializes user, sends cookie, etc.
// Finally, the arrow function below will execute, with the user attached
// to the 'req' object
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    console.log('Use is logged in: ' + req.user.name);
    res.redirect('/');
});

module.exports = router;

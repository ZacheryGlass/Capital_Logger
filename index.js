const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const passportSetup = require('./config/passport_setup');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const authCheck = require('./config/auth_check');

// set up express app.
const app = express();

app.use(
    cookieSession({
        maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
        keys: [keys.session.cookieKey],
    })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// app.use(express.static('public'));
app.set('view engine', 'ejs');

// connect to db
mongoose.connect(
    keys.mongodb.dbURI,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    },
    () => {
        console.log('connected to mongodb');
    }
);
// mongoose.Promise = global.Promise; // deprecated

app.use(express.static(__dirname + '/styles'));

// create home page
app.get('/', authCheck, (req, res) => {
    res.render('home');
});

// parses json request and attach to route handler
// (order of app.use matters here)
app.use(express.json());

// initialize additional routes
app.use('/api', require('./routes/api'));
app.use('/auth', require('./routes/auth'));

// error handling middleware
app.use((err, req, res, next) => {
    console.log('error: ' + err);
    res.status(422).send({ error: err.message });
});

// process is a global variable.
// Use the eviroment variable if it's set, otherwise use port 3000.
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));

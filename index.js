const express = require('express');
const mongoose = require('mongoose');
const passportSetup = require('./config/passport_setup');

// set up express app.
const app = express();

mongoose.connect('mongodb://localhost/capital_logger', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
// mongoose.Promise = global.Promise; // deprecated

// app.use(express.static('public'));
app.set('view engine', 'ejs');

// create home page
app.get('/', (req, res) => {
    res.render('home');
});

// parses json request and attach to route handler
// (order of app.use matters here)
app.use(express.json());

// // initialize passport for authentication
// app.use(passport.initialize());
// app.use(passport.session());

// initialize additional routes
app.use('/api', require('./routes/api'));
app.use('/auth', require('./routes/auth'));

// error handling middleware
app.use((err, req, res, next) => {
    console.log('zg');
    res.status(422).send({ error: err.message });
});

// process is a global variable.
// Use the eviroment variable if it's set, otherwise use port 3000.
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));

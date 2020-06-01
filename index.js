const express = require('express');
const mongoose = require('mongoose');

// set up express app.
const app = express();

mongoose.connect('mongodb://localhost/capital_logger');
mongoose.Promise = global.Promise;

// parses json request and attach to route handler
// (order of app.use matters here)
app.use(express.json());

// initialize api routes
app.use('/api', require('./routes/api'));

// process is a gloval variable.
// Use the eviroment variable if it's set, otherwise use port 3000.
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));

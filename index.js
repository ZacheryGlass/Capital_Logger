const express = require('express');
const app = express();
const routes = require('./routes/api');

app.use(routes);

// process is a gloval variable.
// Use the eviroment variable if it's set, otherwise use port 3000.
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));

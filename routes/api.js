const Joi = require('joi');
const express = require('express');
const router = express.Router();

// home page
router.get('/', (req, res) => {
    res.send({ type: 'GET' });
});

// get list of users from database
router.get('/users', (req, res) => {
    res.send({ type: 'GET' });
});

router.get('/users/:id', (req, res) => {
    res.send({ type: 'GET' });
    // // find the requested user in the db
    // const user = users.find(c => c.id === parseInt(req.params.id));
    // if (!user) {
    //     res.status(404).send('The user with the given ID was not found.');
    //     return;
    // } else {
    //     // user exists, return it
    //     res.send(user);
    // }
});

// add users to database
router.post('/users', (req, res) => {
    res.send({ type: 'POST' });

    // const { error } = validate_user(req.body);
    // if (error) {
    //     res.status(400).send(error.details[0].message); // 400 Bad Request
    //     return;
    // }

    // // create the requested user
    // const user = {
    //     id: (user.length + 1),
    //     name: req.body.name
    // };

    // // add the new user object to the db
    // /* add user here */

    // // return the created object
    // res.send(user);
});

// update user in database
router.put('/users/:id', (req, res) => {
    res.send({ type: 'PUT' });

    // // Lookup user from db
    // const user = null

    // // If doesn't exist, return 404
    // if (!user) {
    //     res.status(404).send('The user with the given ID was not found.');
    //     return;
    // }

    // // user exists, validate POST reqest params
    // const { error } = validate_user(req.body);
    // if (error) {
    //     res.status(400).send(error.details[0].message); // 400 Bad Request
    //     return;
    // }

    // // Request is valid, update user
    // user.name = req.body.name;

    // // Return the updated user
    // res.send(user);
});

// delete user from database
router.delete('/users/:id', (req, res) => {
    res.send({ type: 'DELETE' });

    // // Lookup user in database
    // // const user = null

    // // If doesn't exist, return 404
    // if (!user) {
    //     res.status(404).send('The user with the given ID was not found.');
    //     return;
    // }

    // // user exists, delete it from database
    // /* remove user from database */

    // res.send(user);
});

/*--------------------------------------------------
    Validate user parameters for PUT and POST
--------------------------------------------------*/
function validate_user(user) {
    const scheme = {
        name: Joi.string().min(3).required(),
    };

    return Joi.validate(user, scheme);
}

module.exports = router;

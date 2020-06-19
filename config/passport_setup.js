const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user');

passport.serializeUser((user, done) => {
    let err = null;
    // use the mongodb _id as an identifier for browser cookie.
    // call 'done()' to send cookie to browser
    console.log('serializing user');
    done(err, user.id);
});

passport.deserializeUser((id, done) => {
    // id is retreived from the cookie
    // find the user in the db with this ID

    User.findById(id).then((user) => {
        // console.log('Found user: ' + user.name);

        // attach this db user to req.user for future requests
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            //options for the google strategy
            callbackURL: '/auth/google/redirect',
            clientID: keys.google_signin.clientID,
            clientSecret: keys.google_signin.clientSecret,
        },
        (accessToken, refreshToken, googleProfile, done) => {
            // GoogleStrategy callback function
            // this functon executes after the user has signed in on the Google consent screen

            // check if user already exists in our own db
            User.findOne({
                googleId: googleProfile.id,
            }).then((curUser) => {
                if (curUser) {
                    // already have this user

                    // update access token in db
                    User.findByIdAndUpdate(
                        curUser.id,
                        {
                            googleId: googleProfile.id,
                            email: googleProfile.emails[0].value,
                            name: googleProfile.displayName,
                            accessToken: accessToken, // <-- new access token
                        },
                        {
                            new: true, //  true to return the modified document rather than the original
                            useFindAndModify: false,
                        },
                        (err, updatedUser) => {
                            if (!err) {
                                done(null, curUser);
                            } else {
                                // handle error here or pass it through
                                done(err, curUser);
                            }
                        }
                    );
                } else {
                    // never seen this user before, so create user in our db
                    console.log('Creating new User.');
                    new User({
                        googleId: googleProfile.id,
                        email: googleProfile.emails[0].value,
                        name: googleProfile.displayName,
                        accessToken: accessToken,
                    })
                        .save()
                        .then((newUser) => {
                            console.log('Created new user: ', newUser.name);
                            done(null, newUser);
                        });
                }
            });
        }
    )
);

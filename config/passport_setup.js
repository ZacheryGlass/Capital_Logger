const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user');

passport.serializeUser((user, done) => {
    let err = null;
    // use the mongodb _id as an identifier for browser cookie.
    // call 'done()' to send cookie to browser
    console.log('serializing user');
    console.log('error: ' + err);
    done(err, user.id);
});

passport.deserializeUser((id, done) => {
    // id is retreived from the cookie
    // find the user in the db with this ID
    console.log('deserializing user');
    User.findById(id).then((user) => {
        console.log('Found user: ' + user.name);

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
            console.log('Profile retrieved from Google: ');
            console.log(googleProfile);

            User.findOrCreate(
                {
                    googleID: googleProfile.id,
                    email: googleProfile.emails[0].value,
                    name: googleProfile.displayName,
                    accessToken: accessToken,
                },
                (err, user) => {
                    // my new or existing model is loaded as result
                    // console.log('DB User: ' + user);

                    // call done to move onto next step: serializeUser
                    done(err, user);
                }
            );
        }
    )
);

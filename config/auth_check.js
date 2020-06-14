module.exports = (req, res, next) => {
    console.log('Checking authentication');
    let isLoggedIn = req.user != null;

    if (isLoggedIn) {
        next();
    } else {
        res.redirect('/auth/login');
    }
};

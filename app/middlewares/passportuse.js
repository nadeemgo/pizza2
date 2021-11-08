const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user.js')
const bcrypt = require('bcrypt')

function passportuse(passport) {

    passport.use(new LocalStrategy({ usernameField: 'email' },
        function(email, password, done) {
            User.findOne({ email: email }, async(err, user) => {
                if (err) { return done(err); }
                if (!user) { return done(null, false, { message: 'user not found' }); }
                var pass = await bcrypt.compare(password, user.password)
                if (!pass) { return done(null, false, { message: 'password not found' }); }
                return done(null, user);
            });
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}


module.exports = passportuse
const bcrypt = require('bcrypt')
const User = require('../../models/user.js')
const passport = require('passport')

function logincontroller() {
    return {
        login: (req, res) => {
            res.render('pages/login.ejs')
        },
        postlogin: (req, res, next) => {
            console.log('before authenticate');
            passport.authenticate('local', (err, user, info) => {
                console.log('authenticate callback');
                if (err) { return res.send({ 'status': 'err', 'message': err.message }); }
                if (!user) { return res.send({ 'status': 'fail', 'message': info.message }); }
                req.logIn(user, (err) => {
                    if (err) { return res.send({ 'status': 'err', 'message': err.message }); }
                    return res.redirect('/');

                });
            })(req, res, next);
        },
        logincart: (req, res) => {
            res.render('pages/logincart.ejs')
        },
        postlogincart: (req, res, next) => {
            console.log('before authenticate');
            passport.authenticate('local', (err, user, info) => {
                console.log('authenticate callback');
                if (err) { return res.send({ 'status': 'err', 'message': err.message }); }
                if (!user) { return res.send({ 'status': 'fail', 'message': info.message }); }
                req.logIn(user, (err) => {
                    if (err) { return res.send({ 'status': 'err', 'message': err.message }); }
                    return res.redirect('/cart');

                });
            })(req, res, next);
        },

        register: (req, res) => {
            res.render('pages/register.ejs')
        },
        postregister: async(req, res) => {
            const { username, email, password } = req.body
            if (!username || !email || !password) {
                console.log('req.body:', req.body)
                req.flash('error', 'All fields are required!')
                req.flash('name', username)
                req.flash('email', email)
                return res.redirect('/register')
            }
            try {
                var resp = await User.findOne({ email: email })
                console.log('resp', resp)
                if (resp) {
                    req.flash('error', 'Email already exists!')
                    req.flash('name', username)
                    req.flash('email', email)
                    return res.redirect('/register')
                }

            } catch (error) {
                req.flash('error', 'Something went wrong')
                return res.redirect('/register')

            }

            try {
                var secretpassword = await bcrypt.hash(password, 10)

            } catch (error) {
                console.log('error:', error)
            }
            console.log('secretpassword:', secretpassword)
            var data = {
                username: username,
                email: email,
                password: secretpassword,
            }
            var user = new User(data)
            console.log('user:', user)

            try {
                var resp = await user.save()
                console.log('resp:', resp)
                return res.redirect('/')

            } catch (error) {
                console.log('error:', error)
                return res.redirect('/register')

            }
        },
        postlogout: (req, res) => {
            console.log('req.logout')
                // req.logout(req.user, (err) => {
                //     if (err) { console.log('error in logging out the user') }
                //     return res.redirect('/')
                // })
            req.logout()
            return res.redirect('/cart')


        }
    }
}

module.exports = logincontroller
const Checkout = require('../../models/checkout.js')

function checkoutcontroller() {
    return {
        checkout: async(req, res) => {
            var checkout = {
                    fullname: 'nadeem gohar',
                    email: 'nadeemgohar@gmail.com',
                    address: '10 rogerson rd.,',
                    city: 'toronto',
                    zip: 'L5v 2x6',
                    billingaddress: { type: Boolean, default: true },

                    ccname: 'nadeem gohar',
                    ccnumber: '2345 3412 2456',
                    expmonth: '10',
                    expyear: '2025',
                    securitycvv: '234',

                }
                // console.log('checkout:', checkout)
            try {
                // var checkoutdata = new Checkout(formcheckout)
                // var checkoutresp = await Checkout.find()

                // console.log('checkoutresp:', checkoutresp)
            } catch (error) {
                console.log(error)
            }

            res.render('testing/testcheckout.ejs', { data: checkout })

        },
        postcheckout: async(req, res) => {

            const { fullname, email, address, city, zip } = req.body
            const { ccname, ccnumber, expmonth, expyear, securitycvv } = req.body

            var formcheckout = {
                fullname: fullname,
                email: email,
                address: address,
                city: city,
                zip: zip,

                ccname: ccname,
                ccnumber: ccnumber,
                expmonth: expmonth,
                expyear: expyear,
                securitycvv: securitycvv,

            }

            try {
                var checkoutdata = new Checkout(formcheckout)
                var checkoutresp = await checkoutdata.save()

                console.log('checkoutresp:', checkoutresp)
                res.redirect('/checkout/list')

            } catch (error) {
                console.log(error)
            }
        },
        checkoutlist: async(req, res) => {
            try {
                var checkoutresp = await Checkout.find().limit(10).exec()

                console.log('checkoutresp:', checkoutresp)
                res.render('testing/checkoutorders.ejs', { data: checkoutresp })
            } catch (error) {
                console.log(error)
            }
        },
        checkoutdisplay: async(req, res) => {
            try {
                // var checkoutdata = new Checkout(formcheckout)
                var checkoutresp = await Checkout.findOne({ _id: req.params.id })

                console.log('checkoutresp:', checkoutresp)
                res.render('testing/checkoutdisplay.ejs', { data: checkoutresp })
            } catch (error) {
                console.log(error)
                res.redirect('/checkoutlist')
            }
        },
    }
}

module.exports = checkoutcontroller
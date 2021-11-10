const User = require('./user.js')

const mongoose = require('mongoose')
const { Schema } = mongoose

const checkoutschema = new Schema({

    fullname: { type: String },
    email: { type: String },
    address: { type: String },
    city: { type: String },
    zip: { type: String },
    billingaddress: { type: Boolean, default: true },

    ccname: { type: String },
    ccnumber: { type: String },
    expmonth: { type: String },
    expyear: { type: String },
    securitycvv: { type: String },

}, { timestamps: true })

const Checkout = mongoose.model('Checkout', checkoutschema)

module.exports = Checkout

const checkoutsave = () => {
        const newcheckout = {
            fullname: 'pizza4',
            email: 1,
            address: 25,
            city: '',
            zip: '',
            billingaddress: '',

            // cctoken:'',

        }

        const checkoutdata = new Checkout(newcheckout)
        checkoutdata.save()
            .then(checkoutresp => {
                console.log('product', checkoutresp)

            }).catch(err => { console.log('checkoutsaveerr:', err) })
    }
    // checkoutsave()
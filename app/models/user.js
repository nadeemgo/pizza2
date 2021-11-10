const mongoose = require('mongoose')
const { Schema } = mongoose

const userschema = new Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String, default: 'customer' }
}, { timestamps: true })

const User = mongoose.model('User', userschema)

module.exports = User

const usersave = () => {
        const newuser = {
            name: 'pizza4',
            qty: 1,
            price: 25
        }

        const userdata = new Product(newuser)
        userdata.save()
            .then(userresp => {
                console.log('product', userresp)

            }).catch(err => { console.log('usersaveerr:', err) })
    }
    // usersave()
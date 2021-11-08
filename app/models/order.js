const User = require('./user.js')

const mongoose = require('mongoose')
const { Schema } = mongoose

const orderschema = new Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    cart: { type: Object },
    address: { type: String },
    phone: { type: String },
    payment: { type: String, default: 'COD' },
    status: {
        type: String,
        default: 'order-placed'
    }
}, { timestamps: true })

const Order = mongoose.model('Order', orderschema)

module.exports = Order
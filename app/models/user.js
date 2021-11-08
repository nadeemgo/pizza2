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
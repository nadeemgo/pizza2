const mongoose = require('mongoose')
const { Schema } = mongoose

const productschema = new Schema({
    name: { type: String },
    qty: { type: Number },
    price: { type: Number }
})

const Product = mongoose.model('Product', productschema)

module.exports = Product
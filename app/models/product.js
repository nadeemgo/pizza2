const mongoose = require('mongoose')
const { Schema } = mongoose

const productschema = new Schema({
    name: { type: String },
    qty: { type: Number },
    price: { type: Number }
})

const Product = mongoose.model('Product', productschema)

module.exports = Product

const productsave = () => {
        const newproduct = {
            name: 'pizza4',
            qty: 1,
            price: 25
        }

        const productdata = new Product(newproduct)
        productdata.save()
            .then(productresp => {
                console.log('product', productresp)

            }).catch(err => { console.log('productsaveerr:', err) })
    }
    // productsave()
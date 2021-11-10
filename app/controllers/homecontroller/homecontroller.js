const Product = require("../../models/product")

function homecontroller() {
    return {
        home: async(req, res) => {
            console.log('req.session', req.session)
            try {
                const productresp = await Product.find()
                    // console.log('resp:', resp)
                return res.render('pages/home', { data: productresp })
            } catch (error) {
                console.log('error:', error)
            }
            // res.render('pages/home', { data: '' })


        },
        update: (req, res) => {
            console.log('req.body', req.body)
            if (req.session.cart) {
                console.log('req.session.cart', req.session.cart)
            }
            // var cart = {
            //     items: {
            //         pizzaid: { item: pizzaobject, qty: 0 }
            //     },
            //     totalqty: 0,
            //     totalprice: 0,
            // }

            if (!req.session.cart) {
                req.session.cart = {
                    items: {},
                    totalqty: 0,
                    totalprice: 0,
                }
                let cart = req.session.cart
                cart.items[req.body._id] = req.body
                cart.totalqty = cart.totalqty + 1
                cart.totalprice = cart.totalprice + req.body.price


            } else {
                let cart = req.session.cart
                console.log('cart:', cart)
                console.log('cart.items[req.body._id]:', cart.items[req.body._id])
                if (!cart.items[req.body._id]) {
                    cart.items[req.body._id] = req.body
                    cart.totalqty = cart.totalqty + 1
                    cart.totalprice = cart.totalprice + req.body.price
                } else {
                    cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
                    cart.totalprice = cart.totalprice + req.body.price
                }
            }
            var cartsess = req.session.cart
            console.log('cart: ', req.session.cart)
            res.send({ totalqty: cartsess.totalqty })
        }
    }
}

module.exports = homecontroller
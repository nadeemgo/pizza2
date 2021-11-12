const Order = require('../../models/order.js')
const moment = require('moment')

function cartcontroller() {
    return {
        cart: (req, res) => {
            var cart = req.session.cart
            res.render('pages/cart.ejs', { cart: cart })
        },
        postorder: async(req, res) => {
            const { address, phone } = req.body
            if (!address || !phone) {
                console.log('req.body:', req.body)
                req.flash('error', 'All fields are required!')
                req.flash('address', address)
                req.flash('phone', phone)
                return res.redirect('/cart')
            }

            var orderdata = {
                customerId: req.user._id,
                cart: req.session.cart,
                address: address,
                phone: phone,
            }

            try {
                const neworder = new Order(orderdata)
                const ordersaved = await neworder.save()
                req.flash('success', 'Order saved successfully')

                console.log('ordersaved:', ordersaved)
                var eventEmitter = req.app.get('eventEmitter')
                eventEmitter.emit('neworder', ordersaved)

                delete req.session.cart
                return res.redirect('/order')
            } catch (error) {
                console.log('error', error)
                return res.redirect('/order')
            }
            console.log('orderdata', orderdata)
        },
        order: async(req, res) => {

            try {
                const orderresp = await Order.find({ customerId: req.user._id }).populate('customerId')
                    .sort({ _id: -1 }).exec()
                    // console.log('req.user', req.user)

                const eventEmitter = req.app.get('eventEmitter')
                eventEmitter.emit('orderlist', orderresp)

                console.log('ordersresp:', orderresp.length)
                var length = orderresp.length
                    // return res.redirect('/cart')
                return res.render('pages/order.ejs', { order: orderresp, orderlength: length, moment: moment })


            } catch (error) {
                console.log('error:', error)
                return res.redirect('/order')
            }
        },
        orderstatus: async(req, res) => {
            console.log('req.params.id: ', req.params.id)
            try {
                const findorderresponse = await Order.findOne({ _id: req.params.id })

                // const updatedorder = await Order.updateOne({ _id: '6156177d23363cc4cf54b4e2' }, { status: 'completed' })

                console.log('updatedorder: ', findorderresponse)


                return res.render('pages/orderstatus.ejs', { order: findorderresponse })
            } catch (error) {
                console.log('error: ', error)

            }
        },
        deletecart: (req, res) => {
            delete req.session.cart
            return res.redirect('/cart')
        }
    }
}

module.exports = cartcontroller
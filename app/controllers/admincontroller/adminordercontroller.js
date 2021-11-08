const Order = require("../../models/order")
const moment = require('moment')

function admincontroller() {
    return {
        adminorder: async(req, res) => {
            try {
                const orderresp = await Order.find().sort({ _id: -1 }).exec()
                    // console.log('order:', orderresp[0], orderresp.length)
                var length = orderresp.length

                const eventEmitter = req.app.get('eventEmitter')
                eventEmitter.emit('neworder', 'server admin order status created')

                // await Order.find().limit(10).sort({$ne: 'completed'}).exec()
                res.render('pages/admin.ejs', { order: orderresp, orderlength: length, moment: moment })
            } catch (error) {
                console.log('error', error)
            }
        },
        adminupdateorderstatus: async(req, res) => {
            const { orderid, selectvalue } = req.body
            console.log('req.body', req.body)

            try {
                // const findresponse = await Order.findOne({ _id: '6158893c63bb6391a48abc17' })
                const updateresponse = await Order.updateOne({ _id: orderid }, { status: selectvalue })

                console.log('updatedorder: ', updateresponse)
                console.log('emit event FirstEvent:')

                const eventEmitter = req.app.get('eventEmitter')
                eventEmitter.emit('statusupdate', { id: req.body.orderid, status: req.body.selectvalue })

                return res.redirect('/admin')
            } catch (error) {
                console.log('error: ', error)

            }
        }
    }
}

module.exports = { admincontroller }
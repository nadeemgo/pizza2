const express = require('express')
const app = express()
const stripe = require('stripe')('sk_test_Hrs6SAopgFPF0bZXSN3f6ELN')
const passport = require('passport')
const flash = require('express-flash')
const path = require('path')
var expressLayouts = require('express-ejs-layouts');
var session = require('express-session')
const { Server } = require("socket.io");
const dotenv = require('dotenv').config()
console.log(process.env.PORT)

var events = require('events');
var eventEmitter = new events();
app.set('eventEmitter', eventEmitter)
    // var em = new events.EventEmitter();

const mongoose = require('mongoose')
    // var MongoStore = require('connect-mongo')
var MongoStore = require('connect-mongodb-session')(session)

// mongoose.connect('mongodb://localhost/pizzaapp')
//     .then(() => { console.log('database connected') })
//     .catch(() => { console.log('database not connected') })

mongoose.connect(process.env.MANGO_URL)
    .then(() => { console.log('database connected') })
    .catch(() => { console.log('database not connected') })

var db = mongoose.connection

// var sessionstore = new mongostore(session)
const sessionstore = new MongoStore({
    // uri: 'mongoose.connection',
    // uri: 'mongodb://localhost/pizzaapp',
    uri: process.env.MANGO_URL,
    collection: 'sessions',
})
sessionstore.on('error', (error) => { console.log('store error: ', error) })
    // var sessionstore = new MongoStore({ mongooseConnection: db })

app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        store: sessionstore,
        cookie: { maxAge: 1000 * 60 * 60 * 24 }
    }))
    // const passportuse = require('./app/middlewares/passportuse.js')
require('./app/middlewares/passportuse.js')(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
app.use((req, res, next) => {
    // delete req.session.cart
    // console.log('req.session:', req.session)
    // console.log('req.user:', req.user)
    res.locals.session = req.session
    res.locals.user = req.user

    console.log(session.url)

    next()
})

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'ejs')
app.use(expressLayouts);

app.get('/chat', (req, res) => {
    res.render('pages/chat.ejs');
});


// save data 
const data = require('./app/data/data.js')
const Product = require('./app/models/product.js')
const productsave = async() => {
        try {
            const docresp = await Product.insertMany(data)
            console.log('products:', docresp)
        } catch (error) {
            console.log('error:', error)
        }
    }
    // productsave()
const productdelete = async() => {
        try {
            const docresp = await Product.deleteMany()
            console.log('products:', docresp)
        } catch (error) {
            console.log('error:', error)
        }
    }
    // productdelete()

// save data 
const YOUR_DOMAIN = 'http://localhost:3300'

app.post('/create-checkout-session', async(req, res) => {
    // const session = await stripe.checkout.sessions.create({
    //     line_items: [{
    //         // TODO: replace this with the `price` of the product you want to sell
    //         price: 20,
    //         // price: '{{PRICE_ID}}',
    //         quantity: 1,
    //     }, ],
    //     payment_method_types: [
    //         'card',
    //     ],
    //     mode: 'payment',
    //     success_url: `${YOUR_DOMAIN}/success.html`,
    //     cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    // });

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price_data: {
                currency: 'usd',
                product_data: {
                    name: 'T-shirt',
                },
                unit_amount: 2000,
            },
            quantity: 1,
        }, ],
        mode: 'payment',
        success_url: 'http://localhost:3300/success.html',
        cancel_url: 'http://localhost:3300/cancel.html',
    });
    res.redirect(303, session.url)
});
app.post('/create-purchase', (req, res) => {
    var params = {
        source: req.body.creditcardtoken,
        amount: '2000',
        currency: 'USD',
        description: '',

    }
    stripe.purchase.create(params, (err, charge) => {
        if (err) {
            console.log(err)
            res.send({ success: 'false', purchaseresponse: err })

        } else {
            console.log('charge:', charge)
            res.send({ success: 'success', purchaseresponse: charge })
        }
    })
})

const Checkout = require('./app/models/checkout.js')

app.get('/modelcheckout', (req, res) => {
    res.render('testing/checkout.ejs')
})

const route = require('./app/routes/routes.js')
route(app)

const serverweb = app.listen(process.env.PORT, () => {
    console.log('web server started at', process.env.PORT)
})

const io = new Server(serverweb);

//chat server listening

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('join', (id) => {
        socket.join(id)
        console.log('socket join id:', id)
    })

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        // socket.join('join')
        io.emit('chat message', msg)
    });

    socket.on('neworder', (msg) => {
        console.log('neworder msg: ', msg)
            // socket.join('neworder')

    })

    io.emit('some event', {
        someProperty: 'server connected',
        otherProperty: 'other value'
    }); // This will emit the event to all connected sockets

    socket.broadcast.emit('hi');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

eventEmitter.on('statusupdate', function(data) {
    console.log('ordestatusupdate: ', data)
    io.to(data.id).emit('statusupdate', data.status)
});

eventEmitter.on('orderlist', function(data) {
    console.log('orderlist: ', data.length)
    io.emit('orderlist', data)
});


eventEmitter.on('neworder', function(data) {
    console.log('neworder: ', data)
    io.emit('neworder', data)
});
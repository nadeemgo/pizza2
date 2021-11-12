var cartqty = document.getElementById('cartqty')
console.log('cartqty: ', cartqty)

const addtocart1 = (e) => {
    e.preventDefault()
    console.log(e.target)
    console.log(JSON.parse(e.target.dataset.product))

}

// var addtocartbutton = document.getElementsByClassName('addtocartbutton')
// console.log('add to cart', addtocartbutton)
// var i
// for (i = 0; i < addtocartbutton.length; i++) {
//     addtocartbutton[i].addEventListener('click', addtocart)
// }

var addtocartspan = document.getElementsByClassName('addtocartspan')
console.log('add to cart', addtocartspan)
var i
for (i = 0; i < addtocartspan.length; i++) {
    addtocartspan[i].addEventListener('click', addtocart)
}

async function addtocart(e) {
    e.preventDefault()
    console.log('add to cart')
    console.log(e.target)
    var data = JSON.parse(e.target.dataset.product)

    try {
        var resp = await axios.post('/update', data)
        console.log('resp', resp.data.totalqty)
        cartqty.innerText = resp.data.totalqty

        new Noty({
            type: 'success',
            timeout: 1000,
            text: "Item added to the cart"
        }).show();

    } catch (error) {
        console.log('error', error)

        new Noty({
            type: 'error',
            timeout: 1000,
            text: "Something went wrong"
        }).show();

    }

}
const flashorder = document.getElementById('flash-order')
var socket = io();
console.log('order page')

const ordersection = document.getElementById('ordersection')
var order = JSON.parse(ordersection.dataset.order)
    // console.log('order', order)
var order1
for (var i = 0; i < order.length; i++) {
    if (i == 0) {
        order1 = order[i]
        console.log('order', order1)

    }
}

order.unshift(order1)
console.log('unshift list: ', order)


const tbody = document.getElementById('tbody')
console.log('orderlist div: ', tbody)

// tbody.innerHTML = ''
// var ele = order1

function markup(order) {
    return order.map(ele => {
        return `
<div id='orderlist'>
    <tr>
        <td class=' bordercell px-4 py-2'>
            <a href='/orderstatus/${ ele._id}' data-id='${ ele._id}'>
            ${ ele._id}
            </a>
        </td>
        <td class=' bordercell px-4 py-2'>
            ${ ele.address}
        </td>
        <td class=' bordercell px-4 py-2'>
            ${ ele.phone}
        </td>
        <td class=' bordercell px-4 py-2'>
            ${ ele.cart.totalprice }

        </td>
        <td class='  bordercell px-4 py-2'>
            ${ moment(ele.createdAt).format('hh:mm A')  }
        </td>
    </tr>
</div>
`
    }).join('')
}

// console.log('markup:', markup(order))
// tbody.innerHTML = markup(order)
const totalorders = document.getElementById('totalorders')

socket.emit('neworder', 'client order pls send message for new orders')

socket.on('neworder', function(data) {
    console.log('neworder:', data)
    order.unshift(data)
    console.log('orderlist:', order)
    tbody.innerHTML = markup(order)
    totalorders.innerText = `Total orders: ${order.length}`

});



if (flashorder) {
    setTimeout(() => {
        flashorder.remove()
    }, 1000);
}
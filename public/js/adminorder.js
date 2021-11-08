const socket = io()

const tbody = document.getElementById('tbody')
socket.on('orderlist', (datalist) => {
    console.log(datalist.length)

    tbody.innerHTML = ''
    tbody.innerHTML += markup(datalist)

})


const orderstatus = document.getElementsByClassName('orderstatus')
    // console.log('value: ', orderstatus.length)

for (var i; i < orderstatus.length; i++) {
    orderstatus[i].addEventListener('change', (e) => {
        e.preventDefault()
            // console.log('order status: ', e.target.value)

        displaystatus()
    })
}

function displaystatus(e) {
    // console.log('order status: ', e.target.value)
    // console.log('order status: ', e.target.dataset.id)
}

const orderjason = document.getElementById('orderjason')
var order = JSON.parse(orderjason.dataset.order)
    // var items = order.cart.items
    // console.log('order:', order)

order.map(ele => {
    // console.log('ele', ele.status)
    // console.log('items:', renderitems(ele.cart.items))

})


function renderitems(items) {
    var itemlist = Object.values(items)
    return itemlist.map(singprod => {
        return `
                 <div>
                            <span> ${singprod.name} : </span>
                            <span> ${ singprod.qty } - pcs </span>
                 </div>
            `
    }).join('')
}

function markup(order) {
    return order.map(ele => {
        return `
    <form id='orderid' action='/adminupdateorderstatus' method='POST'>
        <input type='hidden' value='${ ele._id }' name='orderid'>
        <tr>
            <td class='border-2 border-solid border-gray-300 px-2 py-2'>
                ${ ele._id }

                <div> ${ renderitems(ele.cart.items)} </div>

            </td>
            <td class='border-2 border-solid border-gray-300  px-2 py-2'>
                ${ ele.phone }
            </td>
            <td class='border-2 border-solid border-gray-300  px-2 py-2'>
                ${ ele.address }
            </td>
            <td class='border-2 border-solid border-gray-300  px-2 py-2'>

            <select id='selectvalue' name='selectvalue' onchange='this.form.submit()' class='orderstatus w-full focus:none' data-id='<%= ele._id %>'>
                <option value='order-placed' ${ele.status == 'order-placed' ? 'selected' : '' } >order placed</option>
                <option value='confirmed' ${ ele.status == 'confirmed' ? 'selected' : '' }    >confirmed</option>
                <option value='prepared' ${ ele.status == 'prepared' ? 'selected' : '' }    >prepared</option>
                <option value='delievered' ${ ele.status == 'delievered' ? 'selected' : '' }  >delievered</option>
                <option value='closed' ${ ele.status == 'closed' ? 'selected' : '' }  >closed</option>
            </select>

            </td>
            <td class='border-2 border-solid border-gray-300  px-2 py-2'>
                ${ moment(ele.createdAt).format('hh:mm A') }
            </td>
        </tr>

    </form>
`
    }).join('')
}

var a = function mark3(order) { return order.map(ele => { return `<div>${ele.address}</div>` }).join('') }

// console.log('a: ', a(order))

function markup1(ele) {
    return `
    <form id='orderid' action='/adminupdateorderstatus' method='POST'>
        <input type='hidden' value='' name='orderid'>
        <tr>
        <td class='border-2 border-solid border-gray-300 px-2 py-2'>
            ${ ele._id }


        </td>
        <td class='border-2 border-solid border-gray-300  px-2 py-2'>
            ${ ele.phone }
        </td>
        <td class='border-2 border-solid border-gray-300  px-2 py-2'>
            ${ ele.address }
        </td>
        <td class='border-2 border-solid border-gray-300  px-2 py-2'>

        <select id='selectvalue' name='selectvalue' onchange='this.form.submit()' class='orderstatus w-full focus:none' data-id='<%= ele._id %>'>
            <option value='order-placed' ${ele.status == 'order-placed' ? 'selected' : '' } >order placed</option>
            <option value='confirmed' ${ ele.status == 'confirmed' ? 'selected' : '' }    >confirmed</option>
            <option value='prepared' ${ ele.status == 'prepared' ? 'selected' : '' }    >prepared</option>
            <option value='delievered' ${ ele.status == 'delievered' ? 'selected' : '' }  >delievered</option>
            <option value='closed' ${ ele.status == 'closed' ? 'selected' : '' }  >closed</option>
        </select>

        </td>
        <td class='border-2 border-solid border-gray-300  px-2 py-2'>
            ${ moment(ele.createdAt).format('hh:mm A') }
        </td>
    </tr>
       

    </form>
`

}

// console.log('markup:', markup(order))
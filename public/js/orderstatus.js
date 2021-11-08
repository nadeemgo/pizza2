const socket = io()

console.log('order status')
const status = document.getElementById('orderstatus')
console.log(' status:', status.innerText)
const statusvalue = status.innerText

console.log(' order object:', JSON.parse(status.dataset.order))
var order = JSON.parse(status.dataset.order)
var orderid = order._id

socket.emit('join', orderid)

const listdisplay = document.getElementsByClassName('listdisplay')
console.log('listdisplay: ', listdisplay)

socket.on('statusupdate', (datastatus) => {
    console.log('datastatus:', datastatus)
    displaystatus(datastatus)
})


function displaystatus(statusvalue) {
    console.log('inside fn:')

    status.innerText = statusvalue

    var completedtask = false

    for (var i = 0; i < listdisplay.length; i++) {
        listatus = listdisplay[i].dataset.status
        listdisplay[i].classList.remove('completed')
        listdisplay[i].classList.remove('current')
    }

    for (var i = 0; i < listdisplay.length; i++) {
        listatus = listdisplay[i].dataset.status

        if (statusvalue == listatus) {
            if (listdisplay[i].nextElementSibling) {
                listdisplay[i].nextElementSibling.classList.add('current')
                listdisplay[i].classList.add('completed')
                completedtask = true
            }
        }
        if (completedtask == false) {
            listdisplay[i].classList.add('completed')
        }
    }
}
displaystatus(statusvalue)
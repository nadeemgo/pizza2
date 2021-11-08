// var loginform = document.querySelector('form')
// console.log('loginform: ', loginform)
// loginform.addEventListener('submit', function(event) {
//     event.preventDefault()
//     logindata()
// })

// loginform.addEventListener('submit', logindata)

function logindata(e) {
    e.preventDefault()

    var formdata = new FormData(e.target)
    console.log('formdata: ', formdata)
}
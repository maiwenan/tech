import throttle from '../index'

let count = 1
let options = {
  leading: true,
  trailing: true
}
const container = document.getElementById('container')
const app = document.getElementById('app')
const leadingBtn = document.getElementById('leading')
const trailingBtn = document.getElementById('trailing')
const cancelBtn = document.getElementById('cancel')

function add (e) {
  app.innerHTML = count++
}

let addHandler = throttle(add, 1000, options)

leadingBtn.addEventListener('change', function (e) {
  options.leading = e.target.checked

  addHandler.cancel()
  container.removeEventListener('mousemove', addHandler)
  console.log(options)
  addHandler = throttle(add, 1000, options)
  container.addEventListener('mousemove', addHandler)
})

trailingBtn.addEventListener('change', function (e) {
  options.trailing = e.target.checked

  addHandler.cancel()
  container.removeEventListener('mousemove', addHandler)
  console.log(options)
  addHandler = throttle(add, 1000, options)
  container.addEventListener('mousemove', addHandler)
})

container.addEventListener('mousemove', addHandler)

cancelBtn.addEventListener('click', function () {
  addHandler.cancel()
})

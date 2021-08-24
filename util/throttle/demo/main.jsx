import throttle from '../index'

let count = 1
let status = false
const container = document.body
const app = document.getElementById('app')
const toggleBtn = document.getElementById('toggle')
const cancelBtn = document.getElementById('cancel')

function add (e) {
  app.innerHTML = count++
}

let addHandler = throttle(add, 3000, status)

toggleBtn.addEventListener('change', function (e) {
  status = e.target.value

  addHandler.cancel()
  addHandler = throttle(add, 3000, status)
})

container.addEventListener('mousemove', addHandler)

cancelBtn.addEventListener('click', function () {
  addHandler.cancel()
})

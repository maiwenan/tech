import debounce from '../index'

let count = 1
let status = false
const app = document.getElementById('app')
const addBtn = document.getElementById('add')
const toggleBtn = document.getElementById('toggle')
const cancelBtn = document.getElementById('cancel')

function add (e) {
  app.innerHTML = count++
}

let addHandler = debounce(add, 3000, status)

toggleBtn.addEventListener('change', function (e) {
  status = e.target.value

  addHandler.cancel()
  addBtn.removeEventListener('click', addHandler)
  addHandler = debounce(add, 3000, status)
  addBtn.addEventListener('click', addHandler)
})

addBtn.addEventListener('click', addHandler)

cancelBtn.addEventListener('click', function () {
  addHandler.cancel()
})

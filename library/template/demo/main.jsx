import SimpleTpl from '../index.simple'

function renderUser() {
  const userTpl = document.getElementById('userTpl').innerHTML
  const data = {
    users: [{
      name: 'bob',
      url: 'bobUrl'
    }, {
      name: 'alice',
      url: 'aliceUrl'
    }]
  }

  document.getElementById('user').innerHTML = SimpleTpl(userTpl)(data)
}

renderUser()

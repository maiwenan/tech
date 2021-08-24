import React from '../index'

function Counter () {
  const [state, setState] = React.useState(1)
  return (
    <h1 onClick={() => setState(c => c + 1)}>
      Count: {state}
    </h1>
  )
}
const element = <Counter />
const container = document.getElementById('app')
React.render(element, container)

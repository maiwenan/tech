import React from './library/react'
import './style.css'

const container = document.getElementById('app')

function updateValue(e) {
  console.log(e)
  renderApp(e.target.value)
}

function renderApp(value) {
  const element = (
    <div>
      <input onInput={updateValue} value={value} />
      <h2>Hello {value}</h2>
    </div>
  );

  React.render(element, container)
}

renderApp('hello')




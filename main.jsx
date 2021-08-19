import React from './library/react'
import './style.css'

const container = document.getElementById('app')

function App(props) {
  return <h1>Hi {props.name}</h1>
}
const element = <App name="foo" />
React.render(element, container)




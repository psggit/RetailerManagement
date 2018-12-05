import React from 'react'
import { render } from 'react-dom'
import { Alert } from '@auth0/cosmos'
import './notification.scss'

function Notify(type, message) {
  const className = "notification-container"
  const el = document.querySelector(`.${className}`)
  
  if (el) {
    el.parentNode.removeChild(el)
  }

  const container = document.createElement("div")
  container.setAttribute("class", `${className} animated fadeIn`)
  document.body.appendChild(container)

  render(
    <Alert
      dismissAfterSeconds={5}
      type={type}
      title=""
      >
      {message}
    </Alert>,
    container
  )
}

export default Notify

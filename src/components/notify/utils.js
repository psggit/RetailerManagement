import { unmountComponentAtNode } from 'react-dom'

export default function unmountNotify() {
  unmountComponentAtNode(document.querySelector('.notification-container'))
}

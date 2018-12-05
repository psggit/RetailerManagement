import React from 'react'
import './sidemenu.scss'

class SideMenu extends React.Component {
  checkActiveClass(value) {
    if (this.props.currentRoute === value) {
      return 'active'
    }
    return ''
  }

  handleChangeRoute(e, currentRoute) {
    e.preventDefault()
    this.props.history.push(`/home/${currentRoute}`)
  }

  render() {
    const { menuItems, menuItemsMap, currentRoute } = this.props
    return (
      <div className="side-menu">
        {
          menuItems.map((item, i) => (
            <div key={i} className={`side-menu__item ${this.checkActiveClass(item.value)}`}>
              <a
                href={`/home/${item.value}`}
                onClick={(e) => { this.handleChangeRoute(e, item.value) }}
              >
                { item.label }
              </a>
            </div>
          ))
        }
      </div>
    )
  }
}

export default SideMenu

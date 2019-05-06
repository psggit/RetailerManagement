import React from 'react'
import { NavLink } from "react-router-dom"
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
    //this.props.history.push(`/home/${currentRoute}`)
    location.href = `/admin/${currentRoute}`
  }

  render() {
    const { menuItems, menuItemsMap, currentRoute } = this.props
    return (
      <div className="side-menu">
        {
          menuItems.map((item, i) => (
            <div key={i} className={`side-menu__item ${this.checkActiveClass(item.value)}`}>
              <NavLink
                to={`/admin/${item.value}`}
              // onClick={(e) => { this.handleChangeRoute(e, item.value) }}
              >
                {item.label}
              </NavLink>
            </div>
          ))
        }
      </div>
    )
  }
}

export default SideMenu

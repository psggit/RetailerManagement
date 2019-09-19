import React from 'react'
import style from './navbar.scss'

class Navbar extends React.Component {

  handleChangeRoute (e, currentRoute) {
    e.preventDefault()
    this.props.history.push(`/admin/${currentRoute}`)
  }

  handleLogout () {

    const fetchOptions = {
      method: 'get',
      credentials: 'include',
      mode: 'cors',
      'x-hasura-role': 'user'
    }

    const authLogoutUrl = `https://auth.${process.env.BASE_URL}/user/logout`
    fetch(authLogoutUrl, fetchOptions)
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Looks like there was a problem. Status Code: ${response.status}`)
          localStorage.clear()
          location.href = '/admin/login'
          return
        }
        response.json().then((data) => {
          localStorage.clear()
          location.href = '/admin/login'
        })
      })
      .catch((err) => {
        console.log('Fetch Error :-S', err)
        localStorage.clear()
        location.href = '/admin/login'
      })

  }
  
  render () {
    const { menuItems } = this.props
    return <div className="navbar" style={style}>
      <div className="title">
        <h4 onClick={(e) => { this.handleChangeRoute(e, menuItems[0].value) }}>Retailer Management</h4>
      </div>
      <div className="logout" onClick={() => this.handleLogout()}>
        Logout
            </div>
    </div>
  }
}

export default Navbar

import React from 'react'
import style from './navbar.scss'
import {  Api } from 'Utils/config'

class Navbar extends React.Component {
    constructor() {
        super()
    }

    handleChangeRoute(e, currentRoute) {
        e.preventDefault()
        this.props.history.push(`/home/${currentRoute}`)
    }

    handleLogout() {

        const fetchOptions = {
            method: 'get',
            credentials: 'include',
            mode: 'cors',
            'x-hasura-role': 'user'
        }

        fetch(`${Api.authUrl}/user/logout`, fetchOptions)
        .then((response) => {
            if (response.status !== 200) {
            console.log(`Looks like there was a problem. Status Code: ${response.status}`)
            localStorage.clear()
            location.href = '/login'
            return
            }
            response.json().then((data) => {
            localStorage.clear()
            location.href = '/login'
            })
        })
        .catch((err) => {
            console.log('Fetch Error :-S', err)
            localStorage.clear()
            location.href = '/login'
        })

    }
    render() {
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

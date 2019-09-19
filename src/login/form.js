import React from 'react'
import { createSession } from './utils'
// import { Api } from 'Utils/config'
//import "whatwg-fetch"
import 'Sass/_input.scss'
import 'Sass/_form.scss'
import 'Sass/_button.scss'
import { getIcon } from 'Utils/icon-utils'

class Form extends React.Component {
  constructor () {
    super()
    this.state = {
      isSubmitting: false,
      showError: false,
      error: false,
      username: '',
      password: '',
      errorMessage: ""
    }

    this.handleChange = this.handleChange.bind(this)
    this.handlePress = this.handlePress.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value, error: false })
  }

  handlePress (e) {
    if (e.keyCode === 13) this.handleSubmit()
  }


  handleSubmit () {
    const { username, password } = this.state
    if (!(username.length && password.length)) {
      return;
    }
    const formData = {
      username,
      password
    }

    const fetchOptions = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify(formData)
    }

    this.setState({ isSubmitting: true })
    const authLoginUrl = `https://gremlin.${process.env.BASE_URL}/auth/login`
    fetch(authLoginUrl, fetchOptions)
      .then((response) => {
        if (response.status !== 200) {
          response.json().then(json => {
            this.setState({ isSubmitting: false, error: true, errorMessage: json.message })
          })
          return
        }
        response.json().then((data) => {
          createSession(data)
          location.href = '/admin/stock-and-price'
        })
      })
      .catch((err) => {
        console.log('Fetch Error :-S', err)
        this.setState({ isSubmitting: false })
      })
  }

  render () {
    return (
      <div className="form">
        <div className="login-header">
          <div className="logo"> <span style={{ width: '40px', height: '40px' }}> {getIcon('logo')} </span> </div>
          <span> RETAILER MANAGEMENT </span>
        </div>
        {/* <div className="form-wrapper" style={{width: '100%'}}> */}
        <div className="form-group">
          <input
            placeholder="Username"
            type="text"
            name="username"
            onChange={this.handleChange}
            onKeyDown={this.handlePress}
          />
        </div>
        <div className="form-group">
          <input
            autocomplete="fefefef"
            placeholder="Password"
            type="password"
            name="password"
            onChange={this.handleChange}
            onKeyDown={this.handlePress}
          />
        </div>
        <button
          disabled={this.state.isSubmitting}
          onClick={this.handleSubmit}
          style={{ marginTop: '20px', width: '100%', height: '40px', background: '#616161', cursor: this.state.isSubmitting ? 'progress' : '' }}
          className="btn btn--primary"
        >
          Login
        </button>
        {this.state.error ? <p style={{ color: '#ff3b30' }}>{this.state.errorMessage}</p> : ''}
      </div>
    )
  }
}

export default Form

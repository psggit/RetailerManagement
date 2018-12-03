import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import {  Api } from '@utils/config'
import { createSession } from './login/utils'

import Login from './login'
import Dashboard from './dashboard'

class App extends React.Component {
    componentWillMount() {
        // const fetchOptions = {
        //     method: 'get',
        //     credentials: 'include',
        //     mode: 'cors',
        //     'x-hasura-role': 'user'
        // }

        // fetch(`${Api.authUrl}/user/account/info`, fetchOptions)
        //     .then((response) => {
        //     if (response.status !== 200) {
        //         console.log(`Looks like there was a problem. Status Code: ${response.status}`)
        //         if (location.pathname !== '/login') {
        //         location.href = '/login'
        //         }
        //         return
        //     }
        //     response.json().then((data) => {
        //         createSession(data)
        //         if (!location.pathname.includes('home')) {
        //         location.href = '/home'
        //         }
        //     })
        //     })
        //     .catch((err) => {
        //     console.log('Fetch Error :-S', err)
        //     if (location.pathname !== '/login') {
        //         location.href = '/login'
        //     }
        //     })
    }
    render() {
        console.log("login", Login)
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Login} />
                    <Route path="/home" component={Dashboard} />
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))

export default App

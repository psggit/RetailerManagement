import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import {  Api } from 'Utils/config'
import { createSession } from './login/utils'

import Login from './login'
import Dashboard from './dashboard'
import RetailerForm from './report'

class App extends React.Component {
    componentWillMount() {
        const fetchOptions = {
            method: 'get',
            credentials: 'include',
            mode: 'cors',
            'x-hasura-role': 'user'
        }

        fetch(`${Api.authUrl}/user/account/info`, fetchOptions)
            .then((response) => {
                if (response.status !== 200) {
                    console.log(`Looks like there was a problem. Status Code: ${response.status}`)
                    if (location.pathname !== '/login') {
                    location.href = '/login'
                    }
                    return
                }
                response.json().then((data) => {
                    createSession(data)
                    if(!location.pathname.includes('admin') && !location.pathname.includes('retailer')) {
                        location.href = '/admin'
                    }
                })
            })
            .catch((err) => {
                console.log('Fetch Error :-S', err)
                if (location.pathname !== '/login') {
                    location.href = '/login'
                }
            })
    }
    render() {
        return (
            <Router>
                <div>
                    <Route path='/login' component={Login} />
                  
                    <Route path='/admin' component={Dashboard} />

                    <Route 
                        path='/admin/retailer-onboarding-form/:orgId' 
                        //component={RetailerForm}
                          render={
                            props => (
                                <RetailerForm {...props} />
                            )
                        } 
                    />
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))

export default App

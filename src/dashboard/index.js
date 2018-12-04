// import React from 'react';

// class Dashboard extends React.Component {
//     constructor() {
//         super()
//     }

//     render() {
//         return <div> Dashboard </div>
//     }
// }

// export default Dashboard

import React from 'react'
import SideMenu from 'Components/sidemenu'
import Navbar from 'Components/navbar'
import createHistory from 'history/createBrowserHistory'
import { Route, Switch } from 'react-router-dom'
import { Router } from 'react-router'
// import Account from './Account'
// import LiveOttp from './live-ottp-list'
// import HistoryOttp from './history-ottp-list'
// import { Alert } from '@auth0/cosmos'
// import unmountNotify from 'Components/notify/utils'

const history = createHistory()

class Dashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      currentRoute: location.pathname.split('/')[2] || 'live-ottp',
    }
  }

  componentDidMount() {
    history.listen((loction) => {
      const newRoute = location.pathname.split('/')[2]
      if (newRoute !== this.state.currentRoute) {
        //unmountNotify()
        this.setState({ currentRoute: newRoute })
      }
    })
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: '#fbfbfb',
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          height: '100vh',
          overflow: 'auto'
        }}
      >
        <Navbar />
        <div style={{ display: 'flex' }}>
          <SideMenu
            history={history}
            menuItems={[
              { label: 'Manage Retailer', value: 'manage-retailer' },
              { label: 'Manage Organization', value: 'manager-organization' }
            ]}
            currentRoute={this.state.currentRoute}
          />
          {/* <Router history={history}>
            <Switch>
              <Route
                exact
                path="/home/account"
                render={
                  props => (
                    <Account {...props} />
                  )
                }
              />

              <Route
                exact
                path="/home/live-ottp"
                render={
                  props => (
                    <LiveOttp {...props} />
                  )
                }
              />

              <Route
                exact
                path="/home/history-ottp"
                render={
                  props => (
                    <HistoryOttp {...props} />
                  )
                }
              />
            </Switch>
          </Router> */}
        </div>
      </div>
    )
  }
}

export default Dashboard

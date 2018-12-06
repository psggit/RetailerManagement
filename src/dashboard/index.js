import React from 'react'
import SideMenu from 'Components/sidemenu'
import Navbar from 'Components/navbar'
import createHistory from 'history/createBrowserHistory'
import { Route, Switch } from 'react-router-dom'
import { Router } from 'react-router'
import ManageOrganization from './manage-organization'
import CreateOrganization from './create-organization'
import EditOrganization from './edit-organization'
import ManageRetailer from './manage-retailer'

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
          maxWidth: '1920px',
          //maxWidth: '1440px',
          margin: '0 auto',
          height: '100vh',
          //overflow: 'auto'
        }}
      >
        <Navbar
          history={history} 
          menuItems={[
            { label: 'Manage Retailer', value: 'manage-retailer' },
            { label: 'Manage Organization', value: 'manage-organization' }
          ]}
          currentRoute={this.state.currentRoute}
        />
        <div style={{ display: 'flex' }}>
          <SideMenu
            history={history}
            menuItems={[
              { label: 'Manage Retailer', value: 'manage-retailer' },
              { label: 'Manage Organization', value: 'manage-organization' }
            ]}
            currentRoute={this.state.currentRoute}
          />
          <Router history={history}>
            <Switch>
              <Route
                exact
                path="/home/manage-organization"
                //component={ManageOrganization}
                render={
                  props => (
                    <ManageOrganization {...props} />
                  )
                }
              />

              <Route
                exact
                path="/home/manage-organization/create-organization"
                component={CreateOrganization}
                // render={
                //   props => (
                //     <CreateOrganization {...props} />
                //   )
                // }
              />

              <Route
                exact
                path="/home/manage-organization/edit-organization/:organizationId"
                //component={EditOrganization}
                render={
                  props => (
                    <EditOrganization {...props} />
                  )
                }
              />

              <Route
                exact
                path="/home/manage-retailer"
                component={ManageRetailer}
                // render={
                //   props => (
                //     <ManageRetailer {...props} />
                //   )
                // }
              /> 

              {/* <Route
                exact
                path="/home/history-ottp"
                render={
                  props => (
                    <HistoryOttp {...props} />
                  )
                }
              />  */}
            </Switch>
          </Router>
        </div>
      </div>
    )
  }
}

export default Dashboard

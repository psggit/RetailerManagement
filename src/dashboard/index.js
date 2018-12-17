import React from 'react'
import SideMenu from 'Components/sidemenu'
import Navbar from 'Components/navbar'
import createHistory from 'history/createBrowserHistory'
import { Route, Switch } from 'react-router-dom'
import { Router } from 'react-router'
import ManageOrganization from './manage-organization/index'
import CreateOrganization from './manage-organization/create-organization'
import EditOrganization from './manage-organization/edit-organization'
import OrganizationDetails from './manage-organization/organization-details'
import RetailerDetails from './manage-retailer/retailer-details'
import ManageRetailer from './manage-retailer/index'
import CreateRetailer from './manage-retailer/create-retailer';
import EditRetailer from './manage-retailer/edit-retailer';
import GenerateReport from './generate-report'

const history = createHistory()

class Dashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      currentRoute: location.pathname.split('/')[2] || 'organization',
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
          //maxWidth: '1920px',
          //maxWidth: '1440px',
          margin: '0 auto',
          height: '100vh',
          //overflow: 'auto'
        }}
      >
        <Navbar
          history={history} 
          menuItems={[
            { label: 'Manage Organization', value: 'organization' },
            { label: 'Manage Retailer', value: 'retailer' },
            { label: 'Generate Report', value: 'generate-report' }
          ]}
          currentRoute={this.state.currentRoute}
        />
        <div style={{ display: 'flex' }}>
          <SideMenu
            history={history}
            menuItems={[
              { label: 'Manage Organization', value: 'organization' },
              { label: 'Manage Retailer', value: 'retailer' },
              { label: 'Generate Report', value: 'generate-report' }
            ]}
            currentRoute={this.state.currentRoute}
          />
          <Router history={history}>
            <Switch>
              <Route
                exact
                path="/admin/organization/create"
                //component={CreateOrganization}
                render={
                  props => (
                    <CreateOrganization {...props} />
                  )
                }
              />

              <Route
                exact
                path="/admin/organization/edit/:organizationId"
                //component={EditOrganization}
                render={
                  props => (
                    <EditOrganization {...props} />
                  )
                }
              />
            
              <Route
                exact
                path="/admin/organization/:organizationId"
                //component={EditOrganization}
                render={
                  props => (
                    <OrganizationDetails {...props} />
                  )
                }
              />

              <Route
                exact
                path="/admin/retailer"
                //component={ManageRetailer}
                render={
                  props => (
                    <ManageRetailer {...props} />
                  )
                }
              />

              <Route
                exact
                path="/admin/retailer/create"
                //component={CreateRetailer}
                render={
                  props => (
                    <CreateRetailer {...props} />
                  )
                }
              />

              <Route
                exact
                path="/admin/retailer/edit/:retailerId"
                //component={EditOrganization}
                render={
                  props => (
                    <EditRetailer {...props} />
                  )
                }
              /> 


              <Route
                exact
                path="/admin/retailer/:retailerId"
                component={RetailerDetails}
                // render={
                //   props => (
                //     <RetailerDetails {...props} />
                //   )
                // }
              />

              <Route
                exact
                path="/admin/generate-report"
                component={GenerateReport}
                // render={
                //   props => (
                //     <GenerateReport {...props} />
                //   )
                // }
              /> 

              <Route
                exact
                path="/admin"
                //component={ManageOrganization}
                render={
                  props => (
                    <ManageOrganization {...props} />
                  )
                }
              />

              <Route
                exact
                path="/admin/organization"
                //component={ManageOrganization}
                render={
                  props => (
                    <ManageOrganization {...props} />
                  )
                }
              />
            </Switch>
          </Router>
        </div>
      </div>
    )
  }
}

export default Dashboard

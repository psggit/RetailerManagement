import React from 'react'
import ReactDOM from 'react-dom'
import {
	Switch,
	Route,
	Link,
} from 'react-router-dom'
import { Router } from 'react-router'
import { Api } from 'Utils/config'
import { createSession } from './login/utils'

import Login from './login'
//import Dashboard from './dashboard'
import RetailerForm from './report'
import SideMenu from 'Components/sidemenu'
import Navbar from 'Components/navbar'
import createHistory from 'history/createBrowserHistory'
import ManageOrganization from './dashboard/manage-organization/index'
import CreateOrganization from './dashboard/manage-organization/create-organization'
import EditOrganization from './dashboard/manage-organization/edit-organization'
import OrganizationDetails from './dashboard/manage-organization/organization-details'
import RetailerDetails from './dashboard/manage-retailer/retailer-details'
import ManageRetailer from './dashboard/manage-retailer/index'
import CreateRetailer from './dashboard/manage-retailer/create-retailer';
import EditRetailer from './dashboard/manage-retailer/edit-retailer';
import RetailerList from "./dashboard/device-management/index";
import DeviceList from "./dashboard/device-management/device-list"
import GenerateReport from './dashboard/generate-report'
import StockAndPriceList from './dashboard/stock-and-price'
import CreateOrUpdateStockPrice from './dashboard/stock-and-price/create-or-update-stock-price';
import RetailerInventory from './dashboard/stock-and-price/retailer-inventory'

const history = createHistory()

class App extends React.Component {
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
					if (location.pathname !== '/admin/login') {
						location.href = '/admin/login'
					}
					return
				}
				response.json().then((data) => {
					createSession(data)
					if (location.pathname.includes('login') || location.pathname == '/') {
						//location.href = '/admin/organization'
						history.push('/admin/organization')
					}
				})
			})
			.catch((err) => {
				console.log('Fetch Error :-S', err)
				if (location.pathname !== '/admin/login') {
					location.href = '/admin/login'
				}
			})
	}
	render() {
		return (
			<Router history={history}>
				<div>
					<Route path='/admin/login' component={Login} />

					<Route
						path='/admin/retailer-onboarding-form/:orgId'
						//component={RetailerForm}
						render={
							props => (
								<RetailerForm {...props} />
							)
						}
					/>
					{
						!location.pathname.includes('login') && !location.pathname.includes('onboard') &&
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
										{ label: 'Generate Report', value: 'generate-report' },
										{ label: 'Device Management', value: 'device-management' },
										{	label: 'Stock and Price', value: 'stock-and-price' }
									]}
									currentRoute={this.state.currentRoute}
								/>
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
										path="/admin/stock-and-price"
										//component={ManageOrganization}
										render={
											props => (
												<StockAndPriceList {...props} />
											)
										}
									/>

									<Route
										exact
										path="/admin/stock-and-price/create"
										//component={ManageOrganization}
										render={
											props => (
												<CreateOrUpdateStockPrice {...props} />
											)
										}
									/>

									<Route
										exact
										path="/admin/stock-and-price/edit/:retailerId"
										//component={ManageOrganization}
										render={
											props => (
												<RetailerInventory {...props} />
											)
										}
									/>

									<Route
										exact
										path="/admin/device-management"
										//component={ManageOrganization}
										render={
											props => (
												<RetailerList {...props} />
											)
										}
									/>

									<Route
										exact
										path="/admin/device-management/:retailerId"
										//component={ManageOrganization}
										render={
											props => (
												<DeviceList {...props} />
											)
										}
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

							</div>
						</div>
					}

				</div>
			</Router>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'))

export default App

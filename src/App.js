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
import { createBrowserHistory as createHistory } from 'history'
import ManageOrganization from './dashboard/manage-organization/index'
import CreateOrganization from './dashboard/manage-organization/create-organization'
import EditOrganization from './dashboard/manage-organization/edit-organization'
import OrganizationDetails from './dashboard/manage-organization/organization-details'
import RetailerDetails from './dashboard/manage-retailer/retailer-details'
import ManageRetailer from './dashboard/manage-retailer/index'
import RetailerNotes from "./dashboard/RetailerNotes"
import CreateRetailer from './dashboard/manage-retailer/create-retailer';
import EditRetailer from './dashboard/manage-retailer/edit-retailer';
import RetailerList from "./dashboard/device-management/index";
import DeviceList from "./dashboard/device-management/device-list"
import GenerateReport from './dashboard/generate-report'
import AccessLogs from "./dashboard/access-logs"
// import StockAndPriceList from './dashboard/stock-and-price'
import CreateOrUpdateStockPrice from './dashboard/stock-management/retailer-inventory';
// import RetailerInventory from './dashboard/stock-and-price/retailer-inventory'
import StockManagement from "./dashboard/stock-management"
import ModifiedStockList from "./dashboard/stock-management/modifiedStockSummary"
import Account from "./dashboard/Account"
import ManageCreditDebit from "./dashboard/ManualDebitCredit"
const history = createHistory()
const supportedRoles = ["admin", "opdataadmin", "opdataentry"]
const accessRole = localStorage.getItem('x-hasura-role') ? localStorage.getItem('x-hasura-role') : ''

function StockManagementSwitch() {
	if (supportedRoles.indexOf(accessRole) === -1) {
		return (
			<Switch>
				<Route
					exact
					path="/admin/stock-and-price"
					//component={ManageOrganization}
					render={
						props => (
							<StockManagement {...props} />
						)
					}
				/>

				<Route
					exact
					path="/admin/stock-and-price/list"
					//component={ManageOrganization}
					render={
						props => (
							<CreateOrUpdateStockPrice {...props} />
						)
					}
				/>

				<Route
					exact
					path="/admin/stock-and-price/modified-list/:outletName"
					//component={ManageOrganization}
					render={
						props => (
							<ModifiedStockList {...props} />
						)
					}
				/>
			</Switch>
		)
	}
	return <div />
}

function RetailerManagementSwitch() {
	if (supportedRoles.indexOf(accessRole) !== -1) {
		return (
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
					path="/admin/retailer/notes/:retailerId"
					render={props => <RetailerNotes {...props} />}
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
					path="/admin/access-logs"
					component={AccessLogs}
				/>

				<Route
					exact
					path="/admin/stock-and-price"
					//component={ManageOrganization}
					render={
						props => (
							<StockManagement {...props} />
						)
					}
				/>

				<Route
					exact
					path="/admin/stock-and-price/list"
					//component={ManageOrganization}
					render={
						props => (
							<CreateOrUpdateStockPrice {...props} />
						)
					}
				/>

				<Route
					exact
					path="/admin/stock-and-price/modified-list/:outletName"
					//component={ManageOrganization}
					render={
						props => (
							<ModifiedStockList {...props} />
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
		)
	}
	return <div />
}

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			currentRoute: location.pathname.split('/')[2] || 'stock-and-price'
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
		const authInfoUrl = `https://auth.${process.env.BASE_URL}/user/account/info`
		fetch(authInfoUrl, fetchOptions)
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
						history.push('/admin/stock-and-price')
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
				{
					<div>
						<Route path='/admin/login' component={Login} />

						{
							supportedRoles.indexOf(accessRole) !== -1 &&
							<Route
								path='/admin/retailer-onboarding-form/:orgId'
								//component={RetailerForm}
								render={
									props => (
										<RetailerForm {...props} />
									)
								}
							/>
						}
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
											{ label: 'Stock and Price', value: 'stock-and-price' },
											{ label: 'Access Logs', value: 'access-logs' },
											{ label: "Account", value: "account" },
											{ label: "Manage Credit & Debit", value: "manage-credit-debit" }
										]}
										currentRoute={this.state.currentRoute}
									/>
									<StockManagementSwitch />
									<RetailerManagementSwitch />
									<Route
										exact
										path="/admin/account"
										render={
											props => (
												<Account {...props} />
											)
										}
									/>
									<Route
										exact
										path="/admin/manage-credit-debit"
										render={
											props => (
												<ManageCreditDebit {...props} />
											)
										}
									/>
								</div>
							</div>
						}
					</div>
				}
			</Router>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'))

export default App
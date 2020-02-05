import React from 'react'
import ReactDOM from 'react-dom'
import {
	Switch,
	Route,
} from 'react-router-dom'
import { Router } from 'react-router'
import { createSession } from './login/utils'

import Login from './login'
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
import RetailerSOA from "./dashboard/RetailerSOA"
import CreateRetailer from './dashboard/manage-retailer/create-retailer'
import EditRetailer from './dashboard/manage-retailer/edit-retailer'
import RetailerList from "./dashboard/device-management/index"
import DeviceList from "./dashboard/device-management/device-list"
import GenerateReport from './dashboard/generate-report'
import AccessLogs from "./dashboard/access-logs"
import CreateOrUpdateStockPrice from './dashboard/stock-management/retailer-inventory'
import StockManagement from "./dashboard/stock-management"
import ModifiedStockList from "./dashboard/stock-management/modifiedStockSummary"
import Account from "./dashboard/Account"
import ManageCreditDebit from "./dashboard/ManualDebitCredit"
import ManageAccountManager from "./dashboard/account-manager"
import CreateAccountManager from "./dashboard/account-manager/create-account-manager"
import EditAccountManager from "./dashboard/account-manager/edit-account-manager"
import ManageDMO from "./dashboard/manage-dmo"
import CreateDMO from "./dashboard/manage-dmo/create-dmo"
import EditDMO from "./dashboard/manage-dmo/edit-dmo"

const history = createHistory()
const supportedRoles = ["admin", "opdataadmin", "opdataentry"]
const accessRole = localStorage.getItem('x-hasura-role') ? localStorage.getItem('x-hasura-role') : ''

function StockManagementSwitch () {
	if (supportedRoles.indexOf(accessRole) === -1) {
		return (
			<Switch>
				<Route
					exact
					path="/admin/stock-and-price"
					render={
						props => (
							<StockManagement {...props} />
						)
					}
				/>

				<Route
					exact
					path="/admin/stock-and-price/list"
					render={
						props => (
							<CreateOrUpdateStockPrice {...props} />
						)
					}
				/>

				<Route
					exact
					path="/admin/stock-and-price/modified-list/:outletName"
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

function RetailerManagementSwitch () {
	if (supportedRoles.indexOf(accessRole) !== -1) {
		return (
			<Switch>
				<Route
					exact
					path="/admin/organization/create"
					render={
						props => (
							<CreateOrganization {...props} />
						)
					}
				/>

				<Route
					exact
					path="/admin/organization/edit/:organizationId"
					render={
						props => (
							<EditOrganization {...props} />
						)
					}
				/>

				<Route
					exact
					path="/admin/account-manager/:organizationId"
					render={
						props => (
							<ManageAccountManager {...props} />
						)
					}
				/>

				<Route
					exact
					path="/admin/account-manager/create/:organizationId"
					render={
						props => (
							<CreateAccountManager {...props} />
						)
					}
				/>

				<Route
					exact
					path="/admin/account-manager/edit/:organizationId"
					render={
						props => (
							<EditAccountManager {...props} />
						)
					}
				/>

				<Route
					exact
					path="/admin/organization/:organizationId"
					render={
						props => (
							<OrganizationDetails {...props} />
						)
					}
				/>

				<Route
					exact
					path="/admin/retailer"
					render={
						props => (
							<ManageRetailer {...props} />
						)
					}
				/>

				<Route
					exact
					path="/admin/dmo"
					render={
						props => (
							<ManageDMO {...props} />
						)
					}
				/>
				<Route
					exact
					path="/admin/retailer/create"
					render={
						props => (
							<CreateRetailer {...props} />
						)
					}
				/>

				<Route
					exact
					path="/admin/retailer/edit/:retailerId"
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
				/>

				<Route
					exact
					path="/admin/retailer/notes/:retailerId"
					render={props => <RetailerNotes {...props} />}
				/>

				<Route
					exact
					path="/admin/retailer/soa/:retailerId"
					render={props => <RetailerSOA {...props} />}
				/>

				<Route
					exact
					path="/admin/dmo"
					render={
						props => (
							<ManageDMO {...props} />
						)
					}
				/>
        
				<Route
					exact
					path="/admin/dmo/create"
					render={
						props => (
							<CreateDMO {...props} />
						)
					}
				/>

				<Route
					exact
					path="/admin/dmo/edit/:retailerId"
					render={
						props => (
							<EditDMO {...props} />
						)
					}
				/>
				<Route
					exact
					path="/admin/generate-report"
					component={GenerateReport}
				/>

				<Route
					exact
					path="/admin/access-logs"
					component={AccessLogs}
				/>

				<Route
					exact
					path="/admin/stock-and-price"
					render={
						props => (
							<StockManagement {...props} />
						)
					}
				/>

				<Route
					exact
					path="/admin/stock-and-price/list"
					render={
						props => (
							<CreateOrUpdateStockPrice {...props} />
						)
					}
				/>

				<Route
					exact
					path="/admin/stock-and-price/modified-list/:outletName"
					render={
						props => (
							<ModifiedStockList {...props} />
						)
					}
				/>

				<Route
					exact
					path="/admin/device-management"
					render={
						props => (
							<RetailerList {...props} />
						)
					}
				/>

				<Route
					exact
					path="/admin/device-management/:retailerId"
					render={
						props => (
							<DeviceList {...props} />
						)
					}
				/>

				<Route
					exact
					path="/admin"
					render={
						props => (
							<ManageOrganization {...props} />
						)
					}
				/>

				<Route
					exact
					path="/admin/organization"
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
	constructor () {
		super()
		this.state = {
			currentRoute: location.pathname.split('/')[2] || 'stock-and-price'
		}
	}
	
	componentDidMount () {
		history.listen((location) => {
			const newRoute = location.pathname.split('/')[2]
			if (newRoute !== this.state.currentRoute) {
				//unmountNotify()
				this.setState({ currentRoute: newRoute })
			}
		})
	}

	UNSAFE_componentWillMount () {
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

	render () {

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
											{ label: 'Manage DMO', value:'dmo' },
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

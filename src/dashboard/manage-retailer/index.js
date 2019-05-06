import React from 'react'
import Layout from 'Components/layout'
import { Table } from '@auth0/cosmos'
import { Icon, Spinner, List, Dialog } from '@auth0/cosmos'
import { Select, TextInput } from '@auth0/cosmos'
import { Button } from '@auth0/cosmos'
import Pagination from 'Components/pagination'
import { getQueryObj, getQueryUri } from 'Utils/url-utils'
import { NavLink } from 'react-router-dom'
import Switch2 from 'Components/switch'
import * as Api from './../../api'
import CustomButton from 'Components/button'
import ModalHeader from 'Components/ModalBox/ModalHeader'
import ModalBody from 'Components/ModalBox/ModalBody'
import ModalBox from 'Components/ModalBox'
import ModalFooter from '../../components/ModalBox/ModalFooter';

class ManageRetailer extends React.Component {

	constructor() {
		super()
		this.defaultFilters = {
			column: '',
			operator: 'EQUAL',
			value: ''
		}
		this.state = {
			activePage: 1,
			offset: 0,
			loading: true,
			retailerListCount: 0,
			retailerData: [],
			retailerId: '',
			retailerStatus: '',
			outletName: '',
			mountDialog: false,
			operators: [
				{ text: 'EQUAL', value: 'EQUAL' },
				{ text: 'LIKE', value: 'LIKE' },
				{ text: 'IGNORE CASE', value: 'CASEIGNORE' },
			],
			...this.defaultFilters
		}

		this.filter = {
			column: '',
			operator: '',
			value: ''
		}

		this.pagesLimit = 10
		this.handlePageChange = this.handlePageChange.bind(this)
		this.resetFilter = this.resetFilter.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.getFilteredRetailersList = this.getFilteredRetailersList.bind(this)
		this.fetchDefaultData = this.fetchDefaultData.bind(this)
		this.fetchRetailerList = this.fetchRetailerList.bind(this)
		this.setResponseData = this.setResponseData.bind(this)
		this.editOutletDetail = this.editOutletDetail.bind(this)
		this.onToggleChange = this.onToggleChange.bind(this)
		this.handleRowClick = this.handleRowClick.bind(this)
		this.callback = this.callback.bind(this)
		this.failureCallback = this.failureCallback.bind(this)
		this.setDialogState = this.setDialogState.bind(this)
		this.deactivateRetailer = this.deactivateRetailer.bind(this)
	}

	fetchDefaultData() {
		this.setState({ retailerData: [], retailerListCount: 0 })
		//this.fetchOrganizationList({}, this.formatOrganizationList)
		this.fetchRetailerList({
			offset: 0,
			limit: this.pagesLimit,
		}, this.setResponseData, this.failureCallback)
	}

	componentDidMount() {
		if (location.search.length) {
			this.setQueryParamas()
		} else {
			this.fetchDefaultData()
		}
	}

	setQueryParamas() {
		const queryUri = location.search.slice(1)
		const queryObj = getQueryObj(queryUri)

		Object.entries(queryObj).forEach((item) => {
			this.setState({ [item[0]]: item[1] })
			this.filter[item[0]] = item[1]
		})
		this.setState({ retailerData: [], retailerListCount: 0, loading: true })

		if (queryObj.column && queryObj.column.length > 0) {
			this.fetchRetailerList({
				offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
				limit: this.pagesLimit,
				filter: this.filter
			}, this.setResponseData, this.failureCallback)
		} else {
			this.fetchRetailerList({
				offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
				limit: this.pagesLimit,
			}, this.setResponseData, this.failureCallback)
		}

	}

	fetchRetailerList(payloadObj, successCallback, failureCallback) {
		Api.fetchRetailerList(payloadObj, successCallback, failureCallback)
	}

	getFilteredRetailersList() {
		const { column, operator, value, offset, activePage } = this.state

		this.filter = {
			column,
			operator,
			value
		}

		const queryObj = {
			column,
			operator,
			value,
			offset,
			activePage,
		}

		this.setState({
			retailerData: [],
			retailerListCount: 0,
			loading: true,
			offset,
			activePage,
			column,
			operator,
			value
		})

		history.pushState(queryObj, "retailer listing", `/admin/retailer?${getQueryUri(queryObj)}`)

		this.fetchRetailerList({
			limit: this.pagesLimit,
			offset: 0,
			filter: this.filter
		}, this.setResponseData, this.failureCallback)
	}

	setResponseData(response) {
		if (response && response.ret_response) {
			this.setState({ retailerData: response.ret_response, retailerListCount: response.count, loading: false })
		} else {
			this.setState({ retailerData: [], retailerListCount: 0, loading: false })
		}
	}

	failureCallback() {
		this.setState({ retailerData: [], retailerListCount: 0, loading: false })
	}

	handlePageChange(pageObj) {
		const queryUri = location.search.slice(1)
		const queryObj = getQueryObj(queryUri)
		let queryParamsObj = {}

		let pageNumber = pageObj.activePage
		let offset = pageObj.offset
		this.setState({ activePage: pageNumber, offset, loading: true })

		if (queryObj && queryObj.column && queryObj.column.length > 0) {
			queryParamsObj = {
				column: queryObj.column,
				operator: queryObj.operator,
				value: queryObj.value,
				offset: pageObj.offset,
				activePage: pageObj.activePage,
			}
		} else {
			queryParamsObj = {
				offset: pageObj.offset,
				activePage: pageObj.activePage,
			}
		}

		if (location.search.length && queryObj.column && queryObj.column.length > 0) {
			let filterObj = {
				column: queryObj.column,
				operator: queryObj.operator,
				value: queryObj.value
			}
			this.fetchRetailerList({
				offset: pageObj.offset,
				limit: this.pagesLimit,
				filter: filterObj
			}, this.setResponseData, this.failureCallback)

		} else {

			this.fetchRetailerList({
				offset: pageObj.offset,
				limit: this.pagesLimit
			}, this.setResponseData, this.failureCallback)
		}

		history.pushState(queryParamsObj, "retailer listing", `/admin/retailer?${getQueryUri(queryParamsObj)}`)
	}

	handleChange(e) {
		if (e.target.name === "column" && (e.target.value === "ID" || e.target.value === "OrganisationID")) {
			this.setState({
				operators: [
					{ text: 'EQUAL', value: 'EQUAL' },
				],
				operator: 'EQUAL'
			})
		} else if (e.target.name === "column") {
			this.setState({
				operators: [
					{ text: 'EQUAL', value: 'EQUAL' },
					{ text: 'LIKE', value: 'LIKE' },
					{ text: 'IGNORE CASE', value: 'CASEIGNORE' },
				]
			})
		} else if (e.target.name === "value") {
			this.setState({ offset: 0, activePage: 1 })
		}
		this.setState({ [e.target.name]: (e.target.value).toString() })
		//this.setState({[e.target.name]: (e.target.value).toString()})
	}

	editOutletDetail(e, item, action) {
		e.stopPropagation()
		this.props.history.push(`/admin/retailer/edit/${item.id}`, item)
	}

	resetFilter() {
		this.setState({
			column: '',
			operator: 'EQUAL',
			value: ''
		})
		this.fetchDefaultData()
		this.props.history.push(`/admin/retailer`)
	}

	onToggleChange(item, value) {
		this.setState({ mountDialog: true, retailerId: item.id, retailerStatus: item.branch_status, outletName: item.outlet_name })
	}

	setDialogState() {
		this.setState({ mountDialog: false })
	}

	deactivateRetailer() {
		this.setDialogState()
		Api.deactivateRetailer({
			Id: this.state.retailerId,
			BranchStatus: this.state.retailerStatus === "true" ? "false" : "true"
		}, this.callback)
	}

	callback() {
		this.handlePageChange({
			activePage: this.state.activePage,
			offset: this.state.offset
		})
	}

	handleRowClick(e, item) {
		if (["SPAN", "A"].indexOf(e.target.nodeName) > -1) {
			return
		}
		this.props.history.push(`/admin/retailer/${item.id}`, item)
	}

	render() {
		const { retailerData } = this.state
		return (
			<Layout title="Manage Retailer">

				<div style={{ width: '200px', marginTop: '20px' }}>
					<NavLink to={`/admin/retailer/create`}>
						<CustomButton text="CREATE RETAILER" />
					</NavLink>
				</div>

				<div style={{ marginTop: '20px' }}>
					<div style={{
						width: '210px',
						display: 'inline-block',
						verticalAlign: 'bottom',
						marginRight: '20px'
					}}
					>
						<p style={{ margin: '10px 0' }}>Field</p>
						<Select
							placeholder="Select an field..."
							value={this.state.column}
							name="column"
							options={[
								{ text: 'ID', value: 'ID' },
								{ text: 'RETAILER NAME', value: 'RetailerName' },
								{ text: 'CITY NAME', value: 'CityName' },
								{ text: 'ORGANIZATION ID', value: 'OrganisationID' }
							]}
							onChange={(e) => this.handleChange(e)}
						/>
					</div>

					<div style={{
						width: '180px',
						display: 'inline-block',
						verticalAlign: 'bottom',
						marginRight: '20px'
					}}
					>
						<p style={{ margin: '10px 0' }}>Operator</p>
						<Select
							placeholder="Select an operator..."
							value={this.state.operator}
							name="operator"
							options={this.state.operators}
							onChange={(e) => this.handleChange(e)}
						/>
					</div>

					<div style={{
						width: '240px',
						display: 'inline-block',
						verticalAlign: 'bottom',
						marginRight: '20px'
					}}
					>
						<p style={{ margin: '10px 0' }}>Search Text</p>
						<TextInput
							placeholder="Contains"
							type="text"
							size="default"
							name="value"
							value={this.state.value}
							onChange={(e) => this.handleChange(e)}
						/>
					</div>
					<div
						style={{
							verticalAlign: 'bottom',
							display: 'inline-block',
							marginRight: '20px'
						}}
					>
						<CustomButton text="Search" handleClick={this.getFilteredRetailersList} />
					</div>
					<div
						style={{
							verticalAlign: 'bottom',
							display: 'inline-block',
						}}
					>
						<CustomButton text="Reset" handleClick={this.resetFilter} />
					</div>
				</div>
				{
					<div style={{ marginTop: '40px', marginBottom: '20px' }}>
						<Table
							emptyMessage={this.state.loading ? <Spinner /> : 'No records found'}
							items={retailerData}
							onRowClick={(e, item) => this.handleRowClick(e, item)}
						>
							<Table.Column field="actions">
								{item => (
									<Button icon="pencil" onClick={(e) => this.editOutletDetail(e, item, 'edit')} />
								)}
							</Table.Column>
							<Table.Column>
								{item => <NavLink to={`/admin/retailer/notes/${item.id}`}>Notes</NavLink>}
							</Table.Column>
							<Table.Column field="id" title="Retailer Id" />
							<Table.Column field="outlet_name" title="Outlet Name" />
							<Table.Column field="store_address" title="Outlet Address" />
							<Table.Column field="state_name" title="State" />
							<Table.Column field="city_name" title="City" />
							<Table.Column field="organisation_id" title="Organization Id" />
							<Table.Column field="organisation_name" title="Organization Name" />
							<Table.Column field="actions" title="Outlet Status">
								{item => (
									<Switch2 on={item.branch_status === 'true' ? true : false} accessibleLabels={[]} onToggle={this.onToggleChange} value={item} />
								)}
							</Table.Column>
						</Table>
					</div>
				}
				{
					this.state.mountDialog &&
					<ModalBox>
						<ModalHeader>
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<div style={{ fontSize: '18px' }}>{this.state.retailerStatus === "true" ? 'Deactivate' : 'Activate'} Outlet</div>
							</div>
						</ModalHeader>
						<ModalBody height='60px'>
							<table className='table--hovered'>
								<tbody>
									Are you sure you want to {this.state.retailerStatus === "true" ? 'Deactivate' : 'Activate'} this outlet - {this.state.outletName} ({this.state.retailerId})
                                </tbody>
							</table>
						</ModalBody>
						<ModalFooter>
							<div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontWeight: '600' }}>
								<button className='btn btn-primary' onClick={() => this.deactivateRetailer()}> OK </button>
								<button className='btn btn-secondary' onClick={() => this.setDialogState()}> Cancel </button>
							</div>
						</ModalFooter>

					</ModalBox>
				}
				{
					this.state.retailerData && this.state.retailerData.length > 0 &&
					<Pagination
						activePage={parseInt(this.state.activePage)}
						itemsCountPerPage={this.pagesLimit}
						totalItemsCount={parseInt(this.state.retailerListCount)}
						setPage={this.handlePageChange}
					/>
				}
			</Layout>
		)
	}
}

export default ManageRetailer
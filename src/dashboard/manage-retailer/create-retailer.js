import React from 'react'
import Layout from 'Components/layout'
import Card from 'Components/card'
import RetailerForm from './retailer-form'
import * as Api from './../../api'
import 'Sass/animations.scss'
import { formatStateAndCityList, formatStateAndOrganizationList } from 'Utils/response-format-utils'

class CreateRetailer extends React.Component {
	constructor () {
		super()
		this.state = {
			creatingRetailer: false,
			isFormValid: true,
			organizationList: [],
			stateList: [],
			stateMap: {},
			organizationMap: {},
			cityList: []
		}
		this.handleSave = this.handleSave.bind(this)
		this.createRetailer = this.createRetailer.bind(this)
		this.successCallback = this.successCallback.bind(this)
		this.failureCallback = this.failureCallback.bind(this)
		this.updateState = this.updateState.bind(this)
		this.fetchOrganizationAndStateList = this.fetchOrganizationAndStateList.bind(this)
		this.formatOrganizationList = this.formatOrganizationList.bind(this)
		this.fetchStateAndCityList = this.fetchStateAndCityList.bind(this)
		this.formatResponse = this.formatResponse.bind(this)
	}

	componentDidMount () {
		this.fetchStateAndCityList({}, this.formatResponse)
		this.fetchOrganizationAndStateList({}, this.formatOrganizationList)
	}

	fetchOrganizationAndStateList (payloadObj, organizationListSuccessCallback) {
		Api.fetchOrganizationAndStateList(payloadObj, organizationListSuccessCallback)
	}

	formatOrganizationList (data) {
		const { organizationList, organizationMap } = formatStateAndOrganizationList(data.details)
		this.setState({ organizationList, organizationMap })
	}

	fetchStateAndCityList (payload, stateListSuccessCallback) {
		Api.fetchStateAndCityList(payload, stateListSuccessCallback)
	}

	formatResponse (data) {
		const { stateList, cityList, stateMap } = formatStateAndCityList(data.states)
		this.setState({ stateList, cityList, stateMap })
	}

	handleSave () {
		const retailerDataForm = this.retailerDetailsForm.getData()
		const payload = {
			organisation_id: retailerDataForm.selectedOrganizationIdx,
			//branch_status: retailerDataForm.selectedOutletStatusIdx,
			ksbcl_code: retailerDataForm.storeCode,
			outlet_name: retailerDataForm.outletName,
			excise_licence_number: retailerDataForm.exciseLicenceNo,
			discount_percent: retailerDataForm.discountPercent,
			delivery_discount_percent: retailerDataForm.deliveryDiscountPercent,
			service_charge_percent: retailerDataForm.serviceChargePercent,
			kyc_status: retailerDataForm.selectedKycIdx === "1" ? "true" : "false",
			branch_status: retailerDataForm.selectedOutletStatusIdx === "1" ? "true" : "false",
			fssai_no: retailerDataForm.FSSAINumber,
			city_id: retailerDataForm.selectedCityIdx,
			state_id: retailerDataForm.selectedStateIdx,
			pincode: retailerDataForm.pincode,
			store_address: retailerDataForm.outletAddress,
			landline_number: retailerDataForm.landlineNo,
			mobile_number: retailerDataForm.mobileNo,
			email: retailerDataForm.email,
			gps_cordinates: retailerDataForm.gpsCoordinates,
			bank_name: retailerDataForm.bankName,
			acc_holder_name: retailerDataForm.accountHolderName,
			account_number: retailerDataForm.accountNumber,
			bank_branch: retailerDataForm.branch,
			acc_type: retailerDataForm.accountType,
			ifsc_code: retailerDataForm.IFSC,
			is_cancelled_cheque: retailerDataForm.cancelledCheck,
			is_excise_license: retailerDataForm.exciseLicense,
			is_photo_of_outlet: retailerDataForm.outletPhoto
		}
		this.setState({ creatingRetailer: true })
		this.createRetailer(payload, this.successCallback, this.failureCallback)
	}

	successCallback () {
		this.updateState()
		location.href = '/admin/retailer'
	}

	failureCallback () {
		this.updateState()
	}

	updateState () {
		this.setState({ creatingRetailer: false })
	}

	createRetailer (payload, successCallback, failureCallback) {
		Api.createRetailer(payload, successCallback, failureCallback)
	}

	render () {
		return (
			<Layout title="Create Retailer">
				<Card width="800px" className={!this.state.isFormValid ? 'animated shake' : ''}>
					<RetailerForm
						ref={(node) => { this.retailerDetailsForm = node }}
						OnSaveClick={this.handleSave}
						organizationList={this.state.organizationList}
						stateList={this.state.stateList}
						organizationMap={this.state.organizationMap}
						stateMap={this.state.stateMap}
						cityList={this.state.cityList}
						handleSave={this.handleSave}
						disableSave={this.state.creatingRetailer}
					/>
				</Card>
			</Layout>
		)
	}
}

export default CreateRetailer
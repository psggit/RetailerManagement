import React from 'react'
import Layout from 'Components/layout'
import Card from 'Components/card'
import OrganizationForm from './organization-form'
import { Form, Checkbox, Button, ButtonGroup } from '@auth0/cosmos'
import * as Api from './../../api'
import 'Sass/animations.scss'
import { formatStateAndCityList } from 'Utils/response-format-utils'

class CreateOrganization extends React.Component {
	constructor() {
		super()
		this.state = {
			creatingOrg: false,
			isFormValid: true,
			stateList: [],
			cityList: [],
			stateMap: {}
		}
		this.handleSave = this.handleSave.bind(this)
		this.successCallback = this.successCallback.bind(this)
		this.failureCallback = this.failureCallback.bind(this)
		this.updateState = this.updateState.bind(this)
		this.fetchStateAndCityList = this.fetchStateAndCityList.bind(this)
		this.formatResponse = this.formatResponse.bind(this)
	}

	componentDidMount() {
		this.fetchStateAndCityList({}, this.formatResponse)
	}

	fetchStateAndCityList(payload, stateListSuccessCallback) {
		Api.fetchStateAndCityList(payload, stateListSuccessCallback)
	}

	formatResponse(data) {
		const { stateList, cityList, stateMap } = formatStateAndCityList(data.states)
		this.setState({ stateList, cityList, stateMap })
	}

	handleSave() {
		const data = this.organizationDetailsForm.getData()
		const payload = {
			type_of_organisation: data.organizationType === "others" ? data.otherOrgType : data.organizationType,
			organisation_name: data.organizationName,
			date_of_incorporation: data.incorporationDate ? new Date(data.incorporationDate).toISOString() : '',
			pan_number: data.panNumber,
			cin_no: data.cinNumber,
			status: data.selectedOrganizationStatusIdx === "1" ? "true" : "false",
			kyc_status: data.selectedKycIdx === "1" ? "true" : "false",
			no_of_outlets: parseInt(data.outletsCount),
			gst_no: data.GSTNumber,
			name_of_auth_person: data.authorizedPerson,
			photo_of_auth_signatory: data.photo,
			pan_of_auth_signatory: data.pancard,
			address_proof_auth_signatory: data.address,
			is_pan: ((data.organizationType === "partnership" || data.organizationType === "pvtltd") && data.partnershipPancard || data.pvtPancard) ? true : false,
			partnership_deed: (data.organizationType === "partnership" || data.organizationType === "pvtltd") ? data.partnershipDeed : false,
			loa: ((data.organizationType === "partnership" || data.organizationType === "pvtltd") && data.partnershipLOA || data.pvtLOA) ? true : false,
			coi: (data.organizationType === "partnership" || data.organizationType === "pvtltd") ? data.pvtCOI : false,
			org_address: data.organizationAddress,
			city_id: data.selectedCityIdx,
			pincode: data.pincode,
			state_id: data.selectedStateIdx,
			landline_number: data.landlineNo,
			mobile_number: data.mobileNo,
			email: data.email,
			other_documents: data.otherProof
		}
		this.setState({ creatingOrg: true })
		this.createOrganization(payload, this.successCallback, this.failureCallback)
	}

	successCallback() {
		this.updateState()
		location.href = '/admin/organization'
	}

	failureCallback() {
		this.updateState()
	}

	updateState() {
		this.setState({ creatingOrg: false })
	}

	createOrganization(payload, successCallback, failureCallback) {
		Api.createOrganization(payload, successCallback, failureCallback)
	}

	render() {
		return (
			<Layout title="Create Organization">
				<Card width="800px" className={!this.state.isFormValid ? 'animated shake' : ''}>
					<OrganizationForm
						ref={(node) => { this.organizationDetailsForm = node }}
						OnSaveClick={this.handleSave}
						stateList={this.state.stateList}
						cityList={this.state.cityList}
						stateMap={this.state.stateMap}
						handleSave={this.handleSave}
						disableSave={this.state.creatingOrg}
					/>
				</Card>
			</Layout>
		)
	}
}

export default CreateOrganization
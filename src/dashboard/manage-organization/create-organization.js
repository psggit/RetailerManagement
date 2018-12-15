import React from 'react'
import Layout from 'Components/layout'
import Card from 'Components/card'
import OrganizationForm from './organization-form'
import { Form, Checkbox, Button, ButtonGroup } from '@auth0/cosmos'
//import { POST } from 'Utils/fetch'
import * as Api from './../../api'
import 'Sass/animations.scss'
import {formatStateAndCityList} from 'Utils/response-format-utils'
import {stateAndCityList} from './../../mockData'
// import * as Api from './../../api'

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
        this.formIsValid =  this.formIsValid.bind(this)
        this.fetchStateAndCityList = this.fetchStateAndCityList.bind(this)
        this.formatResponse = this.formatResponse.bind(this)
    }

    componentDidMount() {

        this.fetchStateAndCityList({},this.formatResponse)

    }

    fetchStateAndCityList(payload, stateListSuccessCallback) {
        Api.fetchStateAndCityList(payload, stateListSuccessCallback)
    }

    formatResponse(data) {
        const {stateList, cityList, stateMap} = formatStateAndCityList(data.states)
        this.setState({stateList, cityList, stateMap})   
    }

    formIsValid() {
        const organizationDetailsForm = this.organizationDetailsForm.getData()
    
        const { organizationNameErr, 
                incorporationDateErr, 
                cinNumberErr, 
                panNumberErr, 
                GSTNumberErr,
                organizationAddressErr,
                pincodeErr,
                landlineNoErr,
                authorizedPersonErr,
                mobileNoErr,
                emailIdErr,
                otherOrgTypeErr,
                otherOrgType,
                otherProofErr,
                otherProof,
                organizationType,
                isOtherProof
                // otherParnershipProof,
                // partnershipDocErr,
                // otherPvtLtdProof,
                // privateDocErr
            } = organizationDetailsForm 
        
        const formData = {
            organizationNameErr, 
            incorporationDateErr, 
            cinNumberErr, 
            panNumberErr, 
            GSTNumberErr,
            organizationAddressErr,
            pincodeErr,
            landlineNoErr,
            authorizedPersonErr,
            mobileNoErr,
            emailIdErr,
            otherOrgTypeErr,
            otherProofErr
        }

        for(const key in formData) {
            if(formData[key].status && formData[key].value.toString().length === 0){
                return false
            } 
        }

        if(organizationType === "others" && otherOrgType.toString().length === 0) {
                return false
        }

        if(isOtherProof && otherProof.toString().length === 0) {
                return false
        }

       return true
    }

    handleSave() {
        const data = this.organizationDetailsForm.getData()
        this.setState({isFormValid: this.formIsValid()})
        if(this.formIsValid()) {
            const payload = {
                type_of_organisation: data.organizationType === "others" ? data.otherOrgType : data.organizationType,
                organisation_name: data.organizationName,
                date_of_incorporation: new Date(data.incorporationDate).toISOString(),
                pan_number: data.panNumber,
                cin_no: data.cinNumber,
                status: data.selectedOrganizationStatusIdx === 1 ? "true" : "false",
                kyc_status: data.selectedKycIdx === 1 ? "true" : "false",
                no_of_outlets: parseInt(data.outletsCount),
                gst_no: data.GSTNumber,
                name_of_auth_person: data.authorizedPerson,
                photo_of_auth_signatory: data.photo,
                pan_of_auth_signatory: data.pancard,
                address_proof_auth_signatory: data.address,
                is_pan: ((data.organizationType === "partnership" || data.organizationType==="pvtltd") && data.partnershipPancard || data.pvtPancard) ? true : false,
                partnership_deed: (data.organizationType === "partnership" || data.organizationType==="pvtltd") ? data.partnershipDeed : false,
                loa: ((data.organizationType === "partnership" || data.organizationType==="pvtltd") && data.partnershipLOA || data.pvtLOA) ? true : false,
                coi: (data.organizationType === "partnership" || data.organizationType==="pvtltd") ? data.pvtCOI : false,
                org_address: data.organizationAddress,
                city_id: data.selectedCityIdx,
                pincode: data.pincode,
                state_id: data.selectedStateIdx,
                landline_number: data.landlineNo,
                mobile_number: data.mobileNo,
                email: data.email,
                otherProof: data.otherProof
            }
            this.setState({creatingOrg: true, activeSave: false})
            this.createOrganization(payload, this.successCallback, this.failureCallback)
        }
    }

    successCallback() {
        //console.log("success callback")
        this.updateState()
        location.href = '/home/manage-organization'
    }

    failureCallback() {
        this.updateState()
    }

    updateState() {
        this.setState({creatingOrg: false})
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
                        OnSaveClick = {this.handleSave}
                        stateList = {this.state.stateList}
                        cityList = {this.state.cityList}
                        stateMap= {this.state.stateMap}
                    />
                    <ButtonGroup align="right">
                        <Button 
                            onClick={() => this.handleSave()} 
                            loading={this.state.creatingOrg}
                            disabled={this.state.creatingOrg}
                        > 
                            Save 
                        </Button>
                    </ButtonGroup>
                </Card> 
            </Layout>
        )
    }
}

export default CreateOrganization
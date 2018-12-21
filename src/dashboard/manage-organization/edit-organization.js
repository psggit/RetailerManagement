import React from 'react'
import Layout from 'Components/layout'
import OrganizationForm from './organization-form';
import Card from 'Components/card'
import { Form, Checkbox, Button, ButtonGroup } from '@auth0/cosmos'
import * as Api from './../../api'
import 'Sass/animations.scss'
import {formatStateAndCityList} from 'Utils/response-format-utils'

class EditOrganization extends React.Component {
    constructor() {
        super()
        this.state = {
            updatingOrg: false,
            isFormValid: true,
            stateList: [],
            cityList: [],
            stateMap: {}
        }
        this.handleSave = this.handleSave.bind(this)
        this.updateOrganization = this.updateOrganization.bind(this)
        this.successCallback = this.successCallback.bind(this)
        this.failureCallback = this.failureCallback.bind(this)
        this.updateState = this.updateState.bind(this)
        this.formIsValid = this.formIsValid.bind(this)
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
                emailErr,
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
            emailErr,
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
        //console.log("data", data)
        this.setState({isFormValid: this.formIsValid()})
        if(this.formIsValid()) {
            const payload = {
                id: parseInt(this.props.location.state.id),
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
                is_pan: data.partnershipPancard || data.pvtPancard ? true : false,
                partnership_deed: data.partnershipDeed,
                loa: data.partnershipLOA || data.pvtLOA ? true : false,
                coi: data.pvtCOI,
                org_address: data.organizationAddress,
                city_id: (data.selectedCityIdx).toString(),
                pincode: data.pincode,
                state_id: (data.selectedStateIdx).toString(),
                landline_number: data.landlineNo,
                mobile_number: data.mobileNo,
                email: data.email,
                other_documents: data.otherProof
            }
            this.setState({updatingOrg: true})
            this.updateOrganization(payload, this.successCallback, this.failureCallback)
        }
    }

    successCallback() {
        this.updateState()
        location.href = '/admin/organization'
    }

    failureCallback() {
        this.updateState()
    }

    updateState() {
        this.setState({updatingOrg: false})
    }

    updateOrganization(payload, successCallback, failureCallback) {
        Api.updateOrganization(payload, successCallback, failureCallback)
    }

    render() {
        const {stateList, cityList} = this.state
        return (
            <Layout title="Edit Organization">
                <Card width="800px"  className={!this.state.isFormValid ? 'animated shake' : ''}>
                    <OrganizationForm
                        ref={(node) => { this.organizationDetailsForm = node }}
                        data={this.props.history.location.state}
                        stateList = {stateList}
                        cityList = {cityList}
                        stateMap= {this.state.stateMap}
                        handleSave = {this.handleSave} 
                    />
                    {/* <ButtonGroup align="right">
                        <Button 
                            onClick={() => this.handleSave()} 
                            loading={this.state.updatingOrg}
                            disabled={this.state.updatingOrg}
                        > 
                            Save 
                        </Button>
                    </ButtonGroup> */}
                </Card>
            </Layout>
        )
    }
}

export default EditOrganization
import React from 'react'
import Layout from 'Components/layout'
import Card from 'Components/card'
import OrganizationForm from './organization-form'
import { Form, Checkbox, Button, ButtonGroup } from '@auth0/cosmos'
//import { POST } from 'Utils/fetch'
import * as Api from './../../api'
import 'Sass/animations.scss'

class CreateOrganization extends React.Component {
    constructor() {
        super()
        this.state = {
            creatingOrg: false,
            isFormValid: true
        }
        this.handleSave = this.handleSave.bind(this)
        this.successCallback = this.successCallback.bind(this)
        this.failureCallback = this.failureCallback.bind(this)
        this.updateState = this.updateState.bind(this)
        this.formIsValid =  this.formIsValid.bind(this)
    }

    formIsValid() {
        const organizationDetailsForm = this.organizationDetailsForm.getData()
        //console.log("log", organizationDetailsForm)
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
                otherParnershipProof,
                partnershipDocErr,
                otherPvtLtdProof,
                privateDocErr
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
        }
       //console.log("form data", formData)
       for(const key in formData) {
           //console.log("form data", formData[key].value.toString().length)  
           if(!formData[key].status && formData[key].value.toString().length === 0){
               return false
           } 
       }

       if(otherParnershipProof && partnershipDocErr.value.toString().length === 0) {
            return false
       }

       if(otherPvtLtdProof && privateDocErr.value.toString().length === 0) {
            return false
       }

       return true
    }

    handleSave() {
        //console.log("data", this.organizationDetailsForm.getData())
        const data = this.organizationDetailsForm.getData()
        this.setState({isFormValid: this.formIsValid()})
        //console.log("save", this.state.formError)
        if(this.formIsValid()) {
            const payload = {
                type_of_organisation: data.organizationType,
                organisation_name: data.organizationName,
                data_of_incorporation: data.incorporationDate,
                pan_number: data.panNumber,
                cin_no: data.cinNumber,
                status: data.selectedOrganizationStatusIdx === 1 ? "true" : "false",
                kyc_status: data.selectedKycIdx === 1 ? "true" : "false",
                no_of_outlets: data.outletsCount,
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
                city_id: data.selectedCityIdx,
                pincode: data.pincode,
                state_id: data.selectedStateIdx,
                landline_number: data.landlineNo,
                mobile_number: data.mobileNo,
                email: data.emailId
            }
            this.setState({creatingOrg: true})
            this.createOrganization(payload, this.successCallback, this.failureCallback)
        }
        //e.preventDefault()
    }

    successCallback() {
        this.updateState()
        history.pushState(null, 'organization list', '/home/manage-organization')
    }

    failureCallback() {
        this.updateState()
    }

    updateState() {
        this.setState({creatingOrg: false})
    }

    createOrganization(payload, successCallback, failureCallback) {
        console.log("create organization", payload)
        // POST({
        //     api: '/deliveryStatus/liveOrders',
        //     apiBase: 'gremlinUrl',
        //     data: {
        //         limit: 10,
        //         offset: 0
        //     },
        //     handleError: true
        // })
        // .then((json) => {
        //     //this.setState({
        //     //       data: json.data,
        //     //       count: json.count,
        //     //       loading: false
        //     //     })
        //     Notify("success", "Successfully created organization")
        //     successCallback(json)
        // })
        // .catch(err => {
        //     err.response.json().then(json => { Notify("danger", json.message) })
        // })
    }

    render() {
        //console.log("form state", this.state.isFormValid)
        return (
            <Layout title="Create Organization">
                <Card width="800px" className={!this.state.isFormValid ? 'animated shake' : ''}>
                    <OrganizationForm
                        ref={(node) => { this.organizationDetailsForm = node }}
                        OnSaveClick = {this.handleSave}
                    />
                    <ButtonGroup align="right">
                        <Button 
                            onClick={() => this.handleSave()} 
                            loading={this.state.creatingOrg}
                            disabled={this.state.creatingOrg}
                        > 
                            Save 
                        </Button>
                        {/* <Button> Download </Button> */}
                    </ButtonGroup>
                </Card> 
            </Layout>
        )
    }
}

export default CreateOrganization
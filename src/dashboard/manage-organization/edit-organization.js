import React from 'react'
import Layout from 'Components/layout'
import OrganizationForm from './organization-form';
import Card from 'Components/card'
import { Form, Checkbox, Button, ButtonGroup } from '@auth0/cosmos'
//import { POST } from 'Utils/fetch'
import * as Api from './../../api'
import 'Sass/animations.scss'
import {formatStateAndCityList} from 'Utils/response-format-utils'
import {stateAndCityList} from './../../mockData'

class EditOrganization extends React.Component {
    constructor() {
        super()
        this.state = {
            updatingOrg: false,
            isFormValid: true,
            stateList: [],
            cityList: [],
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
        // this.fetchStateAndCityList({
        //     offset: 0,
        //     limit: 0
        // },this.formatResponse)
        const {stateList, cityList} = formatStateAndCityList(stateAndCityList.states)
        console.log("response", stateList, "city", cityList)
        this.setState({stateList, cityList})   
    }
    
    fetchStateAndCityList(payload, stateListSuccessCallback) {
        Api.fetchStateAndCityList(payload, stateListSuccessCallback)
    }

    formatResponse(data) {
        console.log("state and city list", data)
        // const {stateList, cityList} = formatStateAndCityList(stateAndCityList.states)
        // console.log("response", stateList, "city", cityList)
        // this.setState({stateList, cityList}) 
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
                emailIdErr
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
            emailIdErr
        }
       //console.log("form data", formData)
       for(const key in formData) {
           //console.log("form data", formData[key].value.toString().length)  
           if(!formData[key].status && formData[key].value.toString().length === 0){
               return false
           } 
       }

       return true
    }
    
    handleSave() {
        console.log("edited data", this.organizationDetailsForm.getData())
        const data = this.organizationDetailsForm.getData()
        this.setState({isFormValid: this.formIsValid()})
        if(this.formIsValid()) {
            const payload = {
                id: data.id,
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
                email: data.email
            }
            this.setState({updatingOrg: true})
            this.updateOrganization(payload, this.successCallback, this.failureCallback)
        }
    }

    successCallback() {
        this.updateState()
        history.pushState(null, 'organization list', '/home/manage-organization')
    }

    failureCallback() {
        this.updateState()
    }

    updateState() {
        this.setState({updatingOrg: false})
    }

    updateOrganization(payload, successCallback, failureCallback) {
        // POST({
        //     api: '/deliveryStatus/liveOrders',
        //     apiBase: 'gremlinUrl',
        //     data: payload,
        //     handleError: true
        // })
        // .then((json) => {
        //     //this.setState({
        //     //       data: json.data,
        //     //       count: json.count,
        //     //       loading: false
        //     //     })
        //     Notify("success", "Successfully updated organization")
        //     successCallback(json)
        // })
        // .catch(err => {
        //     err.response.json().then(json => { Notify("danger", json.message) })
        // })
    }

    render() {
        //console.log("edit org", this.props.history.location.state)
        const {stateList, cityList} = this.state
        return (
            <Layout title="Edit Organization">
                <Card width="800px"  className={!this.state.isFormValid ? 'animated shake' : ''}>
                    <OrganizationForm
                        ref={(node) => { this.organizationDetailsForm = node }}
                        data={this.props.history.location.state}
                        stateList = {stateList}
                        cityList = {cityList} 
                    />
                    <ButtonGroup align="right">
                        <Button 
                            onClick={() => this.handleSave()} 
                            loading={this.state.updatingOrg}
                            disabled={this.state.updatingOrg}
                        > 
                            Save 
                        </Button>
                    </ButtonGroup>
                </Card>
            </Layout>
        )
    }
}

export default EditOrganization
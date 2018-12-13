import React from 'react'
import Layout from 'Components/layout'
import RetailerForm from './retailer-form'
import Card from 'Components/card'
import { Form, Checkbox, Button, ButtonGroup } from '@auth0/cosmos'
import * as Api from './../../api'
import 'Sass/animations.scss'
import {formatStateAndCityList, formatStateAndOrganizationList} from 'Utils/response-format-utils'
import {organizationAndStateList, stateAndCityList} from './../../mockData'

class EditRetailer extends React.Component {
    constructor() {
        super()
        this.state = {
            updatingRetailer: false,
            isFormValid: true,
            organizationList: [],
            stateList: [],
            stateMap: {},
            cityList: [],
            organizationMap: {}
        }
        this.handleSave = this.handleSave.bind(this)
        this.updateRetailer = this.updateRetailer.bind(this)
        this.successCallback = this.successCallback.bind(this)
        this.failureCallback = this.failureCallback.bind(this)
        this.updateState = this.updateState.bind(this)
        this.formIsValid = this.formIsValid.bind(this)
        this.fetchOrganizationList = this.fetchOrganizationList.bind(this)
        this.formatOrganizationList = this.formatOrganizationList.bind(this)
    }

    componentDidMount() {
        const {organizationList, organizationMap} = formatStateAndOrganizationList(organizationAndStateList.details)
        const {stateMap, cityList, stateList} = formatStateAndCityList(stateAndCityList.states)
        this.setState({organizationList, stateList, organizationMap, stateMap, cityList})
    }

    fetchOrganizationList(payloadObj, organizationListSuccessCallback) {
        // this.setState({organizationList: []})
        Api.fetchOrganizationAndStateList(payloadObj, organizationListSuccessCallback)
    }

    formatOrganizationList(data) {
        console.log("Fetched org list with state details", data)
    }

    formIsValid() {
        const retailerDataForm = this.retailerDetailsForm.getData()
        const { ksbclCodeErr,
                outletNameErr,
                exciseLicenceNoErr,
                discountPercentErr,
                serviceChargePercentErr,
                deliveryDiscountPercentErr,
                FSSAINumberErr,
                bankNameErr,
                accountHolderNameErr,
                accountNumberErr,
                branchErr,
                IFSCErr,
                outletAddressErr,
                pincodeErr,
                landlineNoErr,
                mobileNoErr,
                emailIdErr,
                gpsCoordinatesErr
            } = retailerDataForm 
        
        const formData = {
            ksbclCodeErr,
            outletNameErr,
            exciseLicenceNoErr,
            discountPercentErr,
            serviceChargePercentErr,
            deliveryDiscountPercentErr,
            FSSAINumberErr,
            bankNameErr,
            accountHolderNameErr,
            accountNumberErr,
            branchErr,
            IFSCErr,
            outletAddressErr,
            pincodeErr,
            landlineNoErr,
            mobileNoErr,
            emailIdErr,
            gpsCoordinatesErr
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
        const retailerDataForm = this.retailerDetailsForm.getData()
        this.setState({isFormValid: this.formIsValid()})
        if(this.formIsValid()) {
            const payload = {
                id: retailerDataForm.id,
                organisation_id: retailerDataForm.selectedOrganizationIdx,
                branch_status: retailerDataForm.selectedOutletStatusIdx,
                ksbcl_code: retailerDataForm.ksbclCode,
                outlet_name: retailerDataForm.outletName,
                excise_licence_number: retailerDataForm.exciseLicenseNo,
                discount_percent: retailerDataForm.discountPercent,
                delivery_discount_percent: retailerDataForm.deliveryDiscountPercent,
                service_charge_percent: retailerDataForm.serviceChargePercent,
                kyc_status: retailerDataForm.selectedKycIdx === 1 ? "true" : "false",
                branch_status: retailerDataForm.selectedOutletStatusIdx === 1 ? "true" : "false",
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
                IFSC: retailerDetailsForm.ifsc_code,
                is_cancelled_cheque: retailerDataForm.cancelledCheck,
                is_excise_license: retailerDataForm.exciseLicense,
                is_photo_of_outlet: retailerDataForm.outletPhoto
            }
            this.setState({updatingRetailer: true})
            this.updateRetailer(payload, this.successCallback, this.failureCallback)
        }
    }

    updateRetailer(payload, successCallback, failureCallback) {
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

    successCallback() {
        this.updateState()
        history.pushState(null, 'retailer list', '/home/manage-retailer')
    }

    failureCallback() {
        this.updateState()
    }

    updateState() {
        this.setState({updatingRetailer: false})
    }

    render() {
        return (
            <Layout title="Edit Retailer">
                <Card width="800px" className={!this.state.isFormValid ? 'animated shake' : ''}>
                    <RetailerForm
                        ref={(node) => { this.retailerDetailsForm = node }}
                        data={this.props.history.location.state} 
                        organizationList = {this.state.organizationList}
                        stateList = {this.state.stateList}
                        organizationMap = {this.state.organizationMap}
                        stateMap = {this.state.stateMap}
                        cityList = {this.state.cityList}
                    />
                    <ButtonGroup align="right">
                        <Button 
                            onClick={() => this.handleSave()}
                            loading={this.state.updatingRetailer}
                            disabled={this.state.updatingRetailer}
                        > 
                            Save 
                        </Button>
                    </ButtonGroup>
                </Card>
            </Layout>
        )
    }
}

export default EditRetailer
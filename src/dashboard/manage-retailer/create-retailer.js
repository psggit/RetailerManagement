import React from 'react'
import Layout from 'Components/layout'
import Card from 'Components/card'
import RetailerForm from './retailer-form'
import { Form, Checkbox, Button, ButtonGroup } from '@auth0/cosmos'
import * as Api from './../../api'
//import { isRegExp } from 'util';
import 'Sass/animations.scss'

class CreateRetailer extends React.Component {
    constructor() {
        super()
        this.state = {
            creatingRetailer: false,
            isFormValid: true
        }
        this.handleSave = this.handleSave.bind(this)
        this.createRetailer = this.createRetailer.bind(this)
        this.successCallback = this.successCallback.bind(this)
        this.failureCallback = this.failureCallback.bind(this)
        this.updateState = this.updateState.bind(this)
        this.formIsValid = this.formIsValid.bind(this)
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
        //console.log("data", this.retailerDetailsForm.getData())
        const retailerDataForm = this.retailerDetailsForm.getData()
        this.setState({isFormValid: this.formIsValid()})
        if(this.formIsValid()) {
            const payload = {
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
                email: retailerDataForm.emailId,
                gps_cordinates: retailerDataForm.gpsCoordinates,
                bank_name: retailerDataForm.bankName,
                acc_holder_name: retailerDataForm.accountHolderName,
                account_number: retailerDataForm.accountNumber,
                bank_branch: retailerDataForm.branch,
                acc_type: retailerDataForm.accountType,
                IFSC: retailerDetailsForm.IFSC,
                is_cancelled_cheque: retailerDataForm.cancelledCheck,
                is_excise_license: retailerDataForm.exciseLicense,
                is_photo_of_outlet: retailerDataForm.outletPhoto
            }
            this.setState({creatingRetailer: true})
            this.createRetailer(payload, this.successCallback, this.failureCallback)
        }
        //e.preventDefault()
    }

    successCallback() {
        this.updateState()
        history.pushState(null, 'retailer list', '/home/manage-retailer')
    }

    failureCallback() {
        this.updateState()
    }

    updateState() {
        this.setState({creatingRetailer: false})
    }

    createRetailer(payload, successCallback,failureCallback) {
        console.log("create retailer", payload)
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
        //     Notify("success", "Successfully created retailer")
        //     successCallback(json)
        // })
        // .catch(err => {
        //     err.response.json().then(json => { Notify("danger", json.message) })
        // })
    }

    render() {
        return (
            <Layout title="Create Retailer">
                <Card width="800px" className={!this.state.isFormValid ? 'animated shake' : ''}>
                    <RetailerForm
                        ref={(node) => { this.retailerDetailsForm = node }}
                    />
                    <ButtonGroup align="right">
                        <Button 
                            onClick={() => this.handleSave()}
                            loading={this.state.creatingRetailer}
                            disabled={this.state.creatingRetailer}
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

export default CreateRetailer
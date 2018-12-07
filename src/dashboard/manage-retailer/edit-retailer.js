import React from 'react'
import Layout from 'Components/layout'
import RetailerForm from './retailer-form'
import Card from 'Components/card'
import { Form, Checkbox, Button, ButtonGroup } from '@auth0/cosmos'

class EditRetailer extends React.Component {
    constructor() {
        super()
        this.handleSave = this.handleSave.bind(this)
        this.updateRetailer = this.updateRetailer.bind(this)
    }

    handleSave() {
        console.log("edited data", this.retailerDetailsForm.getData())
        const retailerDataForm = this.retailerDetailsForm.getData()

        if(!retailerDataForm.errorFound) {
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
                email: retailerDataForm.emailId,
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
            this.updateRetailer(payload, successCallback)
        }
    }

    updateRetailer(payload, successCallback) {
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
        history.pushState(null, 'retailer list', '/home/manage-retailer')
    }

    render() {
        //console.log("edit org", this.props.history.location.state)
        return (
            <Layout title="Edit Retailer">
                <Card width="800px">
                    <RetailerForm
                        ref={(node) => { this.retailerDetailsForm = node }}
                        data={this.props.history.location.state} 
                    />
                    <ButtonGroup align="right">
                        <Button onClick={() => this.handleSave()}> Save </Button>
                    </ButtonGroup>
                </Card>
            </Layout>
        )
    }
}

export default EditRetailer
import React from 'react'
import Layout from 'Components/layout'
import OrganizationForm from './organization-form';
import Card from 'Components/card'
import { Form, Checkbox, Button, ButtonGroup } from '@auth0/cosmos'
import { POST } from 'Utils/fetch'

class EditOrganization extends React.Component {
    constructor() {
        super()
        this.handleSave = this.handleSave.bind(this)
        this.updateOrganization = this.updateOrganization.bind(this)
    }

    handleSave() {
        console.log("edited data", this.organizationDetailsForm.getData())
        const data = this.organizationDetailsForm.getData()
        if(!data.errorFound) {
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
                email: data.emailId
            }
            this.updateOrganization(payload, successCallback)
        }
    }

    successCallback() {
        history.pushState(null, 'organization list', '/home/manage-organization')
    }

    updateOrganization(payload, successCallback) {
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
        return (
            <Layout title="Edit Organization">
                <Card width="800px">
                    <OrganizationForm
                        ref={(node) => { this.organizationDetailsForm = node }}
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

export default EditOrganization
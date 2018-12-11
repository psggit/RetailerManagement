import React from 'react'
import Layout from 'Components/layout'
import Card from 'Components/card'

class OrganizationDetails extends React.Component {
    constructor() {
        super()
    }

    render() {
        const data = this.props.history.location.state
       
        return(
            <Layout title="Organization Details">
                <Card width="500px">
                    <div>
                        {/* <h3>Organization Details</h3>
                        <span></span> */}
                        <p><b>Organization Id</b>: { data.id }</p>
                        <p><b>Organization Name</b>: { data.organizationName }</p>
                        <p><b>Organization Type</b>: { data.organizationType }</p>
                        <p><b>Date of Incorporation</b>: { data.incorporationDate } </p>
                        <p><b>CIN Number</b>: { data.cinNumber } </p>
                        <p><b>PAN Number</b>: { data.panNumber } </p>
                        <p><b>No of Outlets</b>: { data.outletsCount } </p>
                        <p><b>KYC Verified</b>: { data.selectedKycIdx } </p>
                        <p><b>GST Number</b>: { data.GSTNumber } </p>
                        <p><b>Organization Status</b>: { data.selectedOrganizationStatusIdx } </p>
                        
                        <h3>Organization Contact Details</h3>
                        <p><b>Organization Address</b>: { data.organizationAddress } </p>
                        <p><b>State</b>: { data.state } </p>
                        <p><b>City</b>: { data.city } </p>
                        <p><b>Pincode</b>: { data.pincode } </p>
                        <p><b>Landline No</b>: { data.landlineNo } </p>
                        <p><b>Name of Authorized Person</b>: { data.authorizedPerson } </p>
                        <p><b>Mobile No</b>: { data.mobileNo } </p>
                        <p><b>Email</b>: { data.emailId } </p>

                        <h3>Documents Attached as Proof</h3>
                        <p><b>Photo of Authorized Signatory</b>: { data.photo ? 'Attached' : 'Not Attached' } </p>
                        <p><b>PAN of Authorized Signatory</b>: { data.pancard ? 'Attached' : 'Not Attached' } </p>
                        <p><b>Address Proof of Authorized Signatory</b>: { data.address ? 'Attached' : 'Not Attached' } </p>
                        
                        {
                            <React.Fragment>
                                <p><b>PAN of Partnership Firm</b>: { data.partnershipPancard ? 'Attached' : 'Not Attached' } </p>
                                <p><b>PartnershipDeed</b>: { data.partnershipDeed ? 'Attached' : 'Not Attached' } </p>
                                <p><b>LOA of Partnership Firm</b>: { data.partnershipLOA ? 'Attached' : 'Not Attached' } </p>
                            </React.Fragment>
                        }

                        {
                            <React.Fragment>
                                <p><b>PAN of Private Firm</b>: { data.pvtPancard ? 'Attached' : 'Not Attached' } </p>
                                <p><b>COI of Private Firm</b>: { data.pvtCOI ? 'Attached' : 'Not Attached' } </p>
                                <p><b>LOA of Private Firm</b>: { data.pvtLOA ? 'Attached' : 'Not Attached' } </p>
                            </React.Fragment>
                        }
                        
                    </div>
                </Card>
            </Layout>
        )
    }
}

export default OrganizationDetails
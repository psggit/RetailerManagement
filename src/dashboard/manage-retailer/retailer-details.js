import React from 'react'
import Layout from 'Components/layout'
import Card from 'Components/card'

class RetailerDetails extends React.Component {
    constructor() {
        super()
    }

    render() {
        const data = this.props.history.location.state
      
        return(
            <Layout title="Retailer Details">
                <Card width="500px">
                    <div>
                        {/* <h3>Organization Details</h3>
                        <span></span> */}
                        <p><b>Retailer Id</b>: { data.id }</p>
                        <p><b>Outlet Name</b>: { data.outletName }</p>
                        <p><b>KSBCL Code</b>: { data.ksbclCode } </p>
                        <p><b>Excise Licence Number</b>: { data.exciseLicenceNo } </p>
                        <p><b>Discount Percent</b>: { data.discountPercent } </p>
                        <p><b>Service Charge Percent</b>: { data.serviceChargePercent } </p>
                        <p><b>Delivery Discount Percent</b>: { data.deliveryDiscountPercent } </p>
                        <p><b>KYC Status</b>: { data.retailerStatus ? 'Active' : 'Inactive' } </p>
                        <p><b>Retailer Status</b>: { data.KYCStatus ? 'Active' : 'Inactive' } </p>
                        
                        <h3>Outlet Contact Details</h3>
                        <p><b>Outlet Address</b>: { data.organizationAddress } </p>
                        <p><b>State</b>: { data.state } </p>
                        <p><b>City</b>: { data.city } </p>
                        <p><b>Pincode</b>: { data.pincode } </p>
                        <p><b>Landline No</b>: { data.landlineNo } </p>
                        <p><b>GPS</b>: { data.gpsCoordinates } </p>
                        <p><b>Mobile No</b>: { data.mobileNo } </p>
                        <p><b>Email</b>: { data.email } </p>

                        <h3>Documents Attached as Proof</h3>
                        <p><b>Cancelled Cheque</b>: { data.cancelledCheck ? 'Attached' : 'Not Attached' } </p>
                        <p><b>Excise Licence</b>: { data.exciseLicence ? 'Attached' : 'Not Attached' } </p>
                        <p><b>Photo of the Outlet</b>: { data.outletPhoto ? 'Attached' : 'Not Attached' } </p>
                        

                        <h3>Bank Details</h3>
                        <p><b>Bank Name</b>: { data.bankName } </p>
                        <p><b>Account Holder Name</b>: { data.accountHolderName } </p>  
                        <p><b>Account Number</b>: { data.accountNumber } </p>
                        <p><b>Branch</b>: { data.branch } </p>
                        <p><b>Account Type</b>: { data.accountType } </p>
                        <p><b>IFSC Code</b>: { data.IFSC } </p>
                       
                    </div>
                </Card>
            </Layout>
        )
    }
}

export default RetailerDetails
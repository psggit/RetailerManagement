import React from 'react'
import Layout from 'Components/layout'
import Card from 'Components/card'

class RetailerDetails extends React.Component {
	constructor() {
		super()
	}

	render() {
		const data = this.props.history.location.state
		return (
			<Layout title="Retailer Details">
				<Card width="500px">
					<div>
						<p><b>Retailer Id</b>: {data.id}</p>
						<p><b>Outlet Name</b>: {data.outlet_name}</p>
						<p><b>Store Code</b>: {data.ksbcl_code} </p>
						<p><b>Excise Licence Number</b>: {data.excise_licence_number} </p>
						<p><b>Discount Percent</b>: {data.discount_percent} </p>
						<p><b>Service Charge Percent</b>: {data.service_charge_percent} </p>
						<p><b>Delivery Discount Percent</b>: {data.delivery_discount_percent} </p>
						<p><b>KYC Status</b>: {data.kyc_status === "true" ? 'Verified' : 'Not verified'} </p>
						<p><b>Outlet Status</b>: {data.branch_status === "true" ? 'Active' : 'Not Active'} </p>

						<h3>Outlet Contact Details</h3>
						<p><b>Outlet Address</b>: {data.store_address} </p>
						<p><b>State</b>: {data.state_name} </p>
						<p><b>City</b>: {data.city_name} </p>
						<p><b>Pincode</b>: {data.pincode} </p>
						<p><b>Landline No</b>: {data.landline_number} </p>
						<p><b>GPS</b>: {data.gps_cordinates} </p>
						<p><b>Mobile No</b>: {data.mobile_number} </p>
						<p><b>Email</b>: {data.email} </p>

						<h3>Documents Attached as Proof</h3>
						<p><b>Cancelled Cheque</b>: {data.is_cancelled_cheque ? 'Attached' : 'Not Attached'} </p>
						<p><b>Excise Licence</b>: {data.is_excise_license ? 'Attached' : 'Not Attached'} </p>
						<p><b>Photo of the Outlet</b>: {data.is_photo_of_outlet ? 'Attached' : 'Not Attached'} </p>


						<h3>Bank Details</h3>
						<p><b>Bank Name</b>: {data.bank_name} </p>
						<p><b>Account Holder Name</b>: {data.acc_holder_name} </p>
						<p><b>Account Number</b>: {data.account_number} </p>
						<p><b>Branch</b>: {data.bank_branch} </p>
						<p><b>Account Type</b>: {data.acc_type} </p>
						<p><b>IFSC Code</b>: {data.ifsc_code} </p>
					</div>
				</Card>
			</Layout>
		)
	}
}

export default RetailerDetails
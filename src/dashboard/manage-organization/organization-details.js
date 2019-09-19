import React from 'react'
import Layout from 'Components/layout'
import Card from 'Components/card'
import Moment from 'moment'

class OrganizationDetails extends React.Component {
	render () {
		const data = this.props.history.location.state

		return (
			<Layout title="Organization Details">
				<Card width="500px">
					<div>
						<p><b>Organization Id</b>: {data.id}</p>
						<p><b>Organization Name</b>: {data.organisation_name}</p>
						<p><b>Organization Type</b>: {data.type_of_organisation}</p>
						<p><b>Date of Incorporation</b>: {Moment(data.date_of_incorporation).format('DD/MM/YYYY')} </p>
						<p><b>CIN Number</b>: {data.cin_no} </p>
						<p><b>PAN Number</b>: {data.pan_number} </p>
						<p><b>No of Outlets</b>: {data.no_of_outlets} </p>
						<p><b>KYC Verified</b>: {data.kyc_status} </p>
						<p><b>GST Number</b>: {data.gst_no} </p>
						<p><b>Organization Status</b>: {data.status} </p>

						<h3>Organization Contact Details</h3>
						<p><b>Organization Address</b>: {data.org_address} </p>
						<p><b>State</b>: {data.state_name} </p>
						<p><b>City</b>: {data.city_name} </p>
						<p><b>Pincode</b>: {data.pincode} </p>
						<p><b>Landline No</b>: {data.landline_number} </p>
						<p><b>Name of Authorized Person</b>: {data.name_of_auth_person} </p>
						<p><b>Mobile No</b>: {data.mobile_number} </p>
						<p><b>Email</b>: {data.email} </p>

						<h3>Documents Attached as Proof</h3>
						<p><b>Photo of Authorized Signatory</b>: {data.photo_of_auth_signatory ? 'Attached' : 'Not Attached'} </p>
						<p><b>PAN of Authorized Signatory</b>: {data.pan_of_auth_signatory ? 'Attached' : 'Not Attached'} </p>
						<p><b>Address Proof of Authorized Signatory</b>: {data.address_proof_auth_signatory ? 'Attached' : 'Not Attached'} </p>
						<p><b>Other Documents</b>: {data.other_documents && data.other_documents.length > 0 ? data.other_documents : '-'} </p>

						{
							data.type_of_organisation === "partnership" &&
							<React.Fragment>
								<p><b>PAN of Partnership Firm</b>: {data.is_pan ? 'Attached' : 'Not Attached'} </p>
								<p><b>PartnershipDeed</b>: {data.partnership_deed ? 'Attached' : 'Not Attached'} </p>
								<p><b>LOA of Partnership Firm</b>: {data.loa ? 'Attached' : 'Not Attached'} </p>
							</React.Fragment>
						}

						{
							data.type_of_organisation === "pvtltd" &&
							<React.Fragment>
								<p><b>PAN of Private Firm</b>: {data.is_pan ? 'Attached' : 'Not Attached'} </p>
								<p><b>COI of Private Firm</b>: {data.coi ? 'Attached' : 'Not Attached'} </p>
								<p><b>LOA of Private Firm</b>: {data.loa ? 'Attached' : 'Not Attached'} </p>
							</React.Fragment>
						}

					</div>
				</Card>
			</Layout>
		)
	}
}

export default OrganizationDetails
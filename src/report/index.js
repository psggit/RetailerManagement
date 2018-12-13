import React from 'react'
import Layout from 'Components/layout'
import Card from 'Components/card'
import * as Api from './../api'
import style from './report.scss'
import Moment from 'moment'
import {organizationList, retailerList} from './../mockData'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

class RetailerOnboardingForm extends React.Component {
    constructor(props) {
        super(props)
        this.pagesLimit = 5

        this.state = {
            loading: true,
            organizationData: organizationList.org_response[0],
            retailerData: retailerList.ret_response
        }

        this.filterOrg = {
            searchField: 'ID',
            searchOperator: 'EQUAL',
            searchText: props.match.params.orgId
        }

        this.filterRetailer = {
            searchField: 'ID',
            searchOperator: 'EQUAL',
            searchText: props.match.params.orgId
        }
    }

    componentDidMount() {
        // var doc = new jsPDF();
        // var specialElementHandlers = {
        //     '#pdf-root': function (element, renderer) {
        //         return true;
        //     }
        // };
        // doc.fromHTML(document.getElementById("#root"), 15, 15, {
        //     'width': 700,
        //         'elementHandlers': specialElementHandlers
        // });
        // doc.save('file.pdf');
        console.log("props", this.props)
        this.fetchOrganisationList({
            offset: 0,
            limit: this.pagesLimit,
            filter: this.filterOrg
        }, this.setOrganizationData)

        this.fetchRetailerList({
            limit: this.pagesLimit,
            offset: 0,
            filter: this.filterRetailer
        }, this.setRetailerData)
    }

    save() {
        // var doc = new jsPDF({
        //     unit:'px', 

        //     format:'a4'
        // });
        // var specialElementHandlers = {
        //     '#pdf-root': function (element, renderer) {
        //         return true;
        //     }
        // };
        // doc.fromHTML(document.getElementById("root"), 15, 15, {
        //     'width': 700,
        //         'elementHandlers': specialElementHandlers
        // });
        // doc.save('file.pdf');
    }

    fetchOrganisationList(payload, successCallback) {
        setTimeout(() => {
            console.log("hello")
            this.save()
        }, 10000)
        Api.fetchOrganizationList(payload, successCallback)
    }

    fetchRetailerList(payload, successCallback) {
        Api.fetchRetailerList(payload, successCallback)
    }

    setOrganizationData() {
        console.log("success organization callback")
    }

    setRetailerData() {
        console.log("success retailer callback")
    }

    render() {
        const {organizationData, retailerData} = this.state
        console.log("organization details", organizationData)
        return(
            <React.Fragment>
                <div className="container">
                   <div className="wrapper">
                        <div className="title">
                            <h4>RETAILER ONBOARDING FORM</h4>
                        </div>
                        <div className="content">
                            <p><b>Name of the Organization:</b> {organizationData.organisation_name}</p>
                            <p><b>date of Incorporation:</b> {Moment(organizationData.date_of_incorporation).format('MM-DD-YYYY')}</p>
                        </div>
                        <div className="sub-title">
                            <h3>CONSTITUTION OR TYPE OF ORGANIZATION</h3>
                        </div>
                        <div className="content" style={{display: 'flex'}}>
                            <div style={{marginRight: '24px'}}>
                                <label>
                                    Proprietorship
                                </label>
                                <input type="checkbox" 
                                        checked={
                                           organizationData.type_of_organisation ==="proprietorship" 
                                            ? true 
                                            : false
                                        } 
                                />
                            </div>
                            <div style={{marginRight: '24px'}}>
                                <label>
                                    Partnership
                                </label>
                                <input type="checkbox" 
                                        checked={
                                           organizationData.type_of_organisation === "partnership" 
                                            ? true 
                                            : false
                                        } 
                                />
                            </div>
                            <div style={{marginRight: '24px'}}>
                                <label>
                                    Pvt Ltd
                                </label>
                                <input type="checkbox" 
                                        checked={
                                           organizationData.type_of_organisation === "pvtltd" 
                                            ? true 
                                            : false
                                        } 
                                />
                            </div>
                            <div style={{marginRight: '24px'}}>
                                <label>
                                    Other(s)
                                </label>
                                <input type="checkbox" 
                                        checked={
                                           organizationData.type_of_organisation === "others"  
                                            ? true 
                                            : false
                                        } 
                                />
                            </div>
                        </div>
                        <div className="content">
                            <p><b>PAN:</b> {organizationData.pan_number}</p>
                            <p><b>CIN:</b> {organizationData.cin_no}</p>
                            <p><b>No of Outlets:</b> {organizationData.no_of_outlets}</p>
                            <p><b>GST Number:</b> {organizationData.gst_no}</p>
                        </div>
                        <div className="sub-title">
                            <h3>REGISTERED OFFICE ADDRESS</h3>
                        </div>
                        <div className="content">
                            <p><b>Address:</b> {organizationData.org_address}</p>
                            <p><b>City:</b> {organizationData.city}</p>
                            <p><b>Pincode:</b> {organizationData.pincode}</p>
                            <p><b>State:</b> {organizationData.state}</p>
                            <p><b>Landline No:</b> {organizationData.landline_number}</p>
                            <p><b>Name of the Authorized Person:</b> {organizationData.name_of_auth_person}</p>
                            <p><b>Mobile No:</b> {organizationData.mobile_number}</p>
                            <p><b>Email ID:</b> {organizationData.email}</p>
                        </div>
                        <div className="sub-title">
                            <h3>Documents Attached</h3>
                        </div>
                        <div className="content" style={{display: 'flex'}}>
                            <div style={{marginRight: '24px'}}>
                                <label>
                                    Photo of Authorized Signatory
                                </label>
                                <input type="checkbox" 
                                        checked={
                                           organizationData.photo_of_auth_signatory === "true" 
                                            ? true 
                                            : false
                                        } 
                                />
                            </div>
                            <div style={{marginRight: '24px'}}>
                                <label>
                                    PAN of Authorized Signatory
                                </label>
                                <input type="checkbox" 
                                        checked={
                                           organizationData.pan_of_auth_signatory === "true" 
                                            ? true 
                                            : false
                                        } 
                                />
                            </div>
                            <div style={{marginRight: '24px'}}>
                                <label>
                                    Address Proof of Authorized Signatory
                                </label>
                                <input type="checkbox" 
                                        checked={
                                           organizationData.address_proof_auth_signatory === "true" 
                                            ? true 
                                            : false
                                        } 
                                />
                            </div>
                        </div>
                        {/* <div className="sub-title"> */}
                        <h3>For (Partnership firm/LLP)</h3>
                        {/* </div> */}
                        <div className="content" style={{display: 'flex'}}>
                            <div style={{marginRight: '24px'}}>
                                <label>
                                    PAN
                                </label>
                                <input type="checkbox" 
                                        checked={
                                            organizationData.type_of_organisation === "partnership"  && organizationData.is_pan 
                                            ? true 
                                            : false
                                        } 
                                />
                            </div>
                            <div style={{marginRight: '24px'}}>
                                <label>
                                    PartnershipDeed
                                </label>
                                <input type="checkbox" 
                                        checked={
                                           organizationData.partnership_deed
                                            ? true 
                                            : false
                                        } 
                                />
                            </div>
                            <div style={{marginRight: '24px'}}>
                                <label>
                                    LOA
                                </label>
                                <input type="checkbox" 
                                        checked={
                                            organizationData.type_of_organisation === "partnership" && organizationData.loa
                                            ? true 
                                            : false
                                        } 
                                />
                            </div>
                            {/* <div style={{marginRight: '24px'}}>
                                <label>
                                    Other(s)
                                </label>
                                <input type="checkbox" 
                                        checked={
                                           organizationData.thers 
                                            ? true 
                                            : false
                                        } 
                                />
                            </div> */}
                        </div>
                        {/* <div className="sub-title"> */}
                        <h3>For (Pvt Ltd)</h3>
                        {/* </div> */}
                        <div className="content" style={{display: 'flex'}}>
                            <div style={{marginRight: '24px'}}>
                                <label>
                                    PAN
                                </label>
                                <input type="checkbox" 
                                        checked={
                                            organizationData.type_of_organisation === "pvtltd" && organizationData.is_pan 
                                            ? true 
                                            : false
                                        } 
                                />
                            </div>
                            <div style={{marginRight: '24px'}}>
                                <label>
                                    COI
                                </label>
                                <input type="checkbox" 
                                        checked={
                                           organizationData.partnership_deed
                                            ? true 
                                            : false
                                        } 
                                />
                            </div>
                            <div style={{marginRight: '24px'}}>
                                <label>
                                    Board Resolution / LOA
                                </label>
                                <input type="checkbox" 
                                        checked={
                                            organizationData.type_of_organisation === "pvtltd" && organizationData.loa
                                            ? true 
                                            : false
                                        } 
                                />
                            </div>
                            {/* <div style={{marginRight: '24px'}}>
                                <label>
                                    Other(s)
                                </label>
                                <input type="checkbox" 
                                        checked={
                                           organizationData.thers 
                                            ? true 
                                            : false
                                        } 
                                />
                            </div> */}
                        </div>
                        {
                            retailerData.map((item, index) => {
                                return(
                                    <React.Fragment>
                                        <div className="sub-title">
                                            <h3>{index+1}) OUTLET INFORMATION</h3>
                                        </div>
                                        <div className="content">
                                            <p><b>Name of the Outlet:</b> {item.outlet_name}</p>
                                            <p><b>Address:</b> {item.store_address}</p>
                                            <p><b>State:</b> {item.state_name}</p>
                                            <p><b>City:</b> {item.city_name}</p>
                                            <p><b>Pincode:</b> {item.pincode}</p>
                                            <p><b>KSBCL Code:</b> {item.ksbcl_code}</p>
                                            <p><b>Excise License Number:</b> {item.excise_licence_number}</p>
                                        </div>
                                        <div className="sub-title">
                                            <h3>Bank Details Provided for Settlement</h3>
                                        </div>
                                        <div className="content">
                                            <p><b>Name of the Bank:</b> {item.bank_name}</p>
                                            <p><b>Account Holder Name:</b> {item.acc_holder_name}</p>
                                            <p><b>Account Number:</b> {item.account_number}</p>
                                            <p><b>Branch:</b> {item.bank_branch}</p>
                                            <p><b>Type:</b> {item.acc_type}</p>
                                            <p><b>IFSC Code:</b> {item.ifsc_code}</p>
                                        </div>
                                        <div className="sub-title">
                                            <h3>Documents Attached</h3>
                                        </div>
                                        <div className="content" style={{display: 'flex'}}>
                                            <div style={{marginRight: '24px'}}>
                                                <label>
                                                    cancelled Cheque
                                                </label>
                                                <input type="checkbox" 
                                                        checked={
                                                            item.is_cancelled_cheque 
                                                            ? true 
                                                            : false
                                                        } 
                                                />
                                            </div>
                                            <div style={{marginRight: '24px'}}>
                                                <label>
                                                    Excise License
                                                </label>
                                                <input type="checkbox" 
                                                        checked={
                                                            item.is_excise_license
                                                            ? true 
                                                            : false
                                                        } 
                                                />
                                            </div>
                                            <div style={{marginRight: '24px'}}>
                                                <label>
                                                    Photo of the Outlet
                                                </label>
                                                <input type="checkbox" 
                                                        checked={
                                                            item.is_photo_of_outlet
                                                            ? true 
                                                            : false
                                                        } 
                                                />
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            })
                        }
                   </div>
                </div>
            </React.Fragment>
        )
    }
}

export default RetailerOnboardingForm
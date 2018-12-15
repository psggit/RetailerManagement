import React from 'react'
import Layout from 'Components/layout'
import Card from 'Components/card'
import * as Api from './../api'
import style from './report.scss'
import Moment from 'moment'
import {organizationList, retailerList} from './../mockData'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import {getIcon} from 'Utils/icon-utils'

class RetailerOnboardingForm extends React.Component {
    constructor(props) {
        super(props)
        this.pagesLimit = 5

        this.state = {
            loading: true,
            organizationData: [],
            retailerData: []
            // organizationData: organizationList.org_response[0],
            // retailerData: retailerList.ret_response
        }

        // this.filterOrg = {
        //     searchField: 'ID',
        //     searchOperator: 'EQUAL',
        //     searchText: props.match.params.orgId
        // }

        // this.filterRetailer = {
        //     searchField: 'ID',
        //     searchOperator: 'EQUAL',
        //     searchText: props.match.params.orgId
        // }
    }

    componentDidMount() {
        this.fetchOrganisationList({
            offset: 0,
            limit: this.pagesLimit,
        }, this.setOrganizationData)

        this.fetchRetailerList({
            limit: this.pagesLimit,
            offset: 0,
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
        // setTimeout(() => {
        //     console.log("hello")
        //     this.save()
        // }, 10000)
        Api.fetchOrganizationList(payload, successCallback)
    }

    fetchRetailerList(payload, successCallback) {
        Api.fetchRetailerList(payload, successCallback)
    }

    setOrganizationData(data) {
        console.log("success organization callback", data)
        this.setState({organizationData: data.org_response})
    }

    setRetailerData(data) {
        console.log("success retailer callback", data)
        this.setState({retailerData: data.ret_response})
    }

    render() {
        const {organizationData, retailerData} = this.state
        console.log("organization details", organizationData, "retailer", retailerData)
        return(
            <React.Fragment>
                <div className="container">
                   <div className="wrapper">
                        <div className="organization-info">
                            <div className="title" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                <div className="logo"> <span style={{ marginRight: '20px'}}> {getIcon('logo')} </span> </div>
                                <h4>Retailer Onboarding Form</h4>
                            </div>
                            
                            <div className="mark-content" style={{paddingBottom: '20px'}}>
                                <span style={{marginRight: '4px'}}>
                                    <mark>
                                        Application Number:
                                    </mark>
                                </span>
                                <span style={{fontWeight: '600'}}><mark>TN1234</mark></span>
                            </div>
                            <div className="content" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <div style={{display: 'flex', flexDirection: 'column', alignContent: 'flex-start'}}>
                                    <div><p>Name of the Organization</p></div>
                                    <div><span>{organizationData.organisation_name}</span></div>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                                    <div><p>Date of Incorporation</p></div> 
                                    <div>
                                        <span>
                                            {Moment(organizationData.date_of_incorporation).format('DD-MM-YYYY')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="sub-title">
                                <h3>CONSTITUTION OR TYPE OF ORGANIZATION</h3>
                            </div>

                            <div className="content">
                                    <div><p>Type of the Organization</p></div> 
                                    <div>
                                        <span>
                                            {organizationData.type_of_organisation}
                                        </span>
                                    </div>
                            </div>
                            {/* <div className="content" style={{display: 'flex'}}>
                                <div style={{marginRight: '24px'}}>
                                    <input type="checkbox" 
                                            checked={
                                                organizationData.type_of_organisation ==="proprietorship" 
                                                ? true 
                                                : false
                                            } 
                                    />
                                    <label>
                                        Proprietorship
                                    </label>
                                </div>
                                <div style={{marginRight: '24px'}}>
                                    <input type="checkbox" 
                                            checked={
                                                organizationData.type_of_organisation === "partnership" 
                                                ? true 
                                                : false
                                            } 
                                    />
                                    <label>
                                        Partnership
                                    </label>
                                </div>
                                <div style={{marginRight: '24px'}}>
                                    <input type="checkbox" 
                                            checked={
                                                organizationData.type_of_organisation === "pvtltd" 
                                                ? true 
                                                : false
                                            } 
                                    />
                                    <label>
                                        Pvt Ltd
                                    </label>
                                </div>
                                <div style={{marginRight: '24px'}}>
                                    <input type="checkbox" 
                                            checked={
                                                organizationData.type_of_organisation === "others"  
                                                ? true 
                                                : false
                                            } 
                                    />
                                    <label>
                                        Other(s)
                                    </label>
                                </div>
                            </div> */}

                            <div className="content" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <div style={{display: 'flex', flexDirection: 'column', alignContent: 'flex-start'}}>
                                    <div><p>PAN</p></div>
                                    <div><span>{organizationData.pan_number}</span></div>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                                    <div><p>CIN</p></div> 
                                    <div>
                                        <span>
                                            {organizationData.cin_no}
                                        </span>
                                    </div>
                                </div>
                            
                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                                    <div><p>No of Outlets</p></div> 
                                    <div>
                                        <span>
                                            {organizationData.no_of_outlets}
                                        </span>
                                    </div>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                                    <div><p>GST Number</p></div> 
                                    <div>
                                        <span>
                                            {organizationData.gst_no}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* <div className="content">
                                <p><b>PAN:</b> {organizationData.pan_number}</p>
                                <p><b>CIN:</b> {organizationData.cin_no}</p>
                                <p><b>No of Outlets:</b> {organizationData.no_of_outlets}</p>
                                <p><b>GST Number:</b> {organizationData.gst_no}</p>
                            </div> */}
                            <div className="sub-title">
                                <h3>REGISTERED OFFICE ADDRESS</h3>
                            </div>
                            <div className="content">
                                    <div><p>Address</p></div> 
                                    <div>
                                        <span>
                                            {organizationData.org_address}
                                        </span>
                                    </div>
                            </div>
                            <div className="content">
                                    <div><p>City</p></div> 
                                    <div>
                                        <span>
                                            {/* {organizationData.city} */}
                                            Coimbatore
                                        </span>
                                    </div>
                            </div>
                            <div className="content">
                                    <div><p>Pincode</p></div> 
                                    <div>
                                        <span>
                                            {organizationData.pincode}
                                        </span>
                                    </div>
                            </div>
                            <div className="content">
                                    <div><p>State</p></div> 
                                    <div>
                                        <span>
                                            {organizationData.state}
                                        </span>
                                    </div>
                            </div>
                            <div className="content">
                                    <div><p>Landline No</p></div> 
                                    <div>
                                        <span>
                                            {organizationData.landline_number}
                                        </span>
                                    </div>
                            </div>
                            <div className="content">
                                    <div><p>Name of the Authorized Person</p></div> 
                                    <div>
                                        <span>
                                            {organizationData.name_of_auth_person}
                                        </span>
                                    </div>
                            </div>
                            <div className="content">
                                    <div><p>Mobile No</p></div> 
                                    <div>
                                        <span>
                                            {organizationData.mobile_number}
                                        </span>
                                    </div>
                            </div>
                            <div className="content">
                                    <div><p>Email ID</p></div> 
                                    <div>
                                        <span>
                                            {organizationData.email}
                                        </span>
                                    </div>
                            </div>
                            {/* <div className="content">
                                <p><b>Address:</b> {organizationData.org_address}</p>
                                <p><b>City:</b> {organizationData.city}</p>
                                <p><b>Pincode:</b> {organizationData.pincode}</p>
                                <p><b>State:</b> {organizationData.state}</p>
                                <p><b>Landline No:</b> {organizationData.landline_number}</p>
                                <p><b>Name of the Authorized Person:</b> {organizationData.name_of_auth_person}</p>
                                <p><b>Mobile No:</b> {organizationData.mobile_number}</p>
                                <p><b>Email ID:</b> {organizationData.email}</p>
                            </div> */}
                            {/* {
                                ( organizationData.document_description.length > 0 || organizationData.photo_of_auth_signatory || organizationData.pan_of_auth_signatory || organizationData.address_proof_auth_signatory) &&
                                <div className="sub-title">
                                    <h3>DOCUMENTS ATTACHED</h3>
                                </div>
                            } */}
                            {
                                 organizationData.photo_of_auth_signatory &&
                                 <div className="content">
                                    <div>
                                        <span className="icon">{getIcon('tick')}</span>
                                        <span className="text">
                                            Photo of Authorized Signatory
                                        </span>
                                    </div>
                                </div>
                            }
                            {
                                organizationData.pan_of_auth_signatory &&
                                <div className="content">
                                    <div>
                                        <span className="icon">{getIcon('tick')}</span>
                                        <span className="text">
                                            PAN of Authorized Signatory
                                        </span>
                                    </div>
                                </div>
                            }
                            {
                                organizationData.address_proof_auth_signatory &&
                                <div className="content">
                                    <div>
                                        <span className="icon">{getIcon('tick')}</span>
                                        <span className="text">
                                            Address Proof of Authorized Signatory
                                        </span>
                                    </div>
                                </div>
                            }
                            {/* {
                                organizationData.document_description && 
                                <div className="content">
                                    <div>
                                        <span className="icon">{getIcon('tick')}</span>
                                        <span className="text">
                                            {organizationData.document_description}
                                        </span>
                                    </div>
                                </div>

                            } */}
                            {/* <div className="content" style={{display: 'flex'}}>
                                <div style={{marginRight: '24px'}}>
                                    <input type="checkbox" 
                                            checked={
                                                organizationData.photo_of_auth_signatory === "true" 
                                                ? true 
                                                : false
                                            } 
                                    />
                                    <label>
                                        Photo of Authorized Signatory
                                    </label>
                                </div>
                                <div style={{marginRight: '24px'}}>
                                    <input type="checkbox" 
                                            checked={
                                                organizationData.pan_of_auth_signatory === "true" 
                                                ? true 
                                                : false
                                            } 
                                    />
                                    <label>
                                        PAN of Authorized Signatory
                                    </label>
                                </div>
                                <div style={{marginRight: '24px'}}>
                                    <input type="checkbox" 
                                            checked={
                                                organizationData.address_proof_auth_signatory === "true" 
                                                ? true 
                                                : false
                                            } 
                                    />
                                    <label>
                                        Address Proof of Authorized Signatory
                                    </label>
                                </div>
                            </div> */}
                            {/* <div className="sub-title">
                                <h3>For (Partnership Firm/LLP)</h3>
                            </div> */}
                            {
                                organizationData.type_of_organisation === "partnership" &&
                                <React.Fragment>
                                    {/* <div style={{fontWeight: '600'}}>
                                        For (Partnership Firm/LLP)
                                    </div> */}
                                    {
                                        organizationData.is_pan &&
                                        <div className="content">
                                            <div>
                                                <span className="icon">{getIcon('tick')}</span>
                                                <span className="text">
                                                    PAN
                                                </span>
                                            </div>
                                        </div>
                                    }
                                    {
                                        organizationData.partnership_deed &&
                                        <div className="content">
                                            <div>
                                                <span className="icon">{getIcon('tick')}</span>
                                                <span className="text">
                                                    PartnershipDeed
                                                </span>
                                            </div>
                                        </div>
                                    }
                                    {
                                        organizationData.loa && 
                                        <div className="content">
                                            <div>
                                                <span className="icon">{getIcon('tick')}</span>
                                                <span className="text">
                                                    LOA
                                                </span>
                                            </div>
                                        </div>
                                    }   
                                    {/* {
                                        organizationData.others.length &&
                                        <div className="content" style={{display: 'flex', flexDirection: 'column', paddingBottom: '11px'}}>
                                            <div>
                                                <span>*</span>
                                                <span>
                                                    {organizationData.others}
                                                </span>
                                            </div>
                                        </div>
                                    } */}
                                    {/* <div className="content" style={{display: 'flex'}}>
                                        <div style={{marginRight: '24px'}}>
                                            <input type="checkbox" 
                                                    checked={
                                                        organizationData.type_of_organisation === "partnership"  && organizationData.is_pan 
                                                        ? true 
                                                        : false
                                                    } 
                                            />
                                            <label>
                                                PAN
                                            </label>
                                        </div>
                                        <div style={{marginRight: '24px'}}>
                                            <input type="checkbox" 
                                                    checked={
                                                        organizationData.partnership_deed
                                                        ? true 
                                                        : false
                                                    } 
                                            />
                                            <label>
                                                PartnershipDeed
                                            </label>
                                        </div>
                                        <div style={{marginRight: '24px'}}>
                                            <input type="checkbox" 
                                                    checked={
                                                        organizationData.type_of_organisation === "partnership" && organizationData.loa
                                                        ? true 
                                                        : false
                                                    } 
                                            />
                                            <label>
                                                LOA
                                            </label>
                                        </div>
                                        <div style={{marginRight: '24px'}}>
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
                                        </div> 
                                    </div> */}
                                </React.Fragment>
                            }
                            {
                                organizationData.type_of_organisation === "pvtltd" &&
                                <React.Fragment>
                                    {/* <div style={{fontWeight: '600'}}>
                                        For (Pvt Ltd)
                                    </div> */}
                                    {
                                        organizationData.is_pan && 
                                        <div className="content">
                                            <div>
                                                <span className="icon">{getIcon('tick')}</span>
                                                <span className="text">
                                                    PAN
                                                </span>
                                            </div>
                                        </div>
                                    }
                                    {
                                        organizationData.coi && 
                                        <div className="content">
                                            <div>
                                                <span className="icon">{getIcon('tick')}</span>
                                                <span className="text">
                                                    COI
                                                </span>
                                            </div>
                                        </div>
                                    }
                                    {
                                        organizationData.loa && 
                                        <div className="content">
                                            <div>
                                                <span className="icon">{getIcon('tick')}</span>
                                                <span className="text">
                                                    Board Resolution / LOA
                                                </span>
                                            </div>
                                        </div>
                                    }
                                    {/* <div className="content" style={{display: 'flex'}}>
                                        <div style={{marginRight: '24px'}}>
                                            <input type="checkbox" 
                                                    checked={
                                                        organizationData.type_of_organisation === "pvtltd" && organizationData.is_pan 
                                                        ? true 
                                                        : false
                                                    } 
                                            />
                                            <label>
                                                PAN
                                            </label>
                                        </div>
                                        <div style={{marginRight: '24px'}}>
                                            <input type="checkbox" 
                                                    checked={
                                                        organizationData.partnership_deed
                                                        ? true 
                                                        : false
                                                    } 
                                            />
                                            <label>
                                                COI
                                            </label>
                                        </div>
                                        <div style={{marginRight: '24px'}}>
                                            <input type="checkbox" 
                                                    checked={
                                                        organizationData.type_of_organisation === "pvtltd" && organizationData.loa
                                                        ? true 
                                                        : false
                                                    } 
                                            />
                                            <label>
                                                Board Resolution / LOA
                                            </label>
                                        </div>
                                        <div style={{marginRight: '24px'}}>
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
                                        </div>
                                    </div> */}
                                </React.Fragment>
                            }
                            <div className="sub-title">
                                <h3>TERMS AND CONDITIONS</h3>
                            </div>
                            <div className="mark-content" style={{paddingBottom: '20px', flexDirection: 'row'}}>
                                <span className="icon">{getIcon('tick')}</span>
                                <span style={{paddingTop: '10px', paddingBottom: '10px', fontSize: '16px'}}>
                                    <span>I hereby confirm that the above information is authentic and agree to </span>
                                    <a href="https://hipbar.com/merchants-t-c/" target="_blank">
                                        Hipbar's Terms & Conditions
                                    </a>
                                </span>
                            </div>
                        </div>
                        {
                            retailerData.map((item, index) => {
                                return(
                                    <React.Fragment>
                                        <div className="outlet-info">
                                       
                                            <div className="sub-title">
                                                <h3>{index+1}) OUTLET INFORMATION</h3>
                                            </div>
                                            {/* <div className="content">
                                                <p><b>Name of the Outlet:</b> {item.outlet_name}</p>
                                                <p><b>Address:</b> {item.store_address}</p>
                                                <p><b>State:</b> {item.state_name}</p>
                                                <p><b>City:</b> {item.city_name}</p>
                                                <p><b>Pincode:</b> {item.pincode}</p>
                                                <p><b>KSBCL Code:</b> {item.ksbcl_code}</p>
                                                <p><b>Excise License Number:</b> {item.excise_licence_number}</p>
                                            </div> */}
                                            <div className="content">
                                                    <div><p>Name of the Outlet</p></div> 
                                                    <div>
                                                        <span>
                                                            {/* {item.outlet_name} */}
                                                            Outlet 1
                                                        </span>
                                                    </div>
                                            </div>
                                            <div className="content">
                                                    <div><p>Address</p></div> 
                                                    <div>
                                                        <span>
                                                            {item.store_address}
                                                        </span>
                                                    </div>
                                            </div>
                                            <div className="content">
                                                    <div><p>State</p></div> 
                                                    <div>
                                                        <span>
                                                            {item.state_name}
                                                        </span>
                                                    </div>
                                            </div>
                                            <div className="content">
                                                    <div><p>City</p></div> 
                                                    <div>
                                                        <span>
                                                            {item.city_name}
                                                        </span>
                                                    </div>
                                            </div>
                                            <div className="content">
                                                    <div><p>Pincode</p></div> 
                                                    <div>
                                                        <span>
                                                            {item.pincode}
                                                        </span>
                                                    </div>
                                            </div>
                                            <div className="content">
                                                    <div><p>KSBCL Code</p></div> 
                                                    <div>
                                                        <span>
                                                            {item.ksbcl_code}
                                                        </span>
                                                    </div>
                                            </div>
                                            <div className="content">
                                                    <div><p>Excise License Number</p></div> 
                                                    <div>
                                                        <span>
                                                            {item.excise_licence_number}
                                                        </span>
                                                    </div>
                                            </div>
                                            <div className="sub-title">
                                                <h3>BANK DETAILS PROVIDED FOR SETTLEMENT</h3>
                                            </div>
                                            {/* <div className="content">
                                                <p><b>Name of the Bank:</b> {item.bank_name}</p>
                                                <p><b>Account Holder Name:</b> {item.acc_holder_name}</p>
                                                <p><b>Account Number:</b> {item.account_number}</p>
                                                <p><b>Branch:</b> {item.bank_branch}</p>
                                                <p><b>Type:</b> {item.acc_type}</p>
                                                <p><b>IFSC Code:</b> {item.ifsc_code}</p>
                                            </div> */}
                                            <div className="content">
                                                    <div><p>Name of the Bank</p></div> 
                                                    <div>
                                                        <span>
                                                            {item.bank_name}
                                                        </span>
                                                    </div>
                                            </div>
                                            <div className="content">
                                                    <div><p>Account Holder Name</p></div> 
                                                    <div>
                                                        <span>
                                                            {item.acc_holder_name}
                                                        </span>
                                                    </div>
                                            </div>
                                            <div className="content">
                                                    <div><p>Account Number</p></div> 
                                                    <div>
                                                        <span>
                                                            {item.account_number}
                                                        </span>
                                                    </div>
                                            </div>
                                            <div className="content">
                                                    <div><p>Branch</p></div> 
                                                    <div>
                                                        <span>
                                                            {item.bank_branch}
                                                        </span>
                                                    </div>
                                            </div>
                                            <div className="content">
                                                    <div><p>Type</p></div> 
                                                    <div>
                                                        <span>
                                                            {item.acc_type}
                                                        </span>
                                                    </div>
                                            </div>
                                            <div className="content">
                                                    <div><p>IFSC Code</p></div> 
                                                    <div>
                                                        <span>
                                                            {item.ifsc_code}
                                                        </span>
                                                    </div>
                                            </div>
                                            <div className="sub-title">
                                                <h3>DOCUMENTS ATTACHED</h3>
                                            </div>
                                            {
                                                item.is_cancelled_cheque &&
                                                <div className="content">
                                                    <div>
                                                        <span className="icon">{getIcon('tick')}</span>
                                                        <span className="text">
                                                            Cancelled Cheque
                                                        </span>
                                                    </div>
                                                </div>
                                            }
                                            {
                                                item.is_excise_license && 
                                                <div className="content">
                                                    <div>
                                                        <span className="icon">{getIcon('tick')}</span>
                                                        <span className="text">
                                                            Excise License
                                                        </span>
                                                    </div>
                                                </div> 
                                            }
                                            {
                                                item.is_photo_of_outlet &&
                                                <div className="content">
                                                    <div>
                                                        <span className="icon">{getIcon('tick')}</span>
                                                        <span className="text">
                                                            Photo of the Outlet
                                                        </span>
                                                    </div>
                                                </div>
                                            }
                                            {/* <div className="content" style={{display: 'flex'}}>
                                                <div style={{marginRight: '24px'}}>
                                                    <input type="checkbox" 
                                                            checked={
                                                                item.is_cancelled_cheque 
                                                                ? true 
                                                                : false
                                                            } 
                                                    />
                                                    <label>
                                                        Cancelled Cheque
                                                    </label>
                                                </div>
                                                <div style={{marginRight: '24px'}}>
                                                    <input type="checkbox" 
                                                            checked={
                                                                item.is_excise_license
                                                                ? true 
                                                                : false
                                                            } 
                                                    />
                                                    <label>
                                                        Excise License
                                                    </label>
                                                </div>
                                                <div style={{marginRight: '24px'}}>
                                                    <input type="checkbox" 
                                                            checked={
                                                                item.is_photo_of_outlet
                                                                ? true 
                                                                : false
                                                            } 
                                                    />
                                                    <label>
                                                        Photo of the Outlet
                                                    </label>
                                                </div>
                                            </div> */}
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
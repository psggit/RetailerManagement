import React from 'react'
import * as Api from './../api'
import style from './report.scss'
import Moment from 'moment'
import {getIcon} from 'Utils/icon-utils'

class RetailerOnboardingForm extends React.Component {
    constructor(props) {
        super(props)
        this.pagesLimit = 1000

        this.state = {
            loading: true,
            organizationData: [],
            retailerData: []
        }
        this.setRetailerData = this.setRetailerData.bind(this)
        this.setOrganizationData = this.setOrganizationData.bind(this)
    }

    componentDidMount() {
        //console.log("props", this.props, this.props.match.params.orgId)
        this.fetchOrganisationList({
            offset: 0,
            limit: this.pagesLimit,
            filter: {
                column: 'ID',
                operator: 'EQUAL',
                value: this.props.match.params.orgId
            }
        }, this.setOrganizationData)

        this.fetchRetailerList({
            limit: this.pagesLimit,
            offset: 0,
            filter: {
                column: 'OrganisationID',
                operator: 'EQUAL',
                value: this.props.match.params.orgId
            }
        }, this.setRetailerData)
    }

    fetchOrganisationList(payload, successCallback) {
        Api.fetchOrganizationList(payload, successCallback)
    }

    fetchRetailerList(payload, successCallback) {
        Api.fetchRetailerList(payload, successCallback)
    }

    setOrganizationData(data) {
        //console.log("data", data)
        this.setState({organizationData: data.org_response[0]})
    }

    setRetailerData(data) {
        if(data && data.ret_response) {
            this.setState({retailerData: data.ret_response})
        } else {
            this.setState({retailerData: []})
        }
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
                                <span style={{fontWeight: '600'}}><mark>{organizationData.application_number}</mark></span>
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
                                <h3>CONSTITUTION OF ORGANIZATION</h3>
                            </div>

                            <div className="content">
                                    <div><p>Type of the Organization</p></div> 
                                    <div>
                                        <span>
                                            {organizationData.type_of_organisation}
                                        </span>
                                    </div>
                            </div>
                            <div className="content" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <div style={{display: 'flex', flexDirection: 'column', alignContent: 'flex-start'}}>
                                    <div><p>PAN</p></div>
                                    <div><span>{organizationData.pan_number ? organizationData.pan_number : '--'}</span></div>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                                    <div><p>CIN</p></div> 
                                    <div>
                                        <span>
                                            {organizationData.cin_no ? organizationData.cin_no : '--'}
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
                                            {organizationData.city_name}
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
                                            {organizationData.state_name}
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
                            {/* {
                                (organizationData.other_documents && organizationData.other_documents.length > 0 || organizationData.photo_of_auth_signatory || organizationData.pan_of_auth_signatory || organizationData.address_proof_auth_signatory) && */}
                                <div className="sub-title">
                                    <h3>DOCUMENTS ATTACHED</h3>
                                </div>
{/* -                           } */}
                            {      
                                organizationData.other_documents &&  organizationData.other_documents.length > 0 &&
                                <div className="content">
                                    <div>
                                        <span className="icon">{getIcon('tick')}</span>
                                        <span className="text">
                                            {organizationData.other_documents}
                                        </span>
                                    </div>
                                </div>
                            }
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
                            {
                                organizationData.type_of_organisation === "partnership" &&
                                <React.Fragment>
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
                                </React.Fragment>
                            }
                            {
                                organizationData.type_of_organisation === "pvtltd" &&
                                <React.Fragment>
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
                            retailerData && retailerData.length > 0 && retailerData.map((item, index) => {
                                return(
                                    <React.Fragment>
                                        <div className="outlet-info">
                                       
                                            <div className="sub-title">
                                                <h3>{index+1}) OUTLET INFORMATION</h3>
                                            </div>
                                            <div className="content">
                                                    <div><p>Name of the Outlet</p></div> 
                                                    <div>
                                                        <span>
                                                            {item.outlet_name}
                                                            {/* Outlet 1 */}
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
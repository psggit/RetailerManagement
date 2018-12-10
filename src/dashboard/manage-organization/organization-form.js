import React from 'react'
import { Form, Checkbox, Button, ButtonGroup } from '@auth0/cosmos'
import { validateTextField, validateEmail, validateNumberField } from 'Utils/validators'
//import { emailRegex, } from 'Utils/regex'
import { checkCtrlA, validateNumType, checkCtrlV } from 'Utils/logic-utils'

class OrganizationForm extends React.Component {

    constructor(props) {
        super(props)
        console.log("props", this.props)
        this.inputNameMap = {
            organizationName: 'Organization name',
            organizationType: 'Organization type',
            incorporationDate: 'Date of incorporation',
            cinNumber: 'Cin number',
            panNumber: 'Pin number',
            GSTNumber: 'GST number',
            organizationAddress: 'Organization address',
            landlineNo: 'Landline number',
            authorizedPerson: 'Name of authorized person',
            mobileNo: 'Mobile number',
            pincode: 'Pincode',
            email: 'Email'
        }
        this.state = {
            organizationName: props.data ? props.data.organizationName : '',
            organizationType: props.data ? props.data.organizationType : 'proprietorship',
            incorporationDate: props.data ? props.data.incorporationDate : '',
            cinNumber: props.data ? props.data.cinNumber : '',
            panNumber: props.data ? props.data.panNumber : '',
            outletsCount: props.data ? props.data.outletsCount : 0,
            selectedKycIdx: props.data ? (props.data.selectedKycIdx === "true" ? 1 : 2) : 1,
            GSTNumber: props.data ? props.data.GSTNumber : '',
            selectedOrganizationStatusIdx: props.data ? (props.data.selectedOrganizationStatusIdx === "true" ? 1 : 2) : 1,
            organizationAddress: props.data ? props.data.organizationAddress : '',
            //city: props.data ? props.data.city : '',
            selectedCityIdx: props.data ? props.data.selectedCityIdx : 1,
            //state: props.data ? props.data.state : '',
            selectedStateIdx: props.data ? props.data.selectedStateIdx : 1,
            pincode: props.data ? props.data.pincode : '',
            landlineNo: props.data ? props.data.landlineNo : '',
            authorizedPerson: props.data ? props.data.authorizedPerson : '',
            mobileNo: props.data ? props.data.mobileNo : '',
            email: props.data ? props.data.email : '',
            
            photo: props.data ? props.data.photo : false,
            pancard: props.data ? props.data.pancard : false,
            address: props.data ? props.data.address : false,
            
            partnershipPancard: props.data ? props.data.partnershipPancard : false,
            partnershipDeed: props.data ? props.data.partnershipDeed : false,
            partnershipLOA: props.data ? props.data.partnershipLOA : false,
        
            pvtPancard: props.data ? props.data.pvtPancard : false,
            pvtCOI: props.data ? props.data.pvtCOI : false,
            pvtLOA: props.data ? props.data.pvtLOA : false,
            
            organizationNameErr: {
                value: '',
                status: false
            },
            incorporationDateErr: {
                value: '',
                status: false
            },
            cinNumberErr: {
                value: '',
                status: false
            },
            panNumberErr: {
                value: '',
                status: false
            },
            GSTNumberErr: {
                value: '',
                status: false
            },
            organizationAddressErr: {
                value: '',
                status: false
            },
            pincodeErr: {
                value: '',
                status: false
            },
            landlineNoErr: {
                value: '',
                status: false
            },
            authorizedPersonErr: {
                value: '',
                status: false
            },
            mobileNoErr: {
                value: '',
                status: false
            },
            emailIdErr: {
                value: '',
                status: false
            }
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleNumberChange = this.handleNumberChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this) 
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.getData = this.getData.bind(this)
    }

    handleChange(e) {
        //console.log("handle change", e.target.value, e.target.name, e.target.type)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSelectChange(e) {
        this.setState({[e.target.name]: e.target.checked})
    }
 
    handleTextChange(e) {
        const errName = `${e.target.name}Err`
        this.setState({
            [e.target.name]: e.target.value,
            [errName]: validateTextField(this.inputNameMap[e.target.name], e.target.value),
            //activeFieldName: e.target.name
        })
    }

    handleEmailChange(e) {
        const errName = `${e.target.name}Err`
        this.setState({
            [e.target.name]: e.target.value,
            [errName]: validateEmail(this.inputNameMap[e.target.name], e.target.value),
            //activeFiel[Name: e.target.name
        })
    }

    handleNumberChange(e) {
        const errName = `${e.target.name}Err`
        this.length = 0
        this.checkLength = true
    
        switch(e.target.name) {
    
            case 'pincode':
                this.length = 6
            break;

            case 'mobileNo':
                this.length = 10
            break;

            default:
            break;
        }
        if(validateNumType(e.keyCode) || checkCtrlA(e) || checkCtrlV(e)) {
            this.setState({ 
                [e.target.name]: e.target.value,
                [errName]: validateNumberField({fieldName: this.inputNameMap[e.target.name], 
                                                fieldValue: e.target.value, 
                                                length: this.length,
                                                checkLength: this.checkLength
                                               }),
                //activeFieldName: e.target.name
            })
        } else {
            e.preventDefault()
        }   
    }

    getData() {
        return this.state
    }

    render() {
        const { organizationNameErr, 
            incorporationDateErr, 
            cinNumberErr, 
            panNumberErr, 
            GSTNumberErr,
            organizationAddressErr,
            pincodeErr,
            landlineNoErr,
            authorizedPersonErr,
            mobileNoErr,
            emailIdErr
        } = this.state
        return (
            <Form layout="label-on-top">
                <Form.FieldSet label="Organization Details">
                    <Form.TextInput
                        placeholder="Crystal Wines"
                        label="Organization Name*"
                        type="text"
                        name="organizationName"
                        value={this.state.organizationName}
                        error={organizationNameErr.status ? organizationNameErr.value : ''}
                        onChange={(e) => this.handleTextChange(e)}
                    />
                    <Form.TextInput
                        label="Date of Incorporation*"
                        type="date"
                        name="incorporationDate"
                        value={this.state.incorporationDate}
                        error={incorporationDateErr.status ? incorporationDateErr.value : ''}
                        onChange={(e) => this.handleTextChange(e)}
                    />
                    <Form.Radio
                        name="organizationType"
                        label="Organization Type*"
                        type="radio"
                        selected={this.state.organizationType}
                        onChange={e => this.handleChange(e)}
                        align="horizontal"
                    >
                        <Form.Radio.Option value="proprietorship">Proprietorship</Form.Radio.Option>
                        <Form.Radio.Option value="partnership">Partnership</Form.Radio.Option>
                        <Form.Radio.Option value="pvtltd">Pvt Ltd</Form.Radio.Option>
                        <Form.Radio.Option value="others">Others</Form.Radio.Option>
                    </Form.Radio>
                    <Form.TextInput
                        placeholder="AFEPC1427J"
                        label="PAN Number*"
                        type="text"
                        name="panNumber"
                        defaultValue={this.props.data ? this.props.data.panNumber : ''}
                        error={panNumberErr.status ? panNumberErr.value : ''}
                        onKeyDown={(e) => this.handleTextChange(e)}
                        onKeyUp={(e) => this.handleTextChange(e)}
                    />
                    <Form.TextInput
                        placeholder="29560309716"
                        label="CIN Number*"
                        type="text"
                        name="cinNumber"
                        value={this.state.cinNumber}
                        error={cinNumberErr.status ? cinNumberErr.value : ''}
                        onChange={(e) => this.handleTextChange(e)}
                    />
                    <Form.TextInput
                        label="No of Outlets*"
                        type="number"
                        name="outletsCount"
                        value={this.state.outletsCount}
                        onChange={(e) => this.handleChange(e)}
                    />
                    <Form.TextInput
                        label="GST Number*"
                        type="text"
                        name="GSTNumber"
                        value={this.state.GSTNumber}
                        error={GSTNumberErr.status ? GSTNumberErr.value : ''}
                        onChange={(e) => this.handleTextChange(e)}
                    />
                    <Form.Select
                        label="KYC Verification Status*"
                        value={this.state.selectedKycIdx}
                        name="selectedKycIdx"
                        options={[
                            { text: 'Verified', value: '1' },
                            { text: 'Not Verified', value: '2' },
                        ]}
                        onChange={(e) => this.handleChange(e)}
                    />
                    <Form.Select
                        label="Organization Status*"
                        value={this.state.selectedOrganizationStatusIdx}
                        name="selectedOrganizationStatusIdx"
                        options={[
                            { text: 'Active', value: '1' },
                            { text: 'Inactive', value: '2' },
                        ]}
                        onChange={(e) => this.handleChange(e)}
                    />
                </Form.FieldSet>
                <Form.FieldSet label="Organization Contact Details">
                    <Form.TextArea 
                        label="Organization Address*" 
                        name="organizationAddress"
                        error={organizationAddressErr.status ? organizationAddressErr.value : ''}
                        value={this.state.organizationAddress}
                        onChange={(e) => this.handleTextChange(e)} 
                    />
                    <Form.Select
                        label="State*"
                        value={this.state.selectedStateIdx}
                        name="selectedStateIdx"
                        options={[
                            { text: 'Tamilnadu', value: '1' },
                            { text: 'Karnataka', value: '2' },
                        ]}
                        onChange={(e) => this.handleChange(e)}
                    />
                    <Form.Select
                        label="City*"
                        value={this.state.selectedCityIdx}
                        name="selectedCityIdx"
                        options={[
                            { text: 'Chennai', value: '1' },
                            { text: 'Coimbatore', value: '2' },
                        ]}
                        onChange={(e) => this.handleChange(e)}
                    />
                    <Form.TextInput
                        placeholder="389887"
                        label="Pincode*"
                        type="text"
                        name="pincode"
                        defaultValue={this.props.data ? this.props.data.pincode : ''}
                        error={pincodeErr.status ? pincodeErr.value : ''}
                        onKeyDown={(e) => this.handleNumberChange(e)}
                        onKeyUp={(e) => this.handleNumberChange(e)}
                    />
                    <Form.TextInput
                        label="Landline No*"
                        type="text"
                        name="landlineNo"
                        error={landlineNoErr.status ? landlineNoErr.value : ''}
                        value={this.state.landlineNo}
                        onChange={(e) => this.handleTextChange(e)}
                    />
                    <Form.TextInput
                        label="Authorized Person Name*"
                        type="text"
                        name="authorizedPerson"
                        error={authorizedPersonErr.status ? authorizedPersonErr.value : ''}
                        value={this.state.authorizedPerson}
                        onChange={(e) => this.handleTextChange(e)}
                    />
                    <Form.TextInput
                        label="Mobile No*"
                        type="text"
                        name="mobileNo"
                        error={mobileNoErr.status ? mobileNoErr.value : ''}
                        defaultValue={this.props.data ? this.props.data.mobileNo : ''}
                        onKeyDown={(e) => {this.handleNumberChange(e)}}
                        onKeyUp={(e) => this.handleNumberChange(e)}
                    />
                    <Form.TextInput
                        label="Email*"
                        type="text"
                        name="email"
                        error={emailIdErr.status ? emailIdErr.value : ''}
                        value={this.state.email}
                        onChange={(e) => this.handleEmailChange(e)}
                    />
                </Form.FieldSet>
                <Form.FieldSet label="Documents Submitted as Proof">
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>    
                        <Checkbox
                            name="photo"
                            onChange={e => this.handleSelectChange(e)}
                            value="photo"
                            checked={this.state.photo}
                        >
                            Photo of Authorized Signatory
                        </Checkbox>
                        <Checkbox
                            name="pancard"
                            onChange={e => this.handleSelectChange(e)}
                            value="pancard"
                            checked={this.state.pancard}
                        >
                            PAN of Authorized Signatory
                        </Checkbox>
                        <Checkbox
                            name="address"
                            onChange={e => this.handleSelectChange(e)}
                            value="address"
                            checked={this.state.address}
                        >
                            Address proof of Authorized Signatory
                        </Checkbox>
                    </div>
                    <div style={{marginBottom: '20px'}}>
                        <div style={{marginBottom: '8px'}}>
                            <label>For (Partnership firm/LLP)</label>
                        </div>
                        <div style={{display: 'flex'}}>
                            <div style={{marginRight: '24px'}}>
                                <Checkbox
                                    name="partnershipPancard"
                                    onChange={e => this.handleSelectChange(e)}
                                    value="partnershipPancard"
                                    checked={this.state.partnershipPancard}
                                >
                                    PAN
                                </Checkbox>
                            </div>
                            <div style={{marginRight: '24px'}}>
                                <Checkbox
                                    name="partnershipDeed"
                                    onChange={e => this.handleSelectChange(e)}
                                    value="partnershipDeed"
                                    checked={this.state.partnershipDeed}
                                >
                                    Partnership Deed
                                </Checkbox>
                            </div>
                            <div style={{marginRight: '24px'}}>
                                <Checkbox
                                    name="partnershipLOA"
                                    onChange={e => this.handleSelectChange(e)}
                                    value="partnershipLOA"
                                    checked={this.state.partnershipLOA}
                                >
                                    LOA
                                </Checkbox>
                            </div>
                        </div>
                    </div>
                    <div style={{marginBottom: '20px'}}>
                        <div style={{marginBottom: '8px'}}>
                            <label>For (Pvt Ltd)</label>
                        </div>
                        <div style={{display: 'flex'}}>
                            <div style={{marginRight: '20px'}}>
                                <Checkbox
                                    name="pvtPancard"
                                    onChange={e => this.handleSelectChange(e)}
                                    value="pvtPancard"
                                    checked={this.state.pvtPancard}
                                >
                                    PAN
                                </Checkbox>
                            </div>
                            <div style={{marginRight: '20px'}}>
                                <Checkbox
                                    name="pvtCOI"
                                    onChange={e => this.handleSelectChange(e)}
                                    value="pvtCOI"
                                    checked={this.state.pvtCOI}
                                >
                                    COI
                                </Checkbox>
                            </div>
                            <div style={{marginRight: '20px'}}>
                                <Checkbox
                                    name="pvtLOA"
                                    onChange={e => this.handleSelectChange(e)}
                                    value="pvtLOA"
                                    checked={this.state.pvtLOA}
                                >
                                    Board Resolution / LOA
                                </Checkbox>
                            </div>
                        </div>
                    </div>
                </Form.FieldSet>
            </Form>
        )
    }
}

export default OrganizationForm
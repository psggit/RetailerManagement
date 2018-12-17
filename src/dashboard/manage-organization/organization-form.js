import React from 'react'
import { Form, TextInput, Checkbox, Button, ButtonGroup } from '@auth0/cosmos'
import { validateTextField, validateEmail, validateNumberField } from 'Utils/validators'
import { checkCtrlA, validateNumType, checkCtrlV } from 'Utils/logic-utils'
import CustomButton from 'Components/button'

class OrganizationForm extends React.Component {

    constructor(props) {
        super(props)
        this.inputNameMap = {
            organizationName: 'Organization name',
            organizationType: 'Organization type',
            incorporationDate: 'Date of incorporation',
            cinNumber: 'Cin number',
            panNumber: 'Pan number',
            GSTNumber: 'GST number',
            organizationAddress: 'Organization address',
            landlineNo: 'Landline number',
            authorizedPerson: 'Name of authorized person',
            mobileNo: 'Mobile number',
            pincode: 'Pincode',
            email: 'Email',
            // partnershipDoc: 'For partnership firm, Documents attached',
            // privateDoc: 'For Pvt Ltd, Documents attached',
            otherOrgType: 'Organization type',
            otherProof: 'Documents attached'
        }

        this.state = {
            organizationName: props.data ? props.data.organisation_name : '',
            organizationType: props.data ? (props.data.type_of_organisation === "partnership" || props.data.type_of_organisation === "proprietorship" || props.data.type_of_organisation === "pvtltd" ) ? props.data.type_of_organisation : 'others' : 'proprietorship',
            incorporationDate: props.data ? props.data.date_of_incorporation : '',
            cinNumber: props.data ? props.data.cin_no : '',
            panNumber: props.data ? props.data.pan_number : '',
            outletsCount: props.data ? props.data.no_of_outlets : 0,
            selectedKycIdx: props.data ? (props.data.kyc_status === "true" ? 1 : 2) : 1,
            GSTNumber: props.data ? props.data.gst_no : '',
            selectedOrganizationStatusIdx: props.data ? (props.data.status === "Active" ? 1 : 2) : 1,
            organizationAddress: props.data ? props.data.org_address : '',
            selectedCityIdx: props.data ? parseInt(props.data.city_id) : 1,
            selectedStateIdx: props.data ? parseInt(props.data.state_id) : 1,
            pincode: props.data ? props.data.pincode : '',
            landlineNo: props.data ? props.data.landline_number : '',
            authorizedPerson: props.data ? props.data.name_of_auth_person : '',
            mobileNo: props.data ? props.data.mobile_number : '',
            email: props.data ? props.data.email : '',
            
            photo: props.data ? props.data.photo_of_auth_signatory : false,
            pancard: props.data ? props.data.pan_of_auth_signatory : false,
            address: props.data ? props.data.address_proof_auth_signatory : false,
            
            partnershipPancard: props.data ? props.data.is_pan : false,
            partnershipDeed: props.data ? props.data.partnershi_deed : false,
            partnershipLOA: props.data ? props.data.loa : false,
        
            pvtPancard: props.data ? props.data.is_pan : false,
            pvtCOI: props.data ? props.data.coi : false,
            pvtLOA: props.data ? props.data.loa : false,
            otherOrgType: props.data ? props.data.type_of_organisation : '',
            otherProof: props.data ? props.data.other_documents : '',
            isOtherProof: props.data && props.data.other_documents && props.data.other_documents.length > 0 ? true : false,

            // otherParnershipProof: false,
            // otherPvtLtdProof: false,
            // partnershipDoc: '',
            // privateDoc: '',

            stateList: this.props.stateList ? this.props.stateList : '',
            cityList: this.props.cityList ? this.props.cityList : '',
            stateMap: this.props.stateMap ? this.props.stateMap : '',
            //errorFlag: false,

            // partnershipDocErr: {
            //     value: '',
            //     status: false
            // },
            // privateDocErr: {
            //     value: '',
            //     status: false
            // },
            otherOrgTypeErr: {
                value: '',
                status: false
            },
            otherProofErr: {
                value: '',
                status: false
            },
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
            emailErr: {
                value: '',
                status: false
            }
        }

        this.errorFlag = false,

        this.handleChange = this.handleChange.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleNumberChange = this.handleNumberChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this) 
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.getData = this.getData.bind(this)
        this.checkForm = this.checkForm.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.validate = this.validate.bind(this)
        //this.formIsValid = this.formIsValid.bind(this)
    }

    componentWillReceiveProps(newProps) {
        if(this.props.stateList !== newProps.stateList) {
            //console.log("state id", newProps.stateList)
            this.setState({stateList: newProps.stateList})
            if(location.pathname.includes("create")) {
                this.setState({selectedStateIdx: newProps.stateList[0].value})
            }
        }

        if(this.props.cityList !== newProps.cityList) {
            //console.log("city id", newProps.cityList)
            this.setState({cityList: newProps.cityList})
            if(location.pathname.includes("create")) {
                this.setState({selectedCityIdx: newProps.cityList[0].value})
            }
        }

        if(this.props.stateMap !== newProps.stateMap) {
            this.setState({stateMap: newProps.stateMap})
        }
    }

    handleChange(e) {
        if(e.target.name.toString().includes("StateIdx")) {
            //console.log("citylist", this.state.stateMap, this.state.stateMap[e.target.value])
            this.setState({
                cityList: this.state.stateMap[e.target.value],
                [e.target.name]: e.target.value
            })
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    handleSelectChange(e) {
        if(!e.target.checked && e.target.name === "isOtherProof") {
            this.setState({[e.target.name]: e.target.checked, otherProof: ''})
        } else {
            this.setState({[e.target.name]: e.target.checked})
        }
    }
 
    handleTextChange(e) {
        //console.log("date of incor", this.state.incorporationDate.length)
        const errName = `${e.target.name}Err`
        this.setState({
            [e.target.name]: e.target.value,
            [errName]: validateTextField(this.inputNameMap[e.target.name], e.target.value),
        })
    }

    handleEmailChange(e) {
        const errName = `${e.target.name}Err`
        //console.log("err", this.inputNameMap[e.target.name], e.target.value, validateEmail(this.inputNameMap[e.target.name], e.target.value))
        this.setState({
            [e.target.name]: e.target.value,
            [errName]: validateEmail(this.inputNameMap[e.target.name], e.target.value),
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
                                               })
            })
        } else {
            e.preventDefault()
        }   
    }

    handleSave(e) {
        e.preventDefault()
        this.checkForm()
        console.log("handle save in orgform", this.errorFlag)

        if(!this.errorFlag) {
            this.props.handleSave()
        }
       
    }

    checkForm() {
        this.errorFlag = false
        const formEl = document.getElementById('OrgName')
        const inputCollection = formEl.getElementsByTagName('input')
        const inputsArr = Array.prototype.slice.call(inputCollection)
        
        const textInputs = inputsArr.filter(item => item.type == 'text' || item.type == "date"  && item.name !== 'otherProof')
        //console.log(textInputs)
        textInputs.forEach(item => {
            this.validate(item)
        })
    }

    validate(item) {
        const errName = `${item.name}Err`
        //console.log("field", item.name, "value", item.value, "bool", validateTextField(this.inputNameMap[item.name], item.value))
       
        if(item.name === "pincode" || item.name === "mobileNo") {
            //console.log("if")
            this.length = 0
            this.checkLength = true
        
            switch(item.name) {
        
                case 'pincode':
                    this.length = 6
                break;
    
                case 'mobileNo':
                    this.length = 10
                break;
    
                default:
                break;
            }
            const error = validateNumberField({fieldName: this.inputNameMap[item.name], fieldValue: item.value, length: this.length, checkLength: this.checkLength})
            //console.log("validate number", "name", this.inputNameMap[item.name], "value", item.value, "state", validateNumberField(this.inputNameMap[item.name], item.value, this.length, this.checkLength))
            if (error.status) {
                this.errorFlag = true
            }
            this.setState({
                [errName]: validateNumberField({fieldName: this.inputNameMap[item.name], fieldValue: item.value, length: this.length, checkLength: this.checkLength}),
            })
        } else if(item.name === "email") {
            //console.log("else if")
            const error = validateEmail(this.inputNameMap[item.name], item.value)
            if (error.status) {
                this.errorFlag = true
            }
            this.setState({
                [errName]: validateEmail(this.inputNameMap[item.name], item.value),
            })

        } else {
            //console.log("else")
            const error = validateTextField(this.inputNameMap[item.name], item.value)
            if (error.status) {
                this.errorFlag = true
            }
            this.setState({
                [errName]: validateTextField(this.inputNameMap[item.name], item.value),
            })
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
            emailErr,
            // partnershipDocErr,
            // privateDocErr,
            otherOrgTypeErr,
            otherProofErr,
            isOtherProof,
            otherProof,
            otherOrgType,
            organizationType,
            cityList,
            stateList
        } = this.state
        //console.log("date of incor", this.state.incorporationDate.length)
        //console.log("other proof", otherProof, isOtherProof)
        //console.log("proof", isOtherProof, otherProof, otherProofErr)
        return (
            <div id="OrgName">
            <Form layout="label-on-top">
                <Form.FieldSet label="Organization Details">
                    <Form.TextInput
                        //placeholder="Crystal Wines"
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
                        //defaultValue={this.state.incorporationDate}
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
                    {
                        this.state.organizationType === "others" &&
                        <div>
                            <Form.TextInput
                            label=""
                            placeholder="Organization Type"
                            type="text"
                            name="otherOrgType"
                            error={((organizationType === "others" && otherOrgType && otherOrgType.length === 0) || otherOrgTypeErr.status) ? "Organization type is required" : ''}
                            value={this.state.otherOrgType}
                            onChange={(e) => this.handleTextChange(e)}
                            />
                        </div>
                    } 
                    <Form.TextInput
                        //placeholder="AFEPC1427J"
                        label="PAN Number*"
                        type="text"
                        name="panNumber"
                        defaultValue={this.props.data ? this.props.data.pan_number : ''}
                        error={panNumberErr.status ? panNumberErr.value : ''}
                        onKeyDown={(e) => this.handleTextChange(e)}
                        onKeyUp={(e) => this.handleTextChange(e)}
                    />
                    <Form.TextInput
                        //placeholder="29560309716"
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
                        min="0"
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
                        options={stateList}
                        onChange={(e) => this.handleChange(e)}
                    />
                    <Form.Select
                        label="City*"
                        value={this.state.selectedCityIdx}
                        name="selectedCityIdx"
                        options={cityList}
                        onChange={(e) => this.handleChange(e)}
                    />
                    <Form.TextInput
                        //placeholder="389887"
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
                        autoComplete="fefef"
                        error={mobileNoErr.status ? mobileNoErr.value : ''}
                        defaultValue={this.props.data ? this.props.data.mobile_number : ''}
                        onKeyDown={(e) => {this.handleNumberChange(e)}}
                        onKeyUp={(e) => this.handleNumberChange(e)}
                    />
                    <Form.TextInput
                        label="Email*"
                        type="text"
                        name="email"
                        autoComplete="fefef"
                        error={emailErr.status ? emailErr.value : ''}
                        value={this.state.email}
                        onChange={(e) => this.handleEmailChange(e)}
                    />
                </Form.FieldSet>
                <Form.FieldSet label="Documents Submitted as Proof">
                    <div style={{display: 'flex', marginBottom: '20px'}}>    
                        <div style={{marginRight: '24px'}}>
                            <Checkbox
                                name="photo"
                                onChange={e => this.handleSelectChange(e)}
                                value="photo"
                                checked={this.state.photo}
                            >
                                Photo of Authorized Signatory
                            </Checkbox>
                        </div>
                        <div>
                            <Checkbox
                                name="pancard"
                                onChange={e => this.handleSelectChange(e)}
                                value="pancard"
                                checked={this.state.pancard}
                            >
                                PAN of Authorized Signatory
                            </Checkbox>
                        </div>
                    </div>
                    <div style={{display: 'flex', marginBottom: '20px'}}> 
                        <div style={{marginRight: '24px'}}>
                            <Checkbox
                                name="address"
                                onChange={e => this.handleSelectChange(e)}
                                value="address"
                                checked={this.state.address}
                            >
                                Address proof of Authorized Signatory
                            </Checkbox> 
                        </div>
                        <div>
                            <Checkbox
                                name="isOtherProof"
                                onChange={e => this.handleSelectChange(e)}
                                value="isOtherProof"
                                checked={this.state.isOtherProof}
                            >
                                Others
                            </Checkbox>
                        </div>
                    </div>
                    {
                        // this.state.isOtherProof &&
                        <div>
                            <Form.TextInput
                            label=""
                            placeholder="Aadhar copy, Licence copy"
                            type="text"
                            name="otherProof"
                            error={((isOtherProof && otherProof.length === 0)|| otherProofErr.status) ? "Documents attached are required" : ''}
                            value={this.state.otherProof}
                            //size="small"
                            onChange={(e) => this.handleTextChange(e)}
                            />
                        </div>
                    } 
                    {
                        this.state.organizationType === "partnership" &&
                        <div style={{marginBottom: '20px'}}>
                            <div style={{marginBottom: '8px'}}>
                                <label>For (Partnership firm/LLP)</label>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center'}}>
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
                    }
                    {
                        this.state.organizationType === "pvtltd" &&
                        <div style={{marginBottom: '20px'}}>
                            <div style={{marginBottom: '8px'}}>
                                <label>For (Pvt Ltd)</label>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center'}}>
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
                    }
                    <ButtonGroup align="right">
                        {/* <Button onClick={(e) => this.handleSave(e)}>Save</Button> */}
                        <CustomButton text="Save" handleClick={this.handleSave}/>
                    </ButtonGroup>
                </Form.FieldSet>
            </Form>
            </div>
        )
    }
}

export default OrganizationForm
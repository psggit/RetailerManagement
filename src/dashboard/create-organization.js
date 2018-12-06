import React from 'react'
import Layout from 'Components/layout'
import Card from 'Components/card'
import { Form, Checkbox, Button, ButtonGroup } from '@auth0/cosmos'
import { validateOrganizationName } from 'Utils/validators'
import { emailRegex, } from 'Utils/regex'
import { checkCtrlA, validateNumType } from 'Utils/logic-utils'
//export const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//export const numberRegex = /^[0-9]$/
//import { Form } from 'Styles/form-theme'

class CreateOrganization extends React.Component {
    constructor() {
        super()
        this.inputNameMap = {
            organizationName: 'OrganizationName',
            organizationType: 'OrganizationType',
            incorporationDate: 'IncorporationDate',
            cinNumber: 'CinNumber',
            panNumber: 'PanNumber',
            outletsCount: 'OutletsCount',
            // KYCVerified: '',
            // GSTNumber: '',
            organizationStatus: 'OrganizationStatus',
            organizationAddress: 'OrganizationAddress',
            city: 'City',
            state: 'State',
            pincode: 'Pincode',
            landlineNo: 'LandlineNo',
            authorizedPerson: 'AuthorizedPerson',
            mobileNo: 'MobileNo',
            emailId: 'EmailId',
        }

        // this.functionNameMap = {
        //     organizationName: validateOrganizationName
        // }

        this.state = {
            organizationName: '',
            organizationType: 'proprietorship',
            incorporationDate: '',
            cinNumber: '',
            panNumber: '',
            outletsCount: 0,
            //KYCVerified: '',
            selectedKycIdx: 1,
            GSTNumber: '',
            //organizationStatus: '',
            selectedOrganizationStatusIdx: 1,
            organizationAddress: '',
            city: '',
            state: '',
            pincode: '',
            landlineNo: '',
            authorizedPerson: '',
            mobileNo: '',
            emailId: '',
            organizationNameErr: {
                value: '',
                status: false
            },
            organizationTypeErr: {
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
            outletsCountErr: {
                value: '',
                status: false
            },
            // KYCVerifiedErr: {
            //     value: '',
            //     status: false
            // },
            GSTNumberErr: {
                value: '',
                status: false
            },
            // organizationStatusErr: {
            //     value: '',
            //     status: false
            // },
            organizationAddressErr: {
                value: '',
                status: false
            },
            cityErr: {
                value: '',
                status: false
            },
            stateErr: {
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
        this.handleSave = this.handleSave.bind(this)
        this.handleKycFieldChange = this.handleKycFieldChange.bind(this)
        this.handleOrganizationstatusChange = this.handleOrganizationstatusChange.bind(this)
        this.handleNumberChange = this.handleNumberChange.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleNumberChange = this.handleNumberChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)   
    }

    handleChange(e) {
        console.log("handle change", e.target.value, e.target.name, e.target.type)
        //this.setState({[e.target.name]: e.target.value})
        //const errName = `${e.target.name}Err`
        
        //const fnExp = eval(`this.validate${this.inputNameMap[e.target.name]}`)
        //const fnExp = eval(`${this.functionNameMap[e.target.name]}`)
        //console.log("function", fnExp)
        // if((e.target.type === "text" || e.target.type === "textarea" || e.target.type === "date") && e.target.name !== "emailId") {
        //     this.setState({
        //         [e.target.name]: e.target.value,
        //         [errName]: this.validateTextField(e.target.value, e.target.name)
        //     })
        // } else if(e.target.type === "text" && e.target.name === "emailId") {
        //     this.setState({
        //         [e.target.name]: e.target.value,
        //         [errName]: this.validateEmail(e.target.value)
        //     })
        // } else {
        this.setState({
            [e.target.name]: e.target.value
        })
        //}
        // this.setState({
        //     [e.target.name]: e.target.value,
        //     [errName]: fnExp(e.target.value)
        // })
    }

    handleTextChange(e) {
        const errName = `${e.target.name}Err`
        
        this.setState({
            [e.target.name]: e.target.value,
            [errName]: this.validateTextField(e.target.value, e.target.name)
        })
    }

    handleEmailChange(e) {
        const errName = `${e.target.name}Err`
        
        this.setState({
            [e.target.name]: e.target.value,
            [errName]: this.validateEmail(e.target.value)
        })
    }

    handleNumberChange(e) {
        //console.log("mob change",validateNumType(e.keyCode) , checkCtrlA(e))
        const errName = `${e.target.name}Err`
        this.length = 0
    
        switch(e.target.name) {
            // case 'panNumber':
            //     length = 10
            // break;

            // case 'cinNumber':
            //     length = 10
            // break;

            case 'pincode':
                this.length = 6
            break;

            case 'mobileNo':
                this.length = 10
            break;

            default:
            break;
        }
        //if(validateNumType(e.keyCode) || checkCtrlA(e)) {
        this.setState({ 
            [e.target.name]: e.target.value,
            [errName]: this.validateNumberField({value: e.target.value, length: this.length, fieldName: e.target.name})
        })
        // } else {
        //     e.preventDefault()
        // }   
    }

    handleKycFieldChange(e) {
        this.setState({selectedKycIdx: e.target.value})
    }

    handleOrganizationstatusChange(e) {
        this.setState({selectedOrganizationStatusIdx: e.target.value})
    }
    
    validateTextField(value, fieldName) {
        if (!value.length) {
          return {
            status: true,
            value: `${fieldName} is required`
          }
        }
        return {
          status: false,
          value: ''
        }
    }

    validateEmail(email) {
        if (!email.length) {
          return {
            status: true,
            value: 'Email is required'
          }
        } else if (!emailRegex.test(email)) {
          return {
            status: true,
            value: 'Email is invalid'
          }
        }
        return {
          status: false,
          value: ''
        }
    }

    validateNumberField({value, length, fieldName}) {
        if (!value.length) {
          return {
            status: true,
            value: `${fieldName} is required`
          }
        } else if (isNaN(value) || value.length !== length) {
          return {
            status: true,
            value: `${fieldName} is invalid`
          }
        }
      
        return {
          status: false,
          value: ''
        }
    }

    handleSave(e) {
        e.preventDefault()
        const { organizationName,
            organizationType ,
            incorporationDate,
            cinNumber,
            panNumber,
            outletsCount,
            KYCVerified,
            GSTNumber,
            organizationStatus,
            organizationAddress,
            city,
            state,
            pincode,
            landlineNo,
            authorizedPerson,
            mobileNo,
            emailId,
        } = this.state
        // console.log("Form fields", organizationName,
        // organizationType ,
        // incorporationDate,
        // cinNumber,
        // panNumber,
        // outletsCount,
        // KYCVerified,
        // GSTNumber,
        // organizationStatus,
        // organizationAddress,
        // city,
        // state,
        // pincode,
        // landlineNo,
        // authorizedPerson,
        // mobileNo,
        // emailId)
    }

    render() {
        const { organizationNameErr, 
                organizationTypeErr, 
                incorporationDateErr, 
                cinNumberErr, 
                panNumberErr, 
                outletsCountErr,
                KYCVerifiedErr,
                GSTNumberErr,
                organizationStatusErr,
                organizationAddressErr,
                cityErr,
                stateErr,
                pincodeErr,
                landlineNoErr,
                authorizedPersonErr,
                mobileNoErr,
                emailIdErr
        } = this.state
        return (
            <Layout title="Create Organization">
                <Card width="800px">
                    <Form layout="label-on-top">
                        <Form.FieldSet label="Organization Details">
                            <Form.TextInput
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
                                label="Organization Type"
                                type="radio"
                                selected={this.state.organizationType}
                                onChange={e => this.handleChange(e)}
                                align="horizontal"
                            >
                                <Form.Radio.Option value="proprietorship">proprietorship</Form.Radio.Option>
                                <Form.Radio.Option value="partnership">Partnership</Form.Radio.Option>
                                <Form.Radio.Option value="pvtltd">Pvt Ltd</Form.Radio.Option>
                                <Form.Radio.Option value="others">Others</Form.Radio.Option>
                            </Form.Radio>
                            {/* <div style={{marginBottom: '16px'}}>
                                <div style={{marginBottom: '8px'}}>
                                    <label>Organization Type*: </label>
                                </div>
                                <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                                    <Checkbox
                                        name="proprietorship"
                                        onChange={evt => this.handleChange(evt)}
                                        value="Proprietorship"
                                        checked={true}
                                        //checked={this.state.selected.indexOf('one') >= 0}
                                        align="vertical"
                                    >
                                        Proprietorship
                                    </Checkbox>
                                    <Checkbox
                                        name="partnership"
                                        onChange={evt => this.handleChange(evt)}
                                        value="Partnership"
                                        //checked={this.state.selected.indexOf('one') >= 0}
                                        align="vertical"
                                    >
                                        Partnership
                                    </Checkbox>
                                    <Checkbox
                                        name="pvtltd"
                                        onChange={evt => this.handleChange(evt)}
                                        value="Pvt Ltd"
                                        //checked={this.state.selected.indexOf('one') >= 0}
                                        align="vertical"
                                    >
                                        Pvt Ltd
                                    </Checkbox>
                                    <Checkbox
                                        name="others"
                                        onChange={evt => this.handleChange(evt)}
                                        value="Others"
                                        //checked={this.state.selected.indexOf('one') >= 0}
                                        align="vertical"
                                    >
                                        Other(s)
                                    </Checkbox>
                                </div>
                            </div> */}
                            <Form.TextInput
                                label="PAN Number*"
                                type="text"
                                name="panNumber"
                                value={this.state.panNumber}
                                error={panNumberErr.status ? panNumberErr.value : ''}
                                onChange={(e) => this.handleTextChange(e)}
                            />
                            <Form.TextInput
                                label="CIN Number"
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
                                error={outletsCountErr.status ? outletsCountErr.value : ''}
                                onChange={(e) => this.handleChange(e)}
                            />
                            <Form.Select
                                label="KYC Verification Status*"
                                value={this.state.selectedKycIdx}
                                name="KYCVerified"
                                options={[
                                    { text: 'Verified', value: '1' },
                                    { text: 'Not Verified', value: '2' },
                                ]}
                                onChange={(e) => this.handleKycFieldChange(e)}
                            />
                            {/* <Form.TextInput
                                label="KYC Verified*"
                                type="text"
                                name="KYCVerified"
                                value={this.state.KYCVerified}
                                onChange={(e) => this.handleChange(e)}
                            /> */}
                            <Form.Select
                                label="Organization Status*"
                                value={this.state.selectedOrganizationStatusIdx}
                                name="organizationStatus"
                                options={[
                                    { text: 'Active', value: '1' },
                                    { text: 'Inactive', value: '2' },
                                ]}
                                onChange={(e) => this.handleOrganizationstatusChange(e)}
                            />
                        </Form.FieldSet>
                        <Form.FieldSet label="Organization Contact Details">
                            <Form.TextArea 
                                label="Organization Address*" 
                                //placeholder="Add a lot of text here"
                                name="organizationAddress"
                                error={organizationAddressErr.status ? organizationAddressErr.value : ''}
                                value={this.state.organizationAddress}
                                onChange={(e) => this.handleTextChange(e)} 
                            />
                            <Form.TextInput
                                label="City*"
                                type="text"
                                name="city"
                                value={this.state.city}
                                error={cityErr.status ? cityErr.value : ''}
                                onChange={(e) => this.handleTextChange(e)}
                            />
                            <Form.TextInput
                                label="State*"
                                type="text"
                                name="state"
                                error={stateErr.status ? stateErr.value : ''}
                                value={this.state.state}
                                onChange={(e) => this.handleTextChange(e)}
                            />
                            <Form.TextInput
                                label="Pincode*"
                                type="text"
                                name="pincode"
                                value={this.state.pincode}
                                error={pincodeErr.status ? pincodeErr.value : ''}
                                onChange={(e) => this.handleNumberChange(e)}
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
                                //type="text"
                                name="mobileNo"
                                error={mobileNoErr.status ? mobileNoErr.value : ''}
                                value={this.state.mobileNo}
                                onChange={(e) => this.handleNumberChange(e)}
                            />
                            <Form.TextInput
                                label="Email*"
                                type="text"
                                name="emailId"
                                error={emailIdErr.status ? emailIdErr.value : ''}
                                value={this.state.emailId}
                                onChange={(e) => this.handleEmailChange(e)}
                            />
                        </Form.FieldSet>
                        <ButtonGroup align="right">
                            <Button onClick={(e) => this.handleSave(e)}> Save </Button>
                            <Button> Download </Button>
                        </ButtonGroup>
                    </Form>
                </Card>
            </Layout>
        )
    }
}

export default CreateOrganization
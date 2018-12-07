import React from 'react'
import { Form, Checkbox, Button, ButtonGroup } from '@auth0/cosmos'
import { validateOrganizationName } from 'Utils/validators'
import { emailRegex, } from 'Utils/regex'
import { checkCtrlA, validateNumType } from 'Utils/logic-utils'

class RetailerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            organizationName: props.data ? props.data.organizationName : '',
            selectedOrganizationIdx: props.data ? props.data.selectedOrganizationIdx : 0,
            ksbclCode: props.data ? props.data.ksbclCode : '',
            outletName: props.data ? props.data.outletName : '',
            exciseLicenseNo: props.data ? props.data.exciseLicenseNo : '',
            discountPercent: props.data ? props.data.discountPercent : '',
            deliveryDiscountPercent: props.data ? props.data.deliveryDiscountPercent : '',
            serviceChargePercent: props.data ? props.data.serviceChargePercent : '',
            KYCVerified: props.data ? props.data.KYCVerified : '',
            selectedKycIdx: props.data ? props.data.selectedKycIdx : 1,
            selectedOutletStatusIdx: props.data ? props.data.selectedOutletStatusIdx : 1,
            FSSAINumber: props.data ? props.data.FSSAINumber : '',
        
            city: props.data ? props.data.city : '',
            selectedCityIdx: props.data ? props.data.selectedCityIdx : 1,
            state: props.data ? props.data.state : '',
            selectedStateIdx: props.data ? props.data.selectedStateIdx : 1,
            pincode: props.data ? props.data.pincode : '',
            outletAddress: props.data ? props.data.outletAddress : '',
            landlineNo: props.data ? props.data.landlineNo : '',
            gpsCoordinates: props.data ? props.data.gpsCoordinates : '',
            mobileNo: props.data ? props.data.mobileNo : '',
            emailId: props.data ? props.data.emailId : '',
            
            bankName: props.data ? props.data.bankName : '',
            accountHolderName: props.data ? props.data.accountHolderName : '',
            accountNumber: props.data ? props.data.accountNumber : '',
            branch: props.data ? props.data.branch : '',
            accountType: props.data ? props.data.accountType : 'savings',
            IFSC: props.data ? props.data.IFSC : '',
            cancelledCheck: props.data ? props.data.cancelledCheck : false,
            exciseLicense: props.data ? props.data.exciseLicense : false,
            outletPhoto: props.data ? props.data.outletPhoto : false,
            errorFound: true,
            
            ksbclCodeErr: {
                value: '',
                status: false
            },
            outletNameErr: {
                value: '',
                status: false
            },
            exciseLicenseNoErr: {
                value: '',
                status: false
            },
            discountPercentErr: {
                value: '',
                status: false
            },
            deliveryDiscountPercentErr: {
                value: '',
                status: false
            },
            serviceChargePercentErr: {
                value: '',
                status: false
            },
            FSSAINumberErr: {
                value: '',
                status: false
            },
            outletAddressErr: {
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
            mobileNoErr: {
                value: '',
                status: false
            },
            emailIdErr: {
                value: '',
                status: false
            },
            bankNameErr: {
                value: '',
                status: false
            },
            accountHolderNameErr: {
                value: '',
                status: false
            },
            accountNumberErr: {
                value: '',
                status: false
            },
            branchErr: {
                value: '',
                status: false
            },
            IFSCErr: {
                value: '',
                status: false
            },
            gpsCoordinatesErr: {
                value: '',
                status: false
            }
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handleNumberChange = this.handleNumberChange.bind(this) 
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.getData = this.getData.bind(this)
        this.validateTextField = this.validateTextField.bind(this)
        this.validateNumberField = this.validateNumberField.bind(this)
        this.validateEmail = this.validateEmail.bind(this)
    }

    getData() {
        return this.state
    }

    handleChange(e) {
        //console.log("handle change", e.target.value, e.target.name, e.target.type)
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    handleTextChange(e) {
        const errName = `${e.target.name}Err`
        
        this.setState({
            [e.target.name]: e.target.value,
            [errName]: this.validateTextField(e.target.value, e.target.name)
        })
    }
    handleNumberChange(e) {
        //console.log("mob change",validateNumType(e.keyCode) , checkCtrlA(e))
        const errName = `${e.target.name}Err`
        this.length = 0
    
        switch(e.target.name) {
            // case 'panNumber':
            //     length = 11
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
        if(validateNumType(e.keyCode) || checkCtrlA(e)) {
            this.setState({ 
                [e.target.name]: e.target.value,
                [errName]: this.validateNumberField({value: e.target.value, length: this.length, fieldName: e.target.name})
            })
        } else {
            e.preventDefault()
        }   
    }

    handleEmailChange(e) {
        const errName = `${e.target.name}Err`
        
        this.setState({
            [e.target.name]: e.target.value,
            [errName]: this.validateEmail(e.target.value)
        })
    }

    // handleDropdownChange(e) {
    //     this.setState({[e.target.name]: e.target.value})
    // }

    handleSelectChange(e) {
        this.setState({[e.target.name]: e.target.checked})
    }

    validateTextField(value, fieldName) {
        if (!value.length) {
          //this.setState({errorFound: true})
          return {
            status: true,
            value: `${fieldName} is required`
          }
        }
        this.setState({errorFound: false})
        return {
          status: false,
          value: ''
        }
    }

    validateNumberField({value, length, fieldName}) {
        if (!value.length) {
          //this.setState({errorFound: true})
          return {
            status: true,
            value: `${fieldName} is required`
          }
        } else if (isNaN(value) || value.length !== length) {
          //this.setState({errorFound: true})
          return {
            status: true,
            value: `${fieldName} is invalid`
          }
        }
        this.setState({errorFound: false})
        return {
          status: false,
          value: ''
        }
    }

    validateEmail(email) {
        if (!email.length) {
          //this.setState({errorFound: true})
          return {
            status: true,
            value: 'Email is required'
          }
        } else if (!emailRegex.test(email)) {
          //this.setState({errorFound: true})
          return {
            status: true,
            value: 'Email is invalid'
          }
        }
        this.setState({errorFound: false})
        return {
          status: false,
          value: ''
        }
    }

    render() {
        const {
            ksbclCodeErr,
            outletNameErr,
            exciseLicenseNoErr,
            discountPercentErr,
            serviceChargePercentErr,
            deliveryDiscountPercentErr,
            FSSAINumberErr,
            bankNameErr,
            accountHolderNameErr,
            accountNumberErr,
            branchErr,
            IFSCErr,
            outletAddressErr,
            pincodeErr,
            landlineNoErr,
            mobileNoErr,
            emailIdErr,
            gpsCoordinatesErr
        } = this.state
        //const {mobileNo, pincode} = this.props.data
        return(
            <Form layout="label-on-top">
                <Form.FieldSet label="Organization Details">
                    <Form.Select
                        placeholder="Select Organization"
                        label="Organization*"
                        value={this.state.selectedOrganizationIdx}
                        name="selectedOrganizationIdx"
                        options={[
                            { text: 'Insight Hospitality Pvt Ltd', value: '1' },
                            { text: 'Pink Panther Hospitality Pvt Ltd', value: '2' },
                            { text: 'dsadsdfsdfdsf', value: '3' },
                        ]}
                        onChange={(e) => this.handleChange(e)}
                    />
                    <Form.TextInput
                        label="KSBCL Code*"
                        type="text"
                        name="ksbclCode"
                        value={this.state.ksbclCode}
                        error={ksbclCodeErr.status ? ksbclCodeErr.value : ''}
                        onChange={(e) => this.handleTextChange(e)}
                    />
                    <Form.TextInput
                        label="Outlet Name*"
                        type="text"
                        name="outletName"
                        value={this.state.outletName}
                        error={outletNameErr.status ? outletNameErr.value : ''}
                        onChange={(e) => this.handleTextChange(e)}
                    />
                    <Form.TextInput
                        label="Excise License Number*"
                        type="text"
                        name="exciseLicenseNo"
                        value={this.state.exciseLicenseNo}
                        error={exciseLicenseNoErr.status ? exciseLicenseNoErr.value : ''}
                        onChange={(e) => this.handleTextChange(e)}
                    />
                    <Form.TextInput
                        label="Discount Percent*"
                        type="text"
                        name="discountPercent"
                        value={this.state.discountPercent}
                        error={discountPercentErr.status ? discountPercentErr.value : ''}
                        onChange={(e) => this.handleTextChange(e)}
                    />
                    <Form.TextInput
                        label="Service Charge Percent*"
                        type="text"
                        name="serviceChargePercent"
                        value={this.state.serviceChargePercent}
                        error={serviceChargePercentErr.status ? serviceChargePercentErr.value : ''}
                        onChange={(e) => this.handleTextChange(e)}
                    />
                    <Form.TextInput
                        label="Delivery Discount Percent*"
                        type="text"
                        name="deliveryDiscountPercent"
                        value={this.state.deliveryDiscountPercent}
                        error={deliveryDiscountPercentErr.status ? deliveryDiscountPercentErr.value : ''}
                        onChange={(e) => this.handleTextChange(e)}
                    />
                    <Form.TextInput
                        label="FSSAI Number*"
                        type="text"
                        name="FSSAINumber"
                        value={this.state.FSSAINumber}
                        error={FSSAINumberErr.status ? FSSAINumberErr.value : ''}
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
                        label="Outlet Status*"
                        value={this.state.selectedOutletStatusIdx}
                        name="selectedOutletStatusIdx"
                        options={[
                            { text: 'Active', value: '1' },
                            { text: 'Inactive', value: '2' },
                        ]}
                        onChange={(e) => this.handleChange(e)}
                    />
                </Form.FieldSet>
                <Form.FieldSet label="Bank Account Details">
                    <Form.TextInput
                        label="Bank Name*"
                        type="text"
                        name="bankName"
                        value={this.state.bankName}
                        error={bankNameErr.status ? bankNameErr.value : ''}
                        onChange={(e) => this.handleTextChange(e)}
                    />
                    <Form.TextInput
                        label="Account Holder Name*"
                        type="text"
                        name="accountHolderName"
                        value={this.state.accountHolderName}
                        error={accountHolderNameErr.status ? accountHolderNameErr.value : ''}
                        onChange={(e) => this.handleTextChange(e)}
                    />
                    <Form.TextInput
                        label="Account Number*"
                        type="text"
                        name="accountNumber"
                        value={this.state.accountNumber}
                        error={accountNumberErr.status ? accountNumberErr.value : ''}
                        onChange={(e) => this.handleTextChange(e)}
                    />
                    <Form.TextInput
                        label="Branch*"
                        type="text"
                        name="branch"
                        value={this.state.branch}
                        error={branchErr.status ? branchErr.value : ''}
                        onChange={(e) => this.handleTextChange(e)}
                    />
                    <Form.Radio
                        name="accountType"
                        label="Account Type*"
                        type="radio"
                        selected={this.state.accountType}
                        onChange={e => this.handleChange(e)}
                        align="horizontal"
                    >
                        <Form.Radio.Option value="savings">Savings</Form.Radio.Option>
                        <Form.Radio.Option value="current">Current</Form.Radio.Option>
                    </Form.Radio>
                    <Form.TextInput
                        label="IFSC Code*"
                        type="text"
                        name="IFSC"
                        value={this.state.IFSC}
                        error={IFSCErr.status ? IFSCErr.value : ''}
                        onChange={(e) => this.handleTextChange(e)}
                    />
                    <div style={{marginBottom: '20px'}}>
                        <div style={{marginBottom: '8px'}}>
                            <label>Documents Attached as Proof</label>
                        </div>
                        <div style={{display: 'flex'}}>
                            <div style={{marginRight: '24px'}}>
                                <Checkbox
                                    name="cancelledCheck"
                                    onChange={e => this.handleSelectChange(e)}
                                    value="cancelledCheck"
                                    checked={this.state.cancelledCheck}
                                >
                                    Cancelled Cheque
                                </Checkbox>
                            </div>
                            <div style={{marginRight: '24px'}}>
                                <Checkbox
                                    name="exciseLicense"
                                    onChange={e => this.handleSelectChange(e)}
                                    value="exciseLicense"
                                    checked={this.state.exciseLicense}
                                >
                                    Excise License
                                </Checkbox>
                            </div>
                            <div style={{marginRight: '24px'}}>
                                <Checkbox
                                    name="outletPhoto"
                                    onChange={e => this.handleSelectChange(e)}
                                    value="outletPhoto"
                                    checked={this.state.outletPhoto}
                                >
                                    Photo of the Outlet
                                </Checkbox>
                            </div>
                        </div>
                    </div>
                </Form.FieldSet>
                <Form.FieldSet label="Outlet Contact Details">
                    <Form.TextInput
                        label="Outlet Address*"
                        type="text"
                        name="outletAddress"
                        value={this.state.outletAddress}
                        error={outletAddressErr.status ? outletAddressErr.value : ''}
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
                        label="Landline No*"
                        type="text"
                        name="landlineNo"
                        error={landlineNoErr.status ? landlineNoErr.value : ''}
                        value={this.state.landlineNo}
                        onChange={(e) => this.handleTextChange(e)}
                    />
                    <Form.TextInput
                        label="Mobile No*"
                        //type="text"
                        //maxLength={10}
                        defaultValue={this.props.data ? this.props.data.mobileNo : ''}
                        name="mobileNo"
                        error={mobileNoErr.status ? mobileNoErr.value : ''}
                        //value={this.state.mobileNo}
                        //onChange={(e) => this.handleNumberChange(e)}
                        onKeyDown={(e) => {this.handleNumberChange(e)}}
                        onKeyUp={(e) => {this.handleNumberChange(e)}}
                    />
                    <Form.TextInput
                        label="Email*"
                        type="text"
                        name="emailId"
                        error={emailIdErr.status ? emailIdErr.value : ''}
                        value={this.state.emailId}
                        onChange={(e) => this.handleEmailChange(e)}
                    />
                    <Form.TextInput
                        label="GPS Coordinates*"
                        type="text"
                        name="gpsCoordinates"
                        error={gpsCoordinatesErr.status ? gpsCoordinatesErr.value : ''}
                        value={this.state.gpsCoordinates}
                        onChange={(e) => this.handleTextChange(e)}
                    />
                    <Form.TextInput
                        label="Pincode*"
                        type="text"
                        name="pincode"
                        defaultValue={this.props.data ? this.props.data.pincode : ''}
                        //value={this.state.pincode}
                        error={pincodeErr.status ? pincodeErr.value : ''}
                        onKeyDown={(e) => this.handleNumberChange(e)}
                        onKeyUp={(e) => this.handleNumberChange(e)}
                        //onChange={(e) => this.handleNumberChange(e)}
                    />
                </Form.FieldSet>
            </Form>
        )
    }
}

export default RetailerForm
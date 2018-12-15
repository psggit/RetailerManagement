import React from 'react'
import { Form, Checkbox, Button, ButtonGroup } from '@auth0/cosmos'
import { validateTextField, validateEmail, validateNumberField } from 'Utils/validators'
import { checkCtrlA, validateNumType, checkCtrlV } from 'Utils/logic-utils'

class RetailerForm extends React.Component {
    constructor(props) {
        super(props)
        this.inputNameMap = {
            ksbclCode: 'KSBCL code',
            outletName: 'Outlet name',
            exciseLicenceNo: 'Excise license no',
            discountPercent: 'Discount percent',
            serviceChargePercent: 'Service charge percent',
            deliveryDiscountPercent: 'Delivery discount percent',
            FSSAINumber: 'FSSAI number',
            bankName: 'Bank name',
            accountHolderName: 'Account holder name',
            accountNumber: 'Account number',
            branch: 'Branch',
            IFSC: 'IFSC code',
            outletAddress: 'Outlet address',
            landlineNo: 'Landline number',
            mobileNo: 'Mobile number',
            gpsCoordinates: 'GPS coordinates',
            pincode: 'Pincode',
            email: 'Email'
        }
        this.state = {
            organizationList: this.props.organizationList,
            organizationMap: this.props.organizationMap,
            stateList: this.props.stateList,
            stateMap: this.props.stateMap,
            cityList: this.props.cityList,
            selectedOrganizationIdx: props.data ? props.data.organisation_id : 0,
            ksbclCode: props.data ? props.data.ksbcl_code : '',
            outletName: props.data ? props.data.outlet_name : '',
            exciseLicenceNo: props.data ? props.data.excise_licence_number : '',
            discountPercent: props.data ? props.data.discount_percent : '',
            deliveryDiscountPercent: props.data ? props.data.delivery_discount_percent : '',
            serviceChargePercent: props.data ? props.data.service_charge_percent : '',
            KYCVerified: props.data ? props.data.KYCVerified : '',
            selectedKycIdx: props.data ? (props.data.kyc_status === "true" ? 1 : 2) : 1,
            selectedOutletStatusIdx: props.data ? (props.data.branch_status === "true" ? 1 : 2) : 1,
            FSSAINumber: props.data ? props.data.fssai_no : '',
            selectedCityIdx: props.data ? props.data.city_id : 0,
            selectedStateIdx: props.data ? props.data.state_id : 0,
            pincode: props.data ? props.data.pincode : '',
            outletAddress: props.data ? props.data.store_address : '',
            landlineNo: props.data ? props.data.landline_number : '',
            gpsCoordinates: props.data ? props.data.gps_cordinates : '',
            mobileNo: props.data ? props.data.mobile_number : '',
            email: props.data ? props.data.email : '',
            
            bankName: props.data ? props.data.bank_name : '',
            accountHolderName: props.data ? props.data.acc_holder_name : '',
            accountNumber: props.data ? props.data.account_number : '',
            branch: props.data ? props.data.bank_branch : '',
            accountType: props.data ? props.data.acc_type : 'savings',
            IFSC: props.data ? props.data.IFSC : '',
            cancelledCheck: props.data ? props.data.is_cancelled_cheque : false,
            exciseLicense: props.data ? props.data.is_excise_license : false,
            outletPhoto: props.data ? props.data.is_photo_of_outlet : false,

            ksbclCodeErr: {
                value: '',
                status: false
            },
            outletNameErr: {
                value: '',
                status: false
            },
            exciseLicenceNoErr: {
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
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handleNumberChange = this.handleNumberChange.bind(this) 
        this.getData = this.getData.bind(this)
    }

    componentWillReceiveProps(newProps) {
        if(this.props.organizationList !== newProps.organizationList) {
            this.setState({organizationList: newProps.organizationList})
        }

        if(this.props.stateList !== newProps.stateList) {
            this.setState({stateList: newProps.stateList})
            if(location.pathname.includes("create")) {
                this.setState({selectedStateIdx: newProps.stateList[0].value})
            }
        }

        if(newProps.cityList && this.props.cityList !== newProps.cityList) {
            this.setState({cityList: newProps.cityList})
            if(location.pathname.includes("create")) {
                this.setState({selectedCityIdx: newProps.cityList[0].value})
            }
        }

        if(this.props.organizationMap !== newProps.organizationMap) {
            this.setState({organizationMap: newProps.organizationMap})
        }

        if(this.props.stateMap !== newProps.stateMap) {
            this.setState({stateMap: newProps.stateMap})
        }
    }

    handleChange(e) {
        if(e.target.name.includes("Organization")) {
            this.setState({
                selectedStateIdx: parseInt(this.state.organizationMap[e.target.value].state_id),
                cityList: this.state.stateMap[parseInt(this.state.organizationMap[e.target.value].state_id)],
                [e.target.name]: e.target.value
            })
        } else {
            console.log("name", e.target.name, "val", e.target.value)
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    handleSelectChange(e) {
        this.setState({[e.target.name]: e.target.checked})
    }
    
    handleTextChange(e) {
        const errName = `${e.target.name}Err`
        
        this.setState({
            [e.target.name]: e.target.value,
            [errName]: validateTextField(this.inputNameMap[e.target.name], e.target.value),
        })
    }

    handleNumberChange(e) {
        const errName = `${e.target.name}Err`
        this.length = 0
        this.checkLength = true
    
        switch(e.target.name) {
            case 'pincode':
                this.length = 6
                this.checkLength = true
            break;

            case 'mobileNo':
                this.length = 10
                this.checkLength = true
            break;

            default:
                this.checkLength = false
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

    handleEmailChange(e) {
        const errName = `${e.target.name}Err`
        
        this.setState({
            [e.target.name]: e.target.value,
            [errName]: validateEmail(this.inputNameMap[e.target.name], e.target.value),
        })
    }

    getData() {
        return this.state
    }

    render() {
        const {
            ksbclCodeErr,
            outletNameErr,
            exciseLicenceNoErr,
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
       
        return(
            <Form layout="label-on-top">
                <Form.FieldSet label="Organization Details">
                    <Form.Select
                        placeholder="Select Organization"
                        label="Organization*"
                        value={this.state.selectedOrganizationIdx}
                        name="selectedOrganizationIdx"
                        options={this.state.organizationList}
                        onChange={(e) => this.handleChange(e)}
                    />
                    <Form.TextInput
                        //placeholder="101"
                        label="KSBCL Code*"
                        type="text"
                        name="ksbclCode"
                        value={this.state.ksbclCode}
                        error={ksbclCodeErr.status ? ksbclCodeErr.value : ''}
                        onChange={(e) => this.handleTextChange(e)}
                    />
                    <Form.TextInput
                        //placeholder="Goa Wines Patto"
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
                        name="exciseLicenceNo"
                        value={this.state.exciseLicenceNo}
                        error={exciseLicenceNoErr.status ? exciseLicenceNoErr.value : ''}
                        onChange={(e) => this.handleTextChange(e)}
                    />
                    <Form.TextInput
                        label="Discount Percent*"
                        type="text"
                        name="discountPercent"
                        //value={this.state.discountPercent}
                        defaultValue={this.props.data ? this.props.data.discountPercent : ''}
                        error={discountPercentErr.status ? discountPercentErr.value : ''}
                        onKeyDown={(e) => {this.handleNumberChange(e)}}
                        onKeyUp={(e) => {this.handleNumberChange(e)}}
                    />
                    <Form.TextInput
                        label="Service Charge Percent*"
                        type="text"
                        name="serviceChargePercent"
                        defaultValue={this.props.data ? this.props.data.serviceChargePercent : ''}
                        error={serviceChargePercentErr.status ? serviceChargePercentErr.value : ''}
                        onKeyDown={(e) => {this.handleNumberChange(e)}}
                        onKeyUp={(e) => {this.handleNumberChange(e)}}
                    />
                    <Form.TextInput
                        label="Delivery Discount Percent*"
                        type="text"
                        name="deliveryDiscountPercent"
                        defaultValue={this.props.data ? this.props.data.deliveryDiscountPercent : ''}
                        //value={this.state.deliveryDiscountPercent}
                        error={deliveryDiscountPercentErr.status ? deliveryDiscountPercentErr.value : ''}
                        //error={activeFieldName === "deliveryDiscountPercent" && activeField.errStatus ? activeField.errValue : ''}
                        //onChange={(e) => this.handleTextChange(e)}
                        onKeyDown={(e) => {this.handleNumberChange(e)}}
                        onKeyUp={(e) => {this.handleNumberChange(e)}}
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
                        disabled={true}
                        label="State*"
                        value={this.state.selectedStateIdx}
                        name="selectedStateIdx"
                        options={this.state.stateList}
                    />
                    <Form.Select
                        label="City*"
                        value={this.state.selectedCityIdx}
                        name="selectedCityIdx"
                        options={this.state.cityList}
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
                        defaultValue={this.props.data ? this.props.data.mobileNo : ''}
                        name="mobileNo"
                        autoComplete="fefef"
                        error={mobileNoErr.status ? mobileNoErr.value : ''}
                        onKeyDown={(e) => {this.handleNumberChange(e)}}
                        onKeyUp={(e) => {this.handleNumberChange(e)}}
                    />
                    <Form.TextInput
                        label="Email*"
                        type="text"
                        name="email"
                        autoComplete="fefef"
                        error={emailIdErr.status ? emailIdErr.value : ''}
                        value={this.state.email}
                        onChange={(e) => this.handleEmailChange(e)}
                    />
                    <Form.TextInput
                        placeholder="15.4935224,73.8340721"
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
                        //error={activeFieldName === "pincode" && activeField.errStatus ? activeField.errValue : ''}
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
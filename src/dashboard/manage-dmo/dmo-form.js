/* eslint-disable react/prop-types */
import React from 'react'
import { Form, ButtonGroup } from '@auth0/cosmos'
import { validateTextField, validateEmail, validateNumberField } from 'Utils/validators'
import { checkCtrlA, validateNumType, checkCtrlV } from 'Utils/logic-utils'
import CustomButton from 'Components/button'

class DMOForm extends React.Component {
  constructor (props) {
    super(props)
    this.inputNameMap = {
      retailerId: 'Retailer Id',
      merchantBusinessName: 'Merchant Business Name',
      merchantLegalName: 'Merchant Legal Name',
      PAN: 'PAN',
      merchantAddress: 'Merchant Address',
      merchantPIN: 'Merchant PIN',
      // parentMerchantId: 'Parent merchant id',
      accountNumber: 'Account Number',
      IFSC: 'IFSC Code',
      mobileNo: 'Mobile Number',
      email: 'Email',
      GPS: 'GPS',
      GST: 'GST',   
    }
  
    this.errorFlag = false,
      this.state = {
        // eslint-disable-next-line react/prop-types
        retailerId: this.props.retailerId,
        merchantBusinessName: this.props.merchantBusinessName,
        merchantLegalName: this.props.merchantLegalName,
        //merchantCategoryCode: this.props.merchantCategoryCode,
        PAN: this.props.PAN,
        merchantType: this.props.merchantType,
        merchantAddress: this.props.merchantAddress,
        merchantState: this.props.merchantState,
        merchantCity: this.props.merchantCity,
        merchantPIN: this.props.merchantPIN,
        //parentMerchantId: this.props.parentMerchantId,
        accountNumber: props.data ? props.data.account_number : '',
        IFSC: props.data ? props.data.ifsc_code : '',
        mobileNo: props.data ? props.data.mobile_number : '',
        email: props.data ? props.data.email : '',
        bankName: props.data ? props.data.bank_name : '',
        GPS: this.props.GPS,
        GST: this.props.GST,
        dailyTransactionLimit: this.props.dailyTransactionLimit,
        monthlyTransactionLimit: this.props.monthlyTransactionLimit,
        limitPerTransaction: this.props.limitPerTransaction,

        retailerIdErr: {
          value: '',
          status: false
        },
        merchantBusinessNameErr: {
          value: '',
          status: false
        },
        merchantLegalNameErr: {
          value: '',
          status: false
        },
        PANErr: {
          value: '',
          status: false
        },
        merchantAddressErr: {
          value: '',
          status: false
        },
        merchantPINErr: {
          value: '',
          status: false
        },
        // parentMerchantIdErr: {
        //   value: '',
        //   status: false
        // },
        accountNumberErr: {
        value: '',
        status: false
        },
        IFSCErr: {
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
        },
        GPSErr: {
        value: '',
        status: false
        },
        GSTErr: {
        value: '',
        status: false
        },
      }

    this.handleChange = this.handleChange.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleNumberChange = this.handleNumberChange.bind(this)
    this.checkForm = this.checkForm.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.validate = this.validate.bind(this)
    this.getData = this.getData.bind(this)
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleTextChange (e) {
    const errName = `${e.target.name}Err`

    this.setState({
      [e.target.name]: e.target.value,
      [errName]: validateTextField(this.inputNameMap[e.target.name], e.target.value),
    })
  }

  handleNumberChange (e) {
    const errName = `${e.target.name}Err`
    this.length = 0
    this.checkLength = true

    switch (e.target.name) {
      case 'mobileNo':
        this.length = 10
        this.checkLength = true
        break;

      default:
        this.checkLength = false
        break;
    }

    if (validateNumType(e.keyCode) || checkCtrlA(e) || checkCtrlV(e)) {
      this.setState({
        [e.target.name]: e.target.value,
        [errName]: validateNumberField({
          fieldName: this.inputNameMap[e.target.name],
          fieldValue: e.target.value,
          length: this.length,
          checkLength: this.checkLength
        })
      })
    } else {
      e.preventDefault()
    }
  }

  handleEmailChange (e) {
    const errName = `${e.target.name}Err`

    this.setState({
      [e.target.name]: e.target.value,
      [errName]: validateEmail(this.inputNameMap[e.target.name], e.target.value),
    })
  }

  getData () {
    return this.state
  }

  handleSave (e) {
    e.preventDefault()
    console.log("value-name", this.state)
    // this.setState({
    //   [e.target.name]:e.target.value
    // })
    this.checkForm()
    if (!this.errorFlag) {
      // eslint-disable-next-line react/prop-types
      this.props.handleSave()
    }
  }

  checkForm () {
    this.errorFlag = false
    const formEl = document.getElementById('DMOForm')
    const inputCollection = formEl.getElementsByTagName('input')
    const inputsArr = Array.prototype.slice.call(inputCollection)

    const textInputs = inputsArr.filter(item => item.type == 'text')
    textInputs.forEach(item => {
      this.validate(item)
    })
  }

  validate (item) {
    const errName = `${item.name}Err`

    if (item.name === "mobileNo") {
      this.length = 0
      this.checkLength = true

      switch (item.name) {
        case 'mobileNo':
          this.length = 10
          this.checkLength = true
          break;

        default:
          this.checkLength = false
          break;
      }
      const error = validateNumberField({
        fieldName: this.inputNameMap[item.name],
        fieldValue: item.value,
        length: this.length,
        checkLength: this.checkLength
      })
      if (error.status) {
        this.errorFlag = true
      }
      this.setState({
        [errName]: validateNumberField({
          fieldName: this.inputNameMap[item.name],
          fieldValue: item.value,
          length: this.length,
          checkLength: this.checkLength
        }),
      })
    } else if (item.name === "email") {
      const error = validateEmail(this.inputNameMap[item.name], item.value)
      if (error.status) {
        this.errorFlag = true
      }
      this.setState({
        [errName]: validateEmail(this.inputNameMap[item.name], item.value),
      })

    } else {
      const error = validateTextField(this.inputNameMap[item.name], item.value)
      if (error.status) {
        this.errorFlag = true
      }
      this.setState({
        [errName]: validateTextField(this.inputNameMap[item.name], item.value),
      })
    }
  }

  render () {
    const {
      retailerIdErr,
      merchantBusinessNameErr,
      merchantLegalNameErr,
      PANErr,
      merchantAddressErr,
      merchantPINErr,
      //parentMerchantIdErr,
      accountNumberErr,
      IFSCErr,
      mobileNoErr,
      emailErr,
      GPSErr,
      GSTErr
    } = this.state
   
    return (
      <div id="DMOForm">
        <Form layout="label-on-top">
          <Form.TextInput
            label="Retailer ID*"
            type="text"
            name="retailerId"
            value={this.state.retailerId}
            error={retailerIdErr.status ? retailerIdErr.value : ''}
            onChange={(e) => this.handleTextChange(e)}
            autoComplete="fefef"
          />
          <Form.FieldSet label="Merchant Details">
            <Form.TextInput
              label="Merchant Business Name*"
              type="text"
              name="merchantBusinessName"
              value={this.state.merchantBusinessName}
              error={merchantBusinessNameErr.status ? merchantBusinessNameErr.value : ''}
              onChange={(e) => this.handleTextChange(e)}
              autoComplete="fefef"
            />
            <Form.TextInput
              label="Merchant Legal Name*"
              type="text"
              name="merchantLegalName"
              value={this.state.merchantLegalName}
              error={merchantLegalNameErr.status ? merchantLegalNameErr.value : ''}
              onChange={(e) => this.handleTextChange(e)}
              autoComplete="fefef"
            />
            {/* <Form.Select
              label="Merchant Category Code*"
              value={this.state.merchantCategoryCode}
              name="merchantCategoryCode"
              options={[
                { text: 'Verified', value: '1' },
                { text: 'Not Verified', value: '2' },
              ]}
              onChange={(e) => this.handleChange(e)}
            /> */}
              <Form.TextInput
              label="PAN*"
              type="text"
              name="PAN"
              value={this.state.PAN}
              error={PANErr.status ? PANErr.value : ''}
              onChange={(e) => this.handleTextChange(e)}
              autoComplete="fefef"
            />
            <Form.Select
              label="Merchant Type*"
              value={this.state.merchantType}
              name="merchantType"
              options={[
                { text: 'Select Merchant Type', value: '1' },
                { text: 'Not Verified', value: '2' },
              ]}
              onChange={(e) => this.handleChange(e)}
            />
            <Form.FieldSet label="Merchant Details">
            <Form.TextInput
              label="Merchant Address*"
              type="text"
              name="merchantAddress"
              value={this.state.merchantAddress}
              //defaultValue={this.state.merchantAddress}
              error={merchantAddressErr.status ? merchantAddressErr.value : ''}
              onChange={(e) => this.handleTextChange(e)}
              autoComplete="fefef"
            />
              <Form.Select
                label="Merchant State*"
                value={this.state.merchantState}
                name="merchantState"
                //error={this.orgIndexError ? 'Organization name is required' : ''}
                options={this.state.merchantStateList}
                onChange={(e) => this.handleChange(e)}
              />
              <Form.Select
                label="Merchant City*"
                value={this.state.merchantCity}
                name="merchantCity"
                //error={this.orgIndexError ? 'Organization name is required' : ''}
                options={this.state.merchantCityList}
                onChange={(e) => this.handleChange(e)}
              />
            <Form.TextInput
              label="Merchant PIN*"
              type="text"
              name="merchantPIN"
              value={this.state.merchantPIN}
              error={merchantPINErr.status ? merchantPINErr.value : ''}
              onChange={(e) => this.handleTextChange(e)}
              autoComplete="fefef"
            />
          </Form.FieldSet>
          <Form.FieldSet label="Bank Account Details">
            {/* <Form.TextInput
              label="Parent Merchant ID*"
              type="text"
              name="parentMerchantId"
              value={this.state.parentMerchantId}
              autoComplete="fefef"
              error={parentMerchantIdErr.status ? parentMerchantIdErr.value : ''}
              onChange={(e) => this.handleTextChange(e)}
            /> */}
            <Form.TextInput
              label="Account Number*"
              type="text"
              name="accountNumber"
              value={this.state.accountNumber}
              autoComplete="fefef"
              error={accountNumberErr.status ? accountNumberErr.value : ''}
              onChange={(e) => this.handleTextChange(e)}
            />
            <Form.TextInput
              label="IFSC Code*"
              type="text"
              name="IFSC"
              value={this.state.IFSC}
              autoComplete="fefef"
              error={IFSCErr.status ? IFSCErr.value : ''}
              onChange={(e) => this.handleTextChange(e)}
            />
            <Form.TextInput
              label="Mobile No*"
              defaultValue={this.state.mobileNo}
              name="mobileNo"
              //value={this.state.mobileNo}
              autoComplete="fefef"
              error={mobileNoErr.status ? mobileNoErr.value : ''}
              onKeyDown={(e) => { this.handleNumberChange(e) }}
              onKeyUp={(e) => { this.handleNumberChange(e) }}
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
              <Form.Select
                label="Bank Name*"
                value={this.state.bankName}
                name="bankName"
                options={this.state.bankNameList}
                onChange={(e) => this.handleChange(e)}
              />
              <Form.TextInput
                label="GPS*"
                type="text"
                name="GPS"
                autoComplete="fefef"
                error={GPSErr.status ? GPSErr.value : ''}
                value={this.state.GPS}
                onChange={(e) => this.handleTextChange(e)}
              />
              <Form.TextInput
                label="GST*"
                type="text"
                name="GST"
                autoComplete="fefef"
                error={GSTErr.status ? GSTErr.value : ''}
                value={this.state.GST}
                onChange={(e) => this.handleTextChange(e)}
              />
              <Form.Select
                label="Daily Transaction Limit*"
                value={this.state.dailyTransactionLimit}
                name="dailyTransactionLimit"
                options={[
                  { text: ' ', value: '0' },
                  { text: '20,000', value: '1' },
                  
                ]}
                onChange={(e) => this.handleChange(e)}
              /> 
              <Form.Select
                label="Monthly Transaction Limit*"
                value={this.state.monthlyTransactionLimit}
                name="monthlyTransactionLimit"
                options={[
                  { text: '', value: '' },
                  { text: '50,000', value: '2' },
                ]}
                onChange={(e) => this.handleChange(e)}
              /> 
              <Form.Select
                label="Limit Per Transaction*"
                value={this.state.limitPerTransaction}
                name="limitPerTransaction"
                options={[
                  { text: '', value: '' },
                  { text: '5000', value: '2' },
                ]}
                onChange={(e) => this.handleChange(e)}
              /> 
         
           
            <ButtonGroup align="right">
              <CustomButton
                text="Register"
                handleClick={this.handleSave}
                // eslint-disable-next-line react/prop-types
                disableSave={this.props.disableSave}
              />
            </ButtonGroup>

          </Form.FieldSet>
          </Form.FieldSet>
        </Form>
      </div>
    )
  }
}

export default DMOForm
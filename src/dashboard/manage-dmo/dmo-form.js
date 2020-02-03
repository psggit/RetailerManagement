/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { Form, ButtonGroup } from '@auth0/cosmos'
import { validateTextField, validateEmail, validateNumberField } from 'Utils/validators'
import { checkCtrlA, validateNumType, checkCtrlV } from 'Utils/logic-utils'
import CustomButton from 'Components/button'
import PropTypes from "prop-types"

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
      dailyTransactionLimit: 'Daily Transaction Limit',
      monthlyTransactionLimit: 'Monthly Transaction Limit',
      limitPerTransaction: 'Limit Per Transaction'  
    }
  
    this.errorFlag = false,
      this.state = {
        retailerId: this.props.retailerId,
        merchantBusinessName: this.props.merchantBusinessName,
        merchantLegalName: this.props.merchantLegalName,
        PAN: this.props.PAN,
        merchantType: this.props.merchantType,
        merchantAddress: this.props.merchantAddress,
        stateList: this.props.stateList,
        stateMap: this.props.stateMap,
        cityList: this.props.cityList,
        merchantPIN: this.props.merchantPIN,
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
        selectedCityIdx: props.data ? props.data.city_id : 0,
        selectedStateIdx: props.data ? props.data.state_id : 0,

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
      }

    this.handleChange = this.handleChange.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleNumberChange = this.handleNumberChange.bind(this)
    this.checkForm = this.checkForm.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.validate = this.validate.bind(this)
    this.getData = this.getData.bind(this)
    this.handleStateChange = this.handleStateChange.bind(this)
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.stateList !== prevProps.stateList) {
      this.setState({ stateList: this.props.stateList })
      if (location.pathname.includes("create")) {
        this.setState({ selectedStateIdx: this.props.stateList[0].value })
      }
    }

    if (this.props.stateMap !== prevProps.stateMap) {
      this.setState({ stateMap: this.props.stateMap })
    }

    if (prevProps.cityList && this.props.cityList !== prevProps.cityList) {
      this.setState({ cityList: this.props.cityList })
      if (location.pathname.includes("create")) {
        this.setState({ selectedCityIdx: this.props.cityList[0].value })
      }
    }
  }

  handleStateChange (e) {
    if (e.target.name.toString().includes("StateIdx")) {
      this.setState({
        cityList: this.state.stateMap[e.target.value],
        [e.target.name]: e.target.value
      })
    }
  }

  handleChange (e) {
    if (e.target.name.toString().includes("StateIdx")) {
      this.setState({
        cityList: this.state.stateMap[e.target.value],
        [e.target.name]: e.target.value
      })
    } else {
      console.log("else")
      this.setState({
        [e.target.name]: e.target.value
      })
    }
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
      accountNumberErr,
      IFSCErr,
      mobileNoErr,
      emailErr,
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
                { text: 'Individual', value: 'Individual' },
              ]}
              onChange={(e) => this.handleChange(e)}
            />
            <Form.FieldSet label="Merchant Details">
            <Form.TextInput
              label="Merchant Address*"
              type="text"
              name="merchantAddress"
              value={this.state.merchantAddress}
              error={merchantAddressErr.status ? merchantAddressErr.value : ''}
              onChange={(e) => this.handleTextChange(e)}
              autoComplete="fefef"
            />
              <Form.Select
                label="Merchant State*"
                value={this.state.selectedStateIdx}
                name="selectedStateIdx"
                options={this.state.stateList}
                onChange={(e) => this.handleStateChange(e)}
              />
              <Form.Select
                label="Merchant City*"
                value={this.state.selectedCityIdx}
                name="selectedCityIdx"
                options={this.state.cityList}
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
                options={[
                  { text: 'Select Bank', value: '' },
                  { text: 'ICICI', value: 'ICICI' },
                  { text: 'Others', value: 'Others' },
                ]}
                onChange={(e) => this.handleChange(e)}
              />
              <Form.TextInput
                label="GPS*"
                type="text"
                name="GPS"
                autoComplete="fefef"
                value={this.state.GPS}
                onChange={(e) => this.handleTextChange(e)}
              />
              <Form.TextInput
                label="GST*"
                type="text"
                name="GST"
                autoComplete="fefef"
                value={this.state.GST}
                onChange={(e) => this.handleTextChange(e)}
              />
              
              <Form.TextInput
                label="Daily Transaction Limit*"
                type="text"
                name="dailyTransactionLimit"
                autoComplete="fefef"
                value={this.state.dailyTransactionLimit}
                onChange={(e) => this.handleTextChange(e)}
              />

              <Form.TextInput
                label="Monthly Transaction Limit*"
                type="text"
                name="monthlyTransactionLimit"
                autoComplete="fefef"
                value={this.state.monthlyTransactionLimit}
                onChange={(e) => this.handleTextChange(e)}
              />

              <Form.TextInput
                label="Limit Per Transaction*"
                type="text"
                name="limitPerTransaction"
                autoComplete="fefef"
                value={this.state.limitPerTransaction}
                onChange={(e) => this.handleTextChange(e)}
              />
           
            <ButtonGroup align="right">
              <CustomButton
                text="Register"
                handleClick={this.handleSave}
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

DMOForm.propTypes = {
  stateList: PropTypes.array,
  cityList: PropTypes.array,
  stateMap: PropTypes.object
}

export default DMOForm
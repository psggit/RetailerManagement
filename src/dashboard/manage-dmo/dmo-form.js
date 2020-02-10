
import React from "react"
import { Form, ButtonGroup } from "@auth0/cosmos"
import { validateTextField, validateEmail, validateNumberField } from "Utils/validators"
import { checkCtrlA, validateNumType, checkCtrlV } from "Utils/logic-utils"
import CustomButton from "Components/button"
import PropTypes from "prop-types"
import * as Api from "./../../api"

class DMOForm extends React.Component {
  constructor (props) {
    super(props)
    this.inputNameMap = {
      merchantBusinessName: "Merchant Business Name",
      merchantLegalName: 'Merchant Legal Name',
      PAN: 'PAN',
      merchantAddress: 'Merchant Address',
      merchantPIN: 'Merchant PIN',
      accountNumber: 'Account Number',
      IFSC: 'IFSC Code',
      mobileNo: 'Mobile Number',
      email: 'Email',
    }
  
    this.errorFlag = false,
    this.state = {
      retailerId: props.data ? props.data.retailer_id : '',
      merchantBusinessName: props.data ? props.data.merchant_business_name : '',
      merchantLegalName: props.data ? props.data.merchant_legal_name : '',
      PAN: props.data ? props.data.pan : '',
      merchantType: props.data ? props.data.merchant_type : '',
      merchantAddress: props.data ? props.data.merchant_address : '',
      stateList: this.props.stateList,
      stateMap: this.props.stateMap,
      cityList: this.props.cityList,
      retailerList: [], 
      merchantPIN: props.data ? props.data.merchant_pin : '',
      accountNumber: props.data ? props.data.account_no : '',
      IFSC: props.data ? props.data.ifsc_code : '',
      mobileNo: props.data ? props.data.mobile_no : '',
      email: props.data ? props.data.email_id : '',
      bankName: props.data ? props.data.bank_name : '',
      selectedCityIdx: props.data ? props.data.city_id : 0,
      selectedStateIdx: props.data ? props.data.state_id : 0,
      GPS: props.data ? props.data.merchant_latlng : '',
      GST: props.data ? props.data.gst_no : '',
      dailyTransactionLimit: props.data ? props.data.daily_txn_limit : '',
      monthlyTransactionLimit: props.data ? props.data.monthly_txn_limit : '',
      limitPerTransaction: props.data ? props.data.limit_per_txn : '',

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
    this.handleOptionalTextChange = this.handleOptionalTextChange.bind(this)
    this.fetchRetailers = this.fetchRetailers.bind(this)
  }

  componentDidUpdate (prevProps) {
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
      if (location.pathname.includes("create")) {
        this.setState({ 
          cityList: this.props.stateMap[this.props.stateList[0].value],
          selectedCityIdx: this.props.cityList[0].value
        })
        this.fetchRetailers(this.props.cityList[0].value)
      } else {
        this.setState({ 
          cityList: this.props.stateMap[parseInt(this.state.selectedStateIdx)]
        })
        this.fetchRetailers(this.state.selectedCityIdx)
      }
    }
  }

  fetchRetailers (cityId) {
    const payload = {
      limit: 1000,
      offset: 0,
      city_id: parseInt(cityId)
    }
    Api.fetchRetailers(payload)
      .then((response) => {
        const retailerData = response.retailer_data.map((retailer) => {
          return ({
            text: retailer.retailer_name,
            value: retailer.id
          })
        })
        if (location.pathname.includes("create")) {
          this.setState({
            retailerList: retailerData, 
            retailerId: retailerData[0].value
          })
        } else {
          this.setState({
            retailerList: retailerData
          })
        }
      })
      .catch((error) => {
        console.log("Error in fetching retailers", error)
      })
  }
  
  handleChange (e) {
    if (e.target.name.toString().includes("StateIdx")) {
      this.setState({
        cityList: this.state.stateMap[e.target.value],
        [e.target.name]: e.target.value
      })
      this.fetchRetailers(this.state.stateMap[e.target.value][0].value)
    } else if (e.target.name.toString().includes("CityIdx")) {
      this.setState({ [e.target.name]: e.target.value })
      this.fetchRetailers(e.target.value)
    } else {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  handleOptionalTextChange (e){
    this.setState({
      [e.target.name]: e.target.value,
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
    this.checkForm()
    if (!this.errorFlag) {

      this.props.handleSave ()
    }
  }

  checkForm () {
    this.errorFlag = false
    const formEl = document.getElementById('DMOForm')
    const inputCollection = formEl.getElementsByTagName('input')
    const inputsArr = Array.prototype.slice.call(inputCollection)
    const excludeValidation = ["GPS", "GST", "dailyTransactionLimit", "monthlyTransactionLimit", "limitPerTransaction"]  
    const textInputs = inputsArr.filter(item => item.type == 'text' && excludeValidation.indexOf() !== -1 )
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
    console.log("retailerId", this.state.retailerId)
    return (
      <div id="DMOForm">
        <Form layout="label-on-top">
          <Form.Select
            label="Merchant State*"
            value={this.state.selectedStateIdx}
            name="selectedStateIdx"
            disabled={location.pathname.includes("edit")}
            options={this.state.stateList}
            onChange={(e) => this.handleChange(e)}
          />

          <Form.Select
            label="Merchant City*"
            value={this.state.selectedCityIdx}
            name="selectedCityIdx"
            disabled={location.pathname.includes("edit")}
            options={this.state.cityList}
            onChange={(e) => this.handleChange(e)}
          />
          <Form.Select
            label="Retailer Name*"
            value={this.state.retailerId}
            name="retailerId"
            disabled={location.pathname.includes("edit")}
            options={this.state.retailerList}
            onChange={(e) => this.handleChange(e)}
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
                label="GPS"
                type="text"
                name="GPS"
                autoComplete="fefef"
                defaultValue={this.state.GPS}
                onChange={(e) => this.handleOptionalTextChange(e)}
              />
              <Form.TextInput
                label="GST"
                type="text"
                name="GST"
                autoComplete="fefef"
                defaultValue={this.state.GST}
                onChange={(e) => this.handleOptionalTextChange(e)}
              />
              
              <Form.TextInput
                label="Daily Transaction Limit"
                type="text"
                name="dailyTransactionLimit"
                autoComplete="fefef"
                defaultValue={this.state.dailyTransactionLimit}
                onChange={(e) => this.handleOptionalTextChange(e)}
              />

              <Form.TextInput
                label="Monthly Transaction Limit"
                type="text"
                name="monthlyTransactionLimit"
                autoComplete="fefef"
                defaultValue={this.state.monthlyTransactionLimit}
                onChange={(e) => this.handleOptionalTextChange(e)}
              />

              <Form.TextInput
                label="Limit Per Transaction"
                type="text"
                name="limitPerTransaction"
                autoComplete="fefef"
                defaultValue={this.state.limitPerTransaction}
                onChange={(e) => this.handleOptionalTextChange(e)}
              />
           
            <ButtonGroup align="right">
              <CustomButton
                text="Save"
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
  stateMap: PropTypes.object,
  data:PropTypes.object,
  disableSave: PropTypes.func
}

export default DMOForm
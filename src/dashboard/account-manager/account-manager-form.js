import React from "react"
import { Form, Checkbox } from '@auth0/cosmos'
import { ButtonGroup } from '@auth0/cosmos'
import { validateTextField, validateNumberField } from 'Utils/validators'
import { checkCtrlA, validateNumType, checkCtrlV } from 'Utils/logic-utils'
import CustomButton from 'Components/button'
import PropTypes from "prop-types"

class AccountManagerForm extends React.Component {
  constructor (props) {
    super(props)

    this.inputNameMap = {
      accountManagerName: 'Account Manager Name',
      mobile: 'Mobile Number'
    }

    this.state = {
      accountManagerName: this.props.data ? this.props.data.name : "",
      mobile: this.props.data ? this.props.data.mobile_number : "",
      selectedStatusIdx: this.props.data ? this.props.data.is_active ? "1" : "2" : "1",
      accountManagerNameErr: {
        status: false,
        value: ""
      },
      mobileErr: {
        status: false,
        value: ""
      }
    }

    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleSaveAccountManager = this.handleSaveAccountManager.bind(this)
  }

  handleSaveAccountManager (e) {
    e.preventDefault()
    this.checkForm()
    if (!this.errorFlag) {
      this.props.handleSave()
    }
  }

  checkForm () {
    this.errorFlag = false
    const formEl = document.getElementById('accountManagers')
    const inputCollection = formEl.getElementsByTagName('input')
    const inputsArr = Array.prototype.slice.call(inputCollection)

    const textInputs = inputsArr.filter(item => (item.type == 'text'))
    textInputs.forEach(item => {
      this.validate(item)
    })
  }

  validate (item) {
    const errName = `${item.name}Err`
    if (item.name === "mobile") {
      const error = validateNumberField({ fieldName: this.inputNameMap[item.name], fieldValue: item.value, length: this.length, checkLength: this.checkLength })
      if (error.status) {
        this.errorFlag = true
      }
      this.setState({
        [errName]: validateNumberField({ fieldName: this.inputNameMap[item.name], fieldValue: item.value, length: this.length, checkLength: this.checkLength }),
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

  getData () {
    return this.state;
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
    this.length = 10
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

  handleSelectChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {
    const { accountManagerNameErr, mobileErr } = this.state
    return (
      <div id="accountManagers" style={{ marginBottom: "20px" }}>
        <Form.TextInput
          //placeholder="Crystal Wines"
          label="Account Manager Name*"
          type="text"
          name="accountManagerName"
          autoComplete="fefef"
          disabled={location.pathname.includes("edit") || this.props.isSaved}
          value={this.state.accountManagerName}
          error={accountManagerNameErr.status ? accountManagerNameErr.value : ''}
          onChange={(e) => this.handleTextChange(e)}
        />

        <Form.TextInput
          label="Mobile Number*"
          type="text"
          name="mobile"
          defaultValue={this.state.mobile}
          disabled={location.pathname.includes("edit") || this.props.isSaved}
          autoComplete="fefef"
          error={mobileErr.status ? mobileErr.value : ''}
          onKeyDown={(e) => this.handleNumberChange(e)}
          onKeyUp={(e) => this.handleNumberChange(e)}
        />
        <Form.Select
          label="Status*"
          value={this.state.selectedStatusIdx}
          name="selectedStatusIdx"
          options={[
            { text: 'Active', value: '1' },
            { text: 'In Active', value: '2' },
          ]}
          onChange={(e) => this.handleSelectChange(e)}
        />
        <ButtonGroup>
          <CustomButton
            text="Save"
            handleClick={(e) => this.handleSaveAccountManager(e)}
            disableSave={this.props.isSaved}
          />
        </ButtonGroup>
      </div>
    )
  }
}

AccountManagerForm.propTypes = {
  handleSave: PropTypes.func,
  isSaved: PropTypes.bool,
  data: PropTypes.object
}

export default AccountManagerForm
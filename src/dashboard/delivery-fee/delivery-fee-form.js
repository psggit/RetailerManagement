
import React from "react"
import { Form, ButtonGroup } from "@auth0/cosmos"
import { validateTextField } from "Utils/validators"
import CustomButton from "Components/button"

class DeliveryFeeForm extends React.Component {
  constructor (props) {
    super(props)
    this.inputNameMap = {
      // retailerID: "Retailer ID",
      cartMin: "Cart Min",
      cartMax: "Cart Max",
      flatValue: "Flat value",
      percentageValue: "Percentage Value",
      feeMin: "Fee Min",
      feeMax: "Fee Max"
    }

    this.errorFlag = false,
    this.state = {
      retailerId: props.data ? props.data.retailer_id : '',
      cartMin: props.data ? props.data.cart_min : '',
      cartMax: props.data ? props.data.cart_max : '',
      flatValue: props.data ? props.data.flat_value : '',
      percentageValue: props.data ? props.data.percentage_value : '',
      feeMin: props.data ? props.data.fee_min : '',
      feeMax: props.data ? props.data.fee_max : '',

      cartMinErr: {
        value: '',
        status: false
      },
      cartMaxErr: {
        value: '',
        status: false
      },
      flatValueErr: {
        value: '',
        status: false
      },
      percentageValueErr: {
        value: '',
        status: false
      },
      feeMinErr: {
        value: '',
        status: false
      },
      feeMaxErr: {
        value: '',
        status: false
      },
    }

    this.handleTextChange = this.handleTextChange.bind(this)
    this.checkForm = this.checkForm.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.validate = this.validate.bind(this)
    this.getData = this.getData.bind(this)
  }

  handleTextChange (e) {
    const errName = `${e.target.name}Err`
    this.setState({
      [e.target.name]: e.target.value,
      [errName]: validateTextField(this.inputNameMap[e.target.name], e.target.value),
    })
  }

  getData () {
    return this.state
  }

  handleSave (e) {
    e.preventDefault()
    this.checkForm()
    if (!this.errorFlag) {
      console.log("state", this.state)
      this.props.handleSave ()
    }
  }

  checkForm () {
    this.errorFlag = false
    const formEl = document.getElementById('DeliveryFeeForm')
    const inputCollection = formEl.getElementsByTagName('input')
    const inputsArr = Array.prototype.slice.call(inputCollection)
    const textInputs = inputsArr.filter(item => item.type === 'text')
    textInputs.forEach(item => {
      this.validate(item)
    })
  }

  validate (item) {
    const errName = `${item.name}Err`
    const error = validateTextField(this.inputNameMap[item.name], item.value)
    if (error.status) {
      this.errorFlag = true
    }
    this.setState({
      [errName]: validateTextField(this.inputNameMap[item.name], item.value),
    })
  }

  render () {
    const {
      cartMaxErr,
      cartMinErr,
      percentageValueErr,
      flatValueErr,
      feeMinErr,
      feeMaxErr
    } = this.state
    console.log("retailerId", this.state.retailerId)
    return (
      <div id="DeliveryFeeForm">
        <Form layout="label-on-top">
          <Form.FieldSet label="Delivery Fee Detail">
            <Form.TextInput
              label="Cart Min*"
              type="text"
              name="cartMin"
              value={this.state.cartMin}
              error={cartMinErr.status ? cartMinErr.value : ''}
              onChange={(e) => this.handleTextChange(e)}
              autoComplete="fefef"
            />
            <Form.TextInput
              label="Cart Max*"
              type="text"
              name="cartMax"
              value={this.state.cartMax}
              error={cartMaxErr.status ? cartMaxErr.value : ''}
              onChange={(e) => this.handleTextChange(e)}
              autoComplete="fefef"
            />
            <Form.TextInput
              label="Flat Value*"
              type="text"
              name="flatValue"
              value={this.state.flatValue}
              error={flatValueErr.status ? flatValueErr.value : ''}
              onChange={(e) => this.handleTextChange(e)}
              autoComplete="fefef"
            />
            <Form.TextInput
              label="Percentage Value*"
              type="text"
              name="percentageValue"
              value={this.state.percentageValue}
              error={percentageValueErr.status ? percentageValueErr.value : ''}
              onChange={(e) => this.handleTextChange(e)}
              autoComplete="fefef"
            />
            <Form.TextInput
              label="Fee Min*"
              type="text"
              name="feeMin"
              value={this.state.feeMin}
              error={feeMinErr.status ? feeMinErr.value : ''}
              onChange={(e) => this.handleTextChange(e)}
              autoComplete="fefef"
            />
            <Form.TextInput
              label="Fee max*"
              type="text"
              name="feeMax"
              value={this.state.feeMax}
              autoComplete="fefef"
              error={feeMaxErr.status ? feeMaxErr.value : ''}
              onChange={(e) => this.handleTextChange(e)}
            />

            <ButtonGroup align="right">
              <CustomButton
                text="Save"
                handleClick={this.handleSave}
                disableSave={this.props.disableSave}
              />
            </ButtonGroup>
          </Form.FieldSet>
        </Form>
      </div>
    )
  }
}

export default DeliveryFeeForm

/* eslint-disable no-undef */
import React from 'react'
import Layout from 'Components/layout'
import Card from 'Components/card'
import DeliveryFeeForm from "./delivery-fee-form"
import * as Api from './../../api'
import Notify from "Components/notify"

class CreateDeliveryFee extends React.Component {
  constructor () {
    super()
    this.state = {
      creatingDeliveryFee: false,
    }
    this.handleSave = this.handleSave.bind(this)
    this.createDeliveryFee = this.createDeliveryFee.bind(this)
  }

  handleSave () {
    const deliveryDataForm = this.deliveryFeeForm.getData()
    const payload = {
      retailer_id: parseInt(this.props.match.params.retailerId),
      cart_min: parseFloat(deliveryDataForm.cartMin),
      cart_max: parseFloat(deliveryDataForm.cartMax),
      flat_value: parseFloat(deliveryDataForm.flatValue),
      percentage_value: parseFloat(deliveryDataForm.percentageValue),
      fee_min: parseFloat(deliveryDataForm.feeMin),
      fee_max: parseFloat(deliveryDataForm.feeMax)
    }
    this.setState({ creatingDeliveryFee: true })
    this.createDeliveryFee(payload)
  }

  createDeliveryFee (payload) {
    Api.createDeliveryFee(payload)
      .then((response) => {
        this.setState({ creatingDeliveryFee: false })
        Notify("success", response.Message)
        location.href = `/admin/delivery-fee/${this.props.match.params.retailerId}`
      })
      .catch((error) => {
        this.setState({ creatingDeliveryFee: false })
        error.response.json().then(json => { Notify("danger", json.Message) })
      })
  }

  render () {
    return (
      <Layout title="Create Delivery Fee">
        <Card width="800px">
          <DeliveryFeeForm
            ref={(node) => { this.deliveryFeeForm = node }}
            handleSave={this.handleSave}
          />
        </Card>
      </Layout>
    )
  }
}

export default CreateDeliveryFee

import React from 'react'
import Layout from 'Components/layout'
import DeliveryFeeForm from "./delivery-fee-form"
import Card from 'Components/card'
import * as Api from './../../api'
import Notify from "Components/notify"

class EditDeliveryFee extends React.Component {
  constructor () {
    super()
    this.state = {
      updatingDeliveryFee: false,
    }
    this.handleSave = this.handleSave.bind(this)
    this.updateDeliveryFees = this.updateDeliveryFees.bind(this)  
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
      fee_max: parseFloat(deliveryDataForm.feeMax),
      id: parseInt(this.props.history.location.state.id),
      start_time: deliveryDataForm.startTime + ":00+05:30",
      end_time: deliveryDataForm.endTime + ":00+05:30",
    }
    this.setState({ updatingDeliveryFee: true })
    this.updateDeliveryFees(payload)
  }

  updateDeliveryFees (payload) {
    Api.updateDeliveryFee(payload)
      .then((response) => {
        this.setState({ updatingDeliveryFee: false })
        Notify("success", response.Message)
        location.href = `/admin/delivery-fee/${this.props.match.params.retailerId}`
      })
      .catch((error) => {
        this.setState({ updatingDeliveryFee: false })
        error.response.json().then(json => { Notify("danger", json.Message) })
      })
  }

  render () {
    return (
      <Layout title="Edit Delivery Fee">
        <Card width="800px">
          <DeliveryFeeForm
            ref={(node) => { this.deliveryFeeForm = node }}
            data={this.props.history.location.state}
            handleSave={this.handleSave}
          />
        </Card>
      </Layout>
    )
  }
}

export default EditDeliveryFee
import React from 'react'
import Layout from 'Components/layout'
import Card from 'Components/card'
import DMOForm from './dmo-form'
import * as Api from './../../api'

class CreateDMO extends React.Component {
  constructor () {
    super()
    this.state = {
      creatingDMO: false
    }
    this.handleSave = this.handleSave.bind(this)
  }

 handleSave () {
    const DMODataForm = this.DMODetailsForm.getData()
    const payload = {
      retailer_id: DMODataForm.retailerId,
      merchant_business_name: DMODataForm.merchantBusinessName,
      merchant_legal_name: DMODataForm.merchantLegalName,
      merchant_category_code: DMODataForm.merchantCategoryCode,
      pan:DMODataForm.PAN,
      merchant_type: DMODataForm.merchantType,
      merchant_address:DMODataForm.merchantAddress,
      merchant_state:DMODataForm.merchantState,
      merchant_city:DMODataForm.merchantCity,
      merchant_pin:DMODataForm.merchantPIN,
      parent_merchant_id:DMODataForm.parentMerchantId,
      account_number:DMODataForm.accountNumber,
      ifsc_code:DMODataForm.IFSC,
      mobile_number:DMODataForm.mobileNo,
      email:DMODataForm.email,
      bank_name:DMODataForm.bankName,
      gps:DMODataForm.GPS,
      gst:DMODataForm.GST,
      daily_transaction_limit:DMODataForm.dailyTransactionLimit,
      monthly_transaction_limit:DMODataForm.monthlyTransactionLimit,
      limit_per_transaction:DMODataForm.limitPerTransaction
    }
    this.setState({ creatingDMO: true })
    this.createDMO(payload)
  }

  CreateDMO (payload) {
    Api.createDMO(payload)
      .then((response) => {
        this.setState({ creatingDMO: false })
        console.log("Creating dmo", response)
      })
      .catch((error) => {
        this.setState({ creatingDMO: false })
        console.log("Error in creating dmo", error)
      })
  }

  render () {
    return (
      <Layout title="Create DMO">
        <Card width="800px">
          <DMOForm
            ref={(node) => { this.DMODetailsForm = node }}
            handleSave={this.handleSave}
            disableSave={this.state.creatingDMO}
          />
        </Card>
      </Layout>
    )
  }
}

export default CreateDMO

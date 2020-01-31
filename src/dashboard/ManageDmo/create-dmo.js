import React from 'react'
import Layout from 'Components/layout'
import Card from 'Components/card'
import DMOForm from './dmo-form'
import * as Api from './../../api'
import 'Sass/animations.scss'
//import { formatStateAndCityList, formatStateAndOrganizationList } from 'Utils/response-format-utils'

class CreateDMO extends React.Component {
  constructor () {
    super()
    this.state = {
      creatingDMO: false,
      isFormValid: true,
    }
    this.handleSave = this.handleSave.bind(this)
    //this.createDMO = this.createDMO.bind(this)
    this.successCallback = this.successCallback.bind(this)
    this.failureCallback = this.failureCallback.bind(this)
    this.updateState = this.updateState.bind(this)
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
    this.createDMO(payload, this.successCallback, this.failureCallback)
  }

  successCallback () {
    this.updateState()
    location.href = '/admin/dmo'
  }

  failureCallback () {
    this.updateState()
  }

  updateState () {
    this.setState({ creatingDMO: false })
  }

  CreateDMO (payload, successCallback, failureCallback) {
    // eslint-disable-next-line no-undef
    Api.createDMO(payload, successCallback, failureCallback)
  }

  render () {
    return (
      <Layout title="Create DMO">
        <Card width="800px" className={!this.state.isFormValid ? 'animated shake' : ''}>
          <DMOForm
            ref={(node) => { this.DMODetailsForm = node }}
            OnSaveClick={this.handleSave}
            handleSave={this.handleSave}
            disableSave={this.state.creatingDMO}
          />
        </Card>
      </Layout>
    )
  }
}

export default CreateDMO

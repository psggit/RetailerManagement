import React from 'react'
import Layout from 'Components/layout'
import DMOForm from './dmo-form'
import Card from 'Components/card'
import * as Api from './../../api'
import 'Sass/animations.scss'
//import { formatStateAndCityList, formatStateAndOrganizationList } from 'Utils/response-format-utils'

class EditDMO extends React.Component {
  constructor () {
    super()
    this.state = {
      updatingDMO: false,
      isFormValid: true,
    }
    this.handleSave = this.handleSave.bind(this)
    this.updateDMO = this.updateDMO.bind(this)
    this.successCallback = this.successCallback.bind(this)
    this.failureCallback = this.failureCallback.bind(this)
    this.updateState = this.updateState.bind(this)
    this.formIsValid = this.formIsValid.bind(this)
  }

  formIsValid () {
    const DMODataForm = this.DMODetailsForm.getData()
    const { retailerIdErr,
      merchantBusinessNameErr,
      merchantLegalNameErr,
      PANErr,
      merchantAddressErr,
      merchantPINErr,
      parentMerchantIdErr,
      accountNumberErr,
      IFSCErr,
      mobileNoErr,
      emailErr,
      GPSErr,
      GSTErr
    } = DMODataForm

    const formData = {
      retailerIdErr,
      merchantBusinessNameErr,
      merchantLegalNameErr,
      PANErr,
      merchantAddressErr,
      merchantPINErr,
      parentMerchantIdErr,
      accountNumberErr,
      IFSCErr,
      mobileNoErr,
      emailErr,
      GPSErr,
      GSTErr
    }

    for (const key in formData) {
      if (formData[key].status && formData[key].value.toString().length === 0) {
        return false
      }
    }

    return true
  }

  handleSave () {
    const DMODataForm = this.DMODetailsForm.getData()
    this.setState({ isFormValid: this.formIsValid() })
    if (this.formIsValid()) {
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
      this.setState({ updatingDMO: true })
      this.updateDMO(payload, this.successCallback, this.failureCallback)
    }
  }

  updateDMO (payload, successCallback, failureCallback) {
    Api.updateDMOr(payload, successCallback, failureCallback)
  }

  successCallback () {
    this.updateState()
    location.href = '/admin/dmo'
  }

  failureCallback () {
    this.updateState()
  }

  updateState () {
    this.setState({ updatingDMO: false })
  }

  render () {
    return (
      <Layout title="Edit DMO">
        <Card width="800px" className={!this.state.isFormValid ? 'animated shake' : ''}>
          <DMOForm
            ref={(node) => { this.dmoDetailsForm = node }}
            // eslint-disable-next-line react/prop-types
            data={this.props.history.location.state}
            handleSave={this.handleSave}
            disableSave={this.state.updatingDMO}
          />
        </Card>
      </Layout>
    )
  }
}

export default EditDMO
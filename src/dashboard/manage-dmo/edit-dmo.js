/* eslint-disable react/prop-types */
import React from 'react'
import Layout from 'Components/layout'
import DMOForm from './dmo-form'
import Card from 'Components/card'
import * as Api from './../../api'
import 'Sass/animations.scss'
import { formatStateAndCityList } from 'Utils/response-format-utils'

class EditDMO extends React.Component {
  constructor () {
    super()
    this.state = {
      updatingDMO: false,
      isFormValid: true,
      stateList: [],
      cityList: [],
      stateMap: {}
    }
    this.handleSave = this.handleSave.bind(this)
    this.updateDMO = this.updateDMO.bind(this)
    this.formIsValid = this.formIsValid.bind(this)
  }

  componentDidMount () {
    this.fetchStateAndCityList({}, this.formatResponse)
  }

  fetchStateAndCityList (payload, stateListSuccessCallback) {
    Api.fetchStateAndCityList(payload, stateListSuccessCallback)
  }

  formatResponse (data) {
    const { stateList, cityList, stateMap } = formatStateAndCityList(data.states)
    this.setState({ stateList, cityList, stateMap })
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
      id: parseInt(this.props.location.state.id),
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
      merchant_latlng:DMODataForm.GPS,
      gst:DMODataForm.GST,
      daily_transaction_limit:DMODataForm.dailyTransactionLimit,
      monthly_transaction_limit:DMODataForm.monthlyTransactionLimit,
      limit_per_transaction:DMODataForm.limitPerTransaction,
      virtual_address:DMODataForm.virtual_address      
      }
      this.setState({ updatingDMO: true })
      this.updateDMO(payload)
    }
  }

  UpdateDMO (payload) {
    Api.updateDMO(payload)
      .then((response) => {
        this.setState({ updatingDMO: false })
        console.log("Updating dmo", response)
      })
      .catch((error) => {
        this.setState({ updatingDMO: false })
        console.log("Error in updating dmo", error)
      })
  }

  render () {
    return (
      <Layout title="Edit DMO">
        <Card width="800px" className={!this.state.isFormValid ? 'animated shake' : ''}>
          <DMOForm
            ref={(node) => { this.dmoDetailsForm = node }}
            // eslint-disable-next-line react/prop-types
            data={this.props.history.location.state}
            // eslint-disable-next-line no-undef
            stateList={stateList}
            // eslint-disable-next-line no-undef
            cityList={cityList}
            stateMap={this.state.stateMap}
            handleSave={this.handleSave}
            disableSave={this.state.updatingDMO}
          />
        </Card>
      </Layout>
    )
  }
}

export default EditDMO
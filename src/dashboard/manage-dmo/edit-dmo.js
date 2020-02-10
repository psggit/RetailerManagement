import React from 'react'
import Layout from 'Components/layout'
import DMOForm from './dmo-form'
import Card from 'Components/card'
import * as Api from './../../api'
import Notify from "Components/notify"
import { formatStateAndCityList } from 'Utils/response-format-utils'
import PropTypes from "prop-types"

class EditDMO extends React.Component {
  constructor () {
    super()
    this.state = {
      updatingDMO: false,
      stateList: [],
      cityList: [],
      stateMap: {}
    }
    this.handleSave = this.handleSave.bind(this)
    this.updateDMO = this.updateDMO.bind(this)
    this.formIsValid = this.formIsValid.bind(this)
    this.fetchStateAndCityList = this.fetchStateAndCityList.bind(this)
    this.formatResponse = this.formatResponse.bind(this)
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
    } = DMODataForm

    const formData = {
      merchantBusinessNameErr,
      merchantLegalNameErr,
      PANErr,
      merchantAddressErr,
      merchantPINErr,
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
    if (this.formIsValid()) {
      const payload = {
        retailer_id: DMODataForm.retailerId.toString(),
        merchant_business_name: DMODataForm.merchantBusinessName,
        merchant_legal_name: DMODataForm.merchantLegalName,
        pan: DMODataForm.PAN,
        merchant_type: DMODataForm.merchantType,
        merchant_address: DMODataForm.merchantAddress,
        merchant_state: DMODataForm.selectedStateIdx.toString(),
        merchant_city: DMODataForm.selectedCityIdx.toString(),
        merchant_pin: DMODataForm.merchantPIN,
        account_no: DMODataForm.accountNumber,
        ifsc_code: DMODataForm.IFSC,
        mobile_no: DMODataForm.mobileNo,
        email_id: DMODataForm.email,
        bank_name: DMODataForm.bankName,
        merchant_latlng: DMODataForm.GPS,
        gst_no: DMODataForm.GST,
        daily_txn_limit: DMODataForm.dailyTransactionLimit,
        monthly_txn_limit: DMODataForm.monthlyTransactionLimit,
        limit_per_txn: DMODataForm.limitPerTransaction,
        eazypay_id: this.props.history.location.state.eazypay_id,
        virtual_address: this.props.history.location.state.virtual_address,     
      }
      this.setState({ updatingDMO: true })
      this.updateDMO(payload)
    }
  }

  updateDMO (payload) {
    Api.updateDMO(payload)
      .then((response) => {
        this.setState({ updatingDMO: false })
        Notify("success", response.message)
        location.href = '/admin/dmo'
      })
      .catch((error) => {
        this.setState({ updatingDMO: false })
        error.response.json().then(json => { Notify("danger", json.message) })
      })
  }

  render () {
    return (
      <Layout title="Edit DMO">
        <Card width="800px">
          <DMOForm
            ref={(node) => { this.DMODetailsForm = node }}
            data={this.props.history.location.state}
            stateList={this.state.stateList}
            cityList={this.state.cityList}
            stateMap={this.state.stateMap}
            handleSave={this.handleSave}
            disableSave={this.state.updatingDMO}
          />
        </Card>
      </Layout>
    )
  }
}

EditDMO.propTypes = {
  history: PropTypes.object
}

export default EditDMO
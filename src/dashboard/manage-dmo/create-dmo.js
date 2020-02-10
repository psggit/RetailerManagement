/* eslint-disable no-undef */
import React from 'react'
import Layout from 'Components/layout'
import Card from 'Components/card'
import DMOForm from './dmo-form'
import * as Api from './../../api'
import Notify from "Components/notify"
import { formatStateAndCityList } from 'Utils/response-format-utils'

class CreateDMO extends React.Component {
  constructor () {
    super()
    this.state = {
      creatingDMO: false,
      stateList: [],
      cityList: [],
      stateMap: {}
    }
    this.handleSave = this.handleSave.bind(this)
    this.createDMO = this.createDMO.bind(this)
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
    const { stateList, cityList, stateMap } = formatStateAndCityList (data.states)
    this.setState({ stateList, cityList, stateMap })
  }

 handleSave () {
    const DMODataForm = this.DMODetailsForm.getData()
    const payload = {
      retailer_id: DMODataForm.retailerId.toString(),
      merchant_business_name: DMODataForm.merchantBusinessName,
      merchant_legal_name: DMODataForm.merchantLegalName,
      pan:DMODataForm.PAN,
      merchant_type: DMODataForm.merchantType,
      merchant_address:DMODataForm.merchantAddress,
      merchant_state:DMODataForm.selectedStateIdx.toString(),
      merchant_city:DMODataForm.selectedCityIdx.toString(),
      merchant_pin:DMODataForm.merchantPIN,
      account_no:DMODataForm.accountNumber,
      ifsc_code:DMODataForm.IFSC,
      mobile_no:DMODataForm.mobileNo,
      email_id:DMODataForm.email,
      bank_name:DMODataForm.bankName,
      merchant_latlng:DMODataForm.GPS,
      gst_no:DMODataForm.GST,
      daily_txn_limit:DMODataForm.dailyTransactionLimit,
      monthly_txn_limit:DMODataForm.monthlyTransactionLimit,
      limit_per_txn:DMODataForm.limitPerTransaction
    }
    this.setState({ creatingDMO: true })
    this.createDMO(payload)
  }

  createDMO (payload) {
    Api.createDMO(payload)
      .then((response) => {
        this.setState({ creatingDMO: false })
        Notify("success", response.message)
        location.href = '/admin/dmo'
      })
      .catch((error) => {
        this.setState({ creatingDMO: false })
        error.response.json().then(json => { Notify("danger", json.message) })
      })
  }

  render () {
    return (
      <Layout title="Create DMO">
        <Card width="800px">
          <DMOForm
            ref={(node) => { this.DMODetailsForm = node }}
            handleSave={this.handleSave}
            stateList={this.state.stateList}
            cityList={this.state.cityList}
            stateMap={this.state.stateMap}
            disableSave={this.state.creatingDMO}
          />
        </Card>
      </Layout>
    )
  }
}

export default CreateDMO

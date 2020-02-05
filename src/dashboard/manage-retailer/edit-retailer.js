import React from 'react'
import Layout from 'Components/layout'
import RetailerForm from './retailer-form'
import Card from 'Components/card'
import * as Api from './../../api'
import 'Sass/animations.scss'
import { formatStateAndCityList, formatStateAndOrganizationList } from 'Utils/response-format-utils'

class EditRetailer extends React.Component {
  constructor() {
    super()
    this.state = {
      updatingRetailer: false,
      isFormValid: true,
      organizationList: [],
      stateList: [],
      stateMap: {},
      cityList: [],
      organizationMap: {}
    }
    this.handleSave = this.handleSave.bind(this)
    this.updateRetailer = this.updateRetailer.bind(this)
    this.successCallback = this.successCallback.bind(this)
    this.failureCallback = this.failureCallback.bind(this)
    this.updateState = this.updateState.bind(this)
    this.formIsValid = this.formIsValid.bind(this)
    this.fetchOrganizationAndStateList = this.fetchOrganizationAndStateList.bind(this)
    this.formatOrganizationList = this.formatOrganizationList.bind(this)
    this.fetchStateAndCityList = this.fetchStateAndCityList.bind(this)
    this.formatResponse = this.formatResponse.bind(this)
  }

  componentDidMount() {
    this.fetchStateAndCityList({}, this.formatResponse)
    this.fetchOrganizationAndStateList({}, this.formatOrganizationList)
  }

  fetchOrganizationAndStateList(payloadObj, organizationListSuccessCallback) {
    Api.fetchOrganizationAndStateList(payloadObj, organizationListSuccessCallback)
  }

  formatOrganizationList(data) {
    const { organizationList, organizationMap } = formatStateAndOrganizationList(data.details)
    this.setState({ organizationList, organizationMap })
  }

  fetchStateAndCityList(payload, stateListSuccessCallback) {
    Api.fetchStateAndCityList(payload, stateListSuccessCallback)
  }

  formatResponse(data) {
    const { stateList, cityList, stateMap } = formatStateAndCityList(data.states)
    this.setState({ stateList, cityList, stateMap })
  }

  formIsValid() {
    const retailerDataForm = this.retailerDetailsForm.getData()
    const { storeCodeErr,
      outletNameErr,
      exciseLicenceNoErr,
      discountPercentErr,
      serviceChargePercentErr,
      deliveryDiscountPercentErr,
      FSSAINumberErr,
      bankNameErr,
      accountHolderNameErr,
      accountNumberErr,
      branchErr,
      IFSCErr,
      outletAddressErr,
      pincodeErr,
      landlineNoErr,
      mobileNoErr,
      emailErr,
      gpsCoordinatesErr
    } = retailerDataForm

    const formData = {
      storeCodeErr,
      outletNameErr,
      exciseLicenceNoErr,
      discountPercentErr,
      serviceChargePercentErr,
      deliveryDiscountPercentErr,
      FSSAINumberErr,
      bankNameErr,
      accountHolderNameErr,
      accountNumberErr,
      branchErr,
      IFSCErr,
      outletAddressErr,
      pincodeErr,
      landlineNoErr,
      mobileNoErr,
      emailErr,
      gpsCoordinatesErr
    }

    for (const key in formData) {
      if (formData[key].status && formData[key].value.toString().length === 0) {
        return false
      }
    }

    return true
  }

  handleSave () {
    const retailerDataForm = this.retailerDetailsForm.getData()
    this.setState({ isFormValid: this.formIsValid() })
    if (this.formIsValid()) {
      const payload = {
        id: parseInt(this.props.location.state.id),
        organisation_id: retailerDataForm.selectedOrganizationIdx,
        ksbcl_code: retailerDataForm.storeCode,
        outlet_name: retailerDataForm.outletName,
        excise_licence_number: retailerDataForm.exciseLicenceNo,
        discount_percent: retailerDataForm.discountPercent,
        delivery_discount_percent: retailerDataForm.deliveryDiscountPercent,
        service_charge_percent: retailerDataForm.serviceChargePercent,
        kyc_status: retailerDataForm.selectedKycIdx === "1" ? "true" : "false",
        branch_status: retailerDataForm.selectedOutletStatusIdx === "1" ? "true" : "false",
        fssai_no: retailerDataForm.FSSAINumber,
        city_id: retailerDataForm.selectedCityIdx,
        state_id: retailerDataForm.selectedStateIdx,
        pincode: retailerDataForm.pincode,
        store_address: retailerDataForm.outletAddress,
        landline_number: retailerDataForm.landlineNo,
        mobile_number: retailerDataForm.mobileNo,
        email: retailerDataForm.email,
        gps_cordinates: retailerDataForm.gpsCoordinates,
        bank_name: retailerDataForm.bankName,
        acc_holder_name: retailerDataForm.accountHolderName,
        account_number: retailerDataForm.accountNumber,
        bank_branch: retailerDataForm.branch,
        acc_type: retailerDataForm.accountType,
        ifsc_code: retailerDataForm.IFSC,
        is_cancelled_cheque: retailerDataForm.cancelledCheck,
        is_excise_license: retailerDataForm.exciseLicense,
        is_photo_of_outlet: retailerDataForm.outletPhoto,
        hbwallet_enabled: retailerDataForm.isHipbarWalletEnabled,
        gift_wallet_enabled: retailerDataForm.isGiftWalletEnabled,
        upi_enabled: retailerDataForm.isUpiEnabled,
        catalog_enabled: retailerDataForm.catalogEnabled,
        inventory_enabled: retailerDataForm.inventoryEnabled,
        recommended_retailer: retailerDataForm.hbRecommended,
        // is_hipbar_wallet_enabled: retailerDataForm.isHipbarWalletEnabled,
        // is_gift_wallet_enabled: retailerDataForm.isGiftWalletEnabled,
        // is_upi_enabled: retailerDataForm.isUpiEnabled,
        // store_type: retailerDataForm.customerFilterTag,
        // upi_store_type: retailerDataForm.selectedUpiStoreTypeIdx === "1" ? "P2PM" : "P2M"
      }
      this.setState({ updatingRetailer: true })
      this.updateRetailer(payload, this.successCallback, this.failureCallback)
    }
  }

  updateRetailer(payload, successCallback, failureCallback) {
    Api.updateRetailer(payload, successCallback, failureCallback)
  }

  successCallback() {
    this.updateState()
    location.href = '/admin/retailer'
  }

  failureCallback() {
    this.updateState()
  }

  updateState() {
    this.setState({ updatingRetailer: false })
  }

  render() {
    return (
      <Layout title="Edit Retailer">
        <Card width="800px" className={!this.state.isFormValid ? 'animated shake' : ''}>
          <RetailerForm
            ref={(node) => { this.retailerDetailsForm = node }}
            data={this.props.history.location.state}
            organizationList={this.state.organizationList}
            stateList={this.state.stateList}
            organizationMap={this.state.organizationMap}
            stateMap={this.state.stateMap}
            cityList={this.state.cityList}
            handleSave={this.handleSave}
            disableSave={this.state.updatingRetailer}
          />
        </Card>
      </Layout>
    )
  }
}

export default EditRetailer
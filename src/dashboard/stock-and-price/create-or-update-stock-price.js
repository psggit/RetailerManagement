import React from "react"
import { Form, TextInput } from '@auth0/cosmos'
import * as Api from './../../api'
import Layout from 'Components/layout'
import Card from 'Components/card'
import CustomButton from 'Components/button'
import {stockData} from "./../../mockData"
import StockList from "./stock-list"

class CreateOrUpdateStockPrice extends React.Component {
  constructor() {
    super()

    this.state = {
      retailerData: [],
      retailerList: [],
      loadingRetailerData: true,
      selectedRetailerIdx: 0,
      stateId: 0,
      stockList: [],
      stockMap: {},
      loadingStockList: true,
      isSavingDetails: false
    }

    this.fetchRetailerList = this.fetchRetailerList.bind(this)
    this.fetchStockList = this.fetchStockList.bind(this)
    this.successRetailerListCallback = this.successRetailerListCallback.bind(this)
    this.failureRetailerListCallback = this.failureRetailerListCallback.bind(this)
    this.successSkuLListCallback = this.successSkuLListCallback.bind(this)
    this.failureSkuListCallback = this.failureSkuListCallback.bind(this)
    this.createOrUpdateStockAndPrice = this.createOrUpdateStockAndPrice.bind(this)
  }

  componentDidMount() {
    this.fetchRetailerList({
			limit: 10000,
			offset: 0
		}, this.successRetailerListCallback, this.failureRetailerListCallback)
  }

  fetchRetailerList(payloadObj, successCallback, failureCallback) {
		Api.fetchRetailerList(payloadObj, successCallback, failureCallback)
  }
  
  handleChange(e) {
    console.log("data", this.state.retailerMap[e.target.value])
    this.setState({
      [e.target.name]: e.target.value,
      stateId: this.state.retailerMap[e.target.value].state_id
    })
  }

  successRetailerListCallback(response) {
    console.log("success", response)
    let retailerMap = {}
    const retailerList = response.ret_response.map((item) => {
      retailerMap[item.id] = item
      return {
        text: item.outlet_name,
        value: item.id
      }
    })
    this.setState({
      retailerData: response.ret_response, 
      loadingRetailerData: false,
      retailerList,
      retailerMap,
      selectedRetailerIdx: response.ret_response[0].id,
      stateId: response.ret_response[0].state_id
    })
  }

  failureRetailerListCallback() {
    console.log("failure")
    this.setState({retailerData: [], loadingRetailerData: false, retailerMap: {}})
  }

  fetchStockList(e) {
    e.preventDefault()
    console.log("fetch stock list", this.state)
    this.setState({loadingStockList: true})
    const payloadObj = {
      retailer_id: this.state.retailer_id,
      state_id: this.state.state_id
    }
    //Api.fetchSkuList(payloadObj, this.successSkuLListCallback, this.failureSkuListCallback)
    this.successSkuLListCallback()
  }

  successSkuLListCallback(response) {
    console.log("stock data", stockData)
    const stockMap = {}
    stockData.map((item) => {
      stockMap[item.sku_pricing_id] = Object.assign({}, item, {price: item.price ? item.price : 0, is_modified: false})
    })
    this.setState({
      stockList: stockData, loadingStockList: false, stockMap
    })
  }

  failureSkuListCallback() {
    this.setState({stockList: [], loadingStockList: false, stockMap: {}})
  }

  createOrUpdateStockAndPrice(stockList) {
    console.log("create or update stock and price", stockList)
    this.setState({isSavingDetails: false})
  }

  render() {
    return (
      <Layout title="Stock and Price Update">
      	<Card width="500px">
          <div>
            <Form layout="label-on-top">
              <Form.FieldSet label="Retailer Details">
                <Form.Select
                  label="Retailer*"
                  value={this.state.selectedRetailerIdx}
                  name="selectedRetailerIdx"
                  options={this.state.retailerList}
                  onChange={(e) => this.handleChange(e)}
                />
              </Form.FieldSet>
              <CustomButton
								text="Fetch Stock List"
								handleClick={this.fetchStockList}
								disableSave={this.state.loadingRetailerData}
							/>
            </Form>
          </div>
        </Card>
        {
          !this.state.loadingStockList &&
          <React.Fragment>
            <StockList 
              stockData={this.state.stockList}
              stockMap={this.state.stockMap}
              loadingStockList={this.state.loadingStockList}
              isSavingDetails={this.state.isSavingDetails}
              createOrUpdateStockAndPrice={this.createOrUpdateStockAndPrice}
            />
          </React.Fragment>
        }
      </Layout>
    )
  }
}

export default CreateOrUpdateStockPrice
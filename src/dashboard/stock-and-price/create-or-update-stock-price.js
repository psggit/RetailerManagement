import React from "react"
import { Form, TextInput } from '@auth0/cosmos'
import * as Api from './../../api'
import Layout from 'Components/layout'
import Card from 'Components/card'
import CustomButton from 'Components/button'
import {mockSkuList} from "./../../mockData"
import StockList from "./state-stock-list"

class CreateOrUpdateStockPrice extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // retailerData: [],
      // retailerList: [],
      // loadingRetailerData: true,
      // selectedRetailerIdx: 0,
      // stateId: 0,
      // stockList: [],
      // stockMap: {},
      // loadingStockList: true,
      loadingGenreList: true,
      genreList: [],
      genreCount: 0,
      selectedGenreIdx: 0,
      loadingSkuList: true,
      skuList: [],
      skuMap: {},
      skuCount: 0,
      isSavingDetails: false,
      stateId: props.location.state.state_id
    }

    this.fetchGenreList = this.fetchGenreList.bind(this)
    this.fetchSkuList = this.fetchSkuList.bind(this)
    this.createOrUpdateStockAndPrice = this.createOrUpdateStockAndPrice.bind(this)
    this.successGenreListCallback = this.successGenreListCallback.bind(this)
    //this.failureGenreListCallback = this.failureGenreListCallback.bind(this)
    // this.successSkuListCallback = this.successSkuListCallback.bind(this)
    // this.failureSkuListCallback = this.failureSkuListCallback.bind(this)
    this.successCreateOrUpdateStockPriceCallback = this.successCreateOrUpdateStockPriceCallback.bind(this)
  }

  componentDidMount() {
    console.log("props", this.props)
    this.fetchGenreList({}, this.successGenreListCallback)
  }

  fetchGenreList(payloadObj, successCallback) {
    Api.fetchGenreList(payloadObj, successCallback)
  }

  successGenreListCallback(genres) {
    const genreList = genres.map((item, i) => {
      return {
        text: item.genre_name,
        value: item.id
      }
    })
    // console.log("genre list", genreList, genres)
    this.setState({
      genreList, 
      selectedGenreIdx: genres[0].id,
      loadingGenreList: false
    })
  }

  handleChange(e) {
    //console.log("data", this.state.retailerMap[e.target.value])
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  fetchSkuList(e) {
    e.preventDefault()
    this.setState({loadingSkuList: true})
    const payloadObj = {
      genre_id: this.state.selectedGenreIdx,
      state_id: this.state.stateId
    }
    //this.fetchSkuListApi(payloadObj, this.successSkuListCallback, this.failureSkuListCallback)
    this.successSkuListCallback(mockSkuList)
  }

  fetchSkuListApi(payloadObj, successSkuListCallback) {
    //Api.fetchSkuList(payloadObj, successSkuListCallback, failureSkuListCallback)
    this.successSkuListCallback(mockSkuList)
  }

  successSkuListCallback(response) {
    // console.log("stock data", mockSkuList)
    const skuList = mockSkuList
    let stockMap = {}, stockList = []
    stockList = skuList.map((item) => {
      stockMap[item.sku_pricing_id] = Object.assign({}, item, {price: item.price ? item.price : 0, stock: 0, retailer_id: this.props.location.state.id, version: 0})
      return Object.assign({}, item, {price: item.price ? item.price : 0, stock: 0, retailer_id: this.props.location.state.id, version: 0})
    })
    // console.log("list and map", stockList, stockMap)
    this.setState({
      skuList: stockList, loadingSkuList: false, skuMap: stockMap
    })
  }

  createOrUpdateStockAndPrice(stockList) {
    // console.log("create or update stock and price", stockList)
    this.setState({isSavingDetails: true})
    const payload = {
      inventories: stockList
    }
    // console.log("payload", payload)
    this.createOrUpdateStockPriceApi(payload, this.successCreateOrUpdateStockPriceCallback)
  }

  createOrUpdateStockPriceApi(payloadObj, successCallback) {
    Api.createOrUpdateStockPrice(payloadObj, successCallback)
  }

  successCreateOrUpdateStockPriceCallback() {
    this.setState({isSavingDetails: false})
    const payloadObj = {
      retailer_id: this.state.retailer_id,
      state_id: this.state.state_id
    }
    this.fetchSkuListApi(payloadObj, this.successSkuLListCallback)
  }

  render() {
    return (
      <Layout title="Create Stock and Price">
      	<Card width="500px">
          <div>
            <Form layout="label-on-top">
              <Form.FieldSet label="StockList">
                <Form.Select
                  label="Genre*"
                  value={this.state.selectedGenreIdx}
                  name="selectedGenreIdx"
                  options={this.state.genreList}
                  onChange={(e) => this.handleChange(e)}
                />
              </Form.FieldSet>
              <CustomButton
								text="Fetch Stock List"
								handleClick={this.fetchSkuList}
								disableSave={this.state.loadingGenreList}
							/>
            </Form>
          </div>
        </Card>
        {
          !this.state.loadingSkuList &&
          <React.Fragment>
            <StockList 
              stockData={this.state.skuList}
              stockMap={this.state.skuMap}
              loadingStockList={this.state.loadingSkuList}
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
import React from "react"
import Layout from "Components/layout"
import "Sass/style.scss"
import CustomButton from 'Components/button'
import * as Api from './../../api'

class StockSummary extends React.Component {
  constructor() {
    super()

    this.state = {
      modifiedStockList: [],
      creatingInventory: false
    }

    this.createOrUpdateInventory = this.createOrUpdateInventory.bind(this)
    this.successCreateInventoryCallback =this.successCreateInventoryCallback.bind(this)
    this.failureCreateInventoryCallback = this.failureCreateInventoryCallback.bind(this)
  }

  componentDidMount() {
    if(localStorage.getItem("modifiedInventoryList")) {
      this.setState({modifiedStockList: JSON.parse(localStorage.getItem("modifiedInventoryList"))})
    }
  }

  renderStock(stock) {
    console.log("props", this.props)
    return (
      <div className="modified-inventory-list">
        <div className="product">
          <div className="product-details">
            <div>
              <span className="title">Brand Name: </span>
              <span>{stock.brand_name}</span>
            </div>
          </div>
          <div className="product-details">
            <div>
              <p className="title">Volume(ml)</p>
              <p>{stock.volume}</p>
            </div>
            <div>
              <p className="title">Status</p>
              <p>{stock.is_active ? 'Active': 'Inactive'}</p>
            </div>
          </div>
          <div className="product-details">
            <div>
              <p className="title">Retailer Price</p>
              <p>{stock.price}</p>
            </div>
            <div>
              <p className="title">Retailer Price Set</p>
              <p>{stock.is_retailer_price_set ? 'Set' : 'No Set'}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  createOrUpdateInventory() {
    localStorage.removeItem("modifiedInventoryList")
    const payload = {
      inventories: this.state.modifiedStockList
    }
    if(this.state.modifiedStockList.length > 0) {
      this.setState({creatingInventory: true})
      this.createOrUpdateRetailerInventory(
        payload, 
        this.successCreateInventoryCallback, 
        this.failureCreateInventoryCallback
      )
    }
  }

  successCreateInventoryCallback() {
    this.setState({creatingInventory: false})
  }

  failureCreateInventoryCallback() {
    this.setState({creatingInventory: false})
  }

  createOrUpdateRetailerInventory(payload, successcallback) {
    Api.createOrUpdateStockPrice(payload, successcallback)
  }


  render() {
    const {modifiedStockList} = this.state
    return (
      <React.Fragment>
        <Layout title="Modified Stock List">
          <div>
            <div className="header">
              <p>Retailer Name: {this.props.match.params.outletName}</p>
            </div>
            {
              modifiedStockList.length > 0 && modifiedStockList.map((item) => (
                this.renderStock(item)
              ))
            }
            {
              modifiedStockList.length === 0 &&
              <p className="note">No stock found</p>
            }
          </div>
          <div className="btn--container">
            <CustomButton 
              text="Save" 
              handleClick={this.createOrUpdateInventory} 
              disableSave={this.state.creatingInventory}
            />
          </div>
        </Layout>
      </React.Fragment>
    )
  }
}

export default StockSummary
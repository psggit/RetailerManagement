import React from "react"
import Layout from "Components/layout"
import CustomButton from 'Components/button'
import * as Api from './../../api'
import "Sass/style.scss"
import {mockSkuList} from "./../../mockData"
import Accordian from "Components/accordian"
import AccordianItem from "Components/accordian/accordian-item"
import Icon from "Components/icon"

class RetailerInventory extends React.Component {

  constructor() {
    super()

    this.state = {
      loadingGenreList: true,
      isGenreSelected: false,
      selectedGenreIdx: "",
      genreList: [],
      loadingInventory: true,
      inventoryList: [],
      inventoryMap: {},
      inventoryListCount: 0,
      activeAccordian: -1
    }

    this.formatResponse = this.formatResponse.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.fetchRetailerInventory = this.fetchRetailerInventory.bind(this)
    this.successInventorylistCallback = this.successInventorylistCallback.bind(this)
    this.setActiveAccordian = this.setActiveAccordian.bind(this)
    this.toggleAccordian = this.toggleAccordian.bind(this)
    this.createOrUpdateInventory = this.createOrUpdateInventory.bind(this)
    this.handleCheckboxes = this.handleCheckboxes.bind(this)
    this.handlePriceChange = this.handlePriceChange.bind(this)
  }

  componentDidMount() {
    this.fetchGenreList({}, this.formatResponse)
  }

  handleChange(e) {
    console.log("data", e.target.value)
    this.setState({
      selectedGenreIdx: e.target.value,
      isGenreSelected: true
    })
  }

  fetchGenreList(payload, genreListSuccessCallback) {
		Api.fetchGenreList(payload, genreListSuccessCallback)
	}

	formatResponse(data) {
    const genreList = data.map((item) => {
      return {
        text: item.genre_name,
        value: item.id
      }
    })
		this.setState({
      genreList, 
      loadingGenreList: false, 
      isGenreSelected: true, 
      selectedGenreIdx: data[0].id
    })
  }

  fetchRetailerInventory() {
    const payload = {
      retailer_id: this.props.location.state.id,
      genre_id: this.state.sele
    }
    this.setState({loadingInventory: true})
    this.fetchRetailerInventoryApi(payload, this.successInventorylistCallback)
  }

  fetchRetailerInventoryApi(payload, successCallback) {
    //Api.fetchRetailerInventoyr(payload, successCallback)
    successCallback(mockSkuList.brands)
  }

  successInventorylistCallback(inventoryList) {
    const inventoryMap = {}
    const retailerInventoryList = inventoryList.map((item) => {
      console.log("item", item)
      item.sku.map((sku) => {
        inventoryMap[sku.sku_pricing_id] = Object.assign(
                                            {}, 
                                            item, 
                                            {is_modified: false, newPrice: 0}
                                          )
      })
      return Object.assign({}, item, {newPrice: 0})
    })
    console.log("list", retailerInventoryList, "map", inventoryMap)
    this.setState({
      inventoryList: retailerInventoryList, 
      loadingInventory: false,
      inventoryMap,
      inventoryListCount: 100
    })
  }

  setActiveAccordian(activeAccordian) {
    this.setState({activeAccordian})
  }

  toggleAccordian() {
    this.setState({activeAccordian: -1})
  }

  handleCheckboxes(e, skuPricingId) {
    let updatedMap = Object.assign({}, this.state.inventoryMap)
    console.log("updated map", updatedMap)
    updatedMap[skuPricingId].is_modified = true
    if(e.target.name === "is_active") {
      updatedMap[skuPricingId].sku.map((item) => {
        if(item.sku_pricing_id === skuPricingId) {
          item.is_active = (e.target.checked)
        }
      })
    }
    this.setState({ inventoryMap: updatedMap})
  }

  handlePriceChange(e, skuPricingId) {
    let updatedMap = Object.assign({}, this.state.inventoryMap)
    updatedMap[skuPricingId].is_modified = (e.target.checked)
    updatedMap[skuPricingId].newPrice = (e.target.value)
    this.setState({ inventoryMap: updatedMap})
  }

  createOrUpdateInventory() {
    console.log("map", this.state.inventoryMap)
  }

  render() {
    const {loadingInventory, inventoryList} = this.state
    return (
      <Layout title="Retailer Inventory">
        <div>
          <div className="header">
            <p>Retailer Name: {this.props.location.state.outlet_name}</p>
          </div>
          <div className="select-container">
            <select 
              id="genre" 
              onChange={(e) => this.handleChange(e)} 
              //value={selectedCityIdx ? parseInt(selectedCityIdx) : ""}
            >
              {this.state.genreList.map(item => {
                return <option value={item.value}>{item.text}</option>
              })}
            </select>
            <div className="btn--container">
              <CustomButton 
                text="Select Genre" 
                disableSave={this.state.loadingGenreList}
                handleClick={this.fetchRetailerInventory}
              />
            </div>
          </div>
          {
            !loadingInventory &&
            <div className="header">
              <p style={{fontWeight: '600'}}>Inventory List</p>
            </div>
          }
          <div className="inventory-list">
            {
              inventoryList.length > 0 &&
              <Accordian
                //middleware={this.setCardValues}
                setActiveAccordian={this.setActiveAccordian}
                toggleAccordian={this.toggleAccordian}
                activeAccordian={this.state.activeAccordian}
              >
                {
                  inventoryList.map((item, index) => (
                    <AccordianItem key={index} title={item.brand_name} icon={this.state.activeAccordian !== -1 && this.state.activeAccordian === index ? <Icon name="minus" /> : <Icon name="plus" />} id={index}>
                     {
                        item.sku.map((prod) => {
                          return <div className="sku">
                            <div className="sku-details">
                              <div>
                                <p>Volume(ml)</p>
                                <p>{prod.volume}</p>
                              </div>
                              <div>
                                <p>Price</p>
                                <p>{prod.price}</p>
                              </div>
                              <div>
                                <p>Status</p>
                                <div>
                                  <input 
                                    type="checkbox"
                                    onChange={(e) => this.handleCheckboxes(e, prod.sku_pricing_id)}
                                    checked={this.state.inventoryMap[prod.sku_pricing_id].sku.find((item) => item.sku_pricing_id===prod.sku_pricing_id).is_active}
                                    name="is_active"
                                    //disabled={!this.state.enableEdit}
                                  />
                                  {/* <p>
                                    {prod.is_active ? 'Active' : 'Inactive'}
                                  </p> */}
                                </div>
                              </div>
                            </div>
                            <div className="retailer-stock-price">
                              <input 
                                type="checkbox"
                                onChange={(e) => this.handleCheckboxes(e, prod.sku_pricing_id)}
                                //checked={this.state.inventoryMap[prod.sku_pricing_id].is_active}
                                //name="isActive"
                                //disabled={!this.state.enableEdit}
                              />
                              <span>new price</span>
                              <span>{prod.newPrice}</span>
                              <input 
                                type="number"
                                onChange={(e) => this.handlePriceChange(e, prod.sku_pricing_id)} 
                                type="number"
                                value={this.state.inventoryMap[(prod.sku_pricing_id)].newPrice} 
                              />
                            </div>
                          </div>
                        })
                     }
                    </AccordianItem>
                  ))
                }
              </Accordian>
            }
            {
              <div
                style={{
                  verticalAlign: 'bottom',
                  display: 'inline-block',
                  margin: '20px 0 0 0'
                }}
              >
                <CustomButton 
                  text="SAVE" 
                  handleClick={this.createOrUpdateInventory} 
                />
              </div>
            }
          </div>
        </div>
      </Layout>
    )
  }
}

export default RetailerInventory
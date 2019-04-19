import React from "react"
import Layout from "Components/layout"
import CustomButton from 'Components/button'
import * as Api from './../../api'
import "Sass/style.scss"
import {mockSkuList} from "./../../mockData"
import Accordian from "Components/accordian"
import AccordianItem from "Components/accordian/accordian-item"
import Icon from "Components/icon"
import Pagination from 'Components/pagination'
import { getQueryObj, getQueryUri } from 'Utils/url-utils'

class RetailerInventory extends React.Component {

  constructor() {
    super()

    this.state = {
      loadingGenreList: true,
      //isGenreSelected: false,
      selectedGenreIdx: "",
      genreList: [],
      loadingInventory: true,
      inventoryList: [],
      modifiedInventorylist: [],
      inventoryMap: {},
      inventoryListCount: 0,
      activeAccordian: -1,
      activePage: 1,
      offset: 0,
      retailerId: "",
      stateId: "",
      outletName: ""
    }
    this.pagesLimit = 10
    this.formatResponse = this.formatResponse.bind(this)
    this.handleGenreChange = this.handleGenreChange.bind(this)
    this.fetchRetailerInventory = this.fetchRetailerInventory.bind(this)
    this.successInventorylistCallback = this.successInventorylistCallback.bind(this)
    this.setActiveAccordian = this.setActiveAccordian.bind(this)
    this.toggleAccordian = this.toggleAccordian.bind(this)
    this.createOrUpdateInventory = this.createOrUpdateInventory.bind(this)
    this.handleCheckboxes = this.handleCheckboxes.bind(this)
    this.handlePriceChange = this.handlePriceChange.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.saveModifiedStock = this.saveModifiedStock.bind(this)
  }

  componentDidMount() {
    this.fetchGenreList({}, this.formatResponse)
    if (location.search.length) {
			this.setQueryParamas()
    } else {
      this.setState({
        outletName: this.props.location.state.outlet_name,
        retailerId: this.props.location.state.id,
        stateId: this.props.location.state.state_id
      })
    }
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
      //isGenreSelected: true, 
      selectedGenreIdx: this.state.selectedGenreIdx ? this.state.selectedGenreIdx : data[0].id
    })
  }

  setQueryParamas() {
    const queryUri = decodeURI(location.search.slice(1))
		const queryObj = getQueryObj(queryUri)

		Object.entries(queryObj).forEach((item) => {
			this.setState({ [item[0]]: item[1] })
		})
		this.setState({ 
      inventoryList: [], 
      inventoryListCount: 0, 
      loadingInventory: true
    })
    this.fetchRetailerInventoryList({
      offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
      limit: this.pagesLimit,
      retailer_id:  queryObj.retailerId,
      genre_id: this.state.selectedGenreIdx,
      state_id:  queryObj.stateId
    }, this.successInventorylistCallback)
  }

  saveModifiedStock() {
    const inventoryList = Object.values(this.state.inventoryMap)
    const modifiedInventorylist = inventoryList.filter((item) => {
      if(item.is_modified) {
        return item
      }
    })
    //console.log("modified", modifiedInventorylist, "saved", localStorage.getItem("modifiedInventoryList"))
    let storedSavedInvertories = localStorage.getItem("modifiedInventoryList") ? JSON.parse(localStorage.getItem("modifiedInventoryList")) : []
    //console.log("new", [...storedSavedInvertories, ...modifiedInventorylist])
    localStorage.setItem("modifiedInventoryList", JSON.stringify([...storedSavedInvertories, ...modifiedInventorylist]))
    
    //this.setState({modifiedInventorylist: Object.assign({}, this.state.modifiedInventorylist, modifiedInventorylist)})
  }

  handlePageChange(pageObj) {
		const queryUri = decodeURI(location.search.slice(1))
    const queryObj = getQueryObj(queryUri)
  
		let pageNumber = pageObj.activePage
		let offset = pageObj.offset
		this.setState({ activePage: pageNumber, offset, loadingInventory: true })

    const queryParamsObj = {
      //filter: (queryObj.filter),
      offset: pageObj.offset,
      activePage: pageObj.activePage,
      selectedGenreIdx: this.state.selectedGenreIdx,
      retailerId: this.state.retailerId,
      stateId: this.state.stateId,
      outletName: this.state.outletName
    }

    this.saveModifiedStock()
		
    this.fetchRetailerInventoryList({
      offset: pageObj.offset,
      limit: this.pagesLimit,
      retailer_id: this.state.retailerId,
      genre_id: this.state.selectedGenreIdx,
      state_id: this.state.stateId
    }, this.successInventorylistCallback)
    
		history.pushState(queryParamsObj, "stock and price listing", `/admin/stock-and-price/list/${this.state.retailerId}?${getQueryUri(queryParamsObj)}`)
  }

  handleGenreChange(e) {
    this.setState({
      selectedGenreIdx: e.target.value,
      //isGenreSelected: true
    })
  }

  fetchRetailerInventory() {
    const payload = {
      retailer_id: this.state.retailerId,
      genre_id: this.state.selectedGenreIdx,
      limit: this.pagesLimit,
      offset: 0,
      state_id: this.state.stateId
    }
    this.setState({loadingInventory: true})
    this.fetchRetailerInventoryList(payload, this.successInventorylistCallback)
  }

  fetchRetailerInventoryList(payload, successCallback) {
    //Api.fetchRetailerInventoyr(payload, successCallback)
    successCallback(mockSkuList.brands)
  }

  successInventorylistCallback(inventoryList) {
    const inventoryMap = {}
    const retailerInventoryList = inventoryList.map((item) => {
      item.sku.map((sku) => {
        inventoryMap[sku.sku_pricing_id] = {
          sku_pricing_id: sku.sku_pricing_id,
          is_active: sku.is_active,
          sku_id: sku.sku_id,
          price: sku.price,
          volume: sku.volume,
          newPrice: 0, 
          is_modified: false
        }
      })
      return item
    })

    const savedInventoryList = localStorage.getItem("modifiedInventoryList") ? localStorage.getItem("modifiedInventoryList") : []
    if(savedInventoryList.length > 0) {
      savedInventoryList.map((item) => {
        if(inventoryMap[item.sku_pricing_id]) {
          inventoryMap[item.sku_pricing_id].is_modified = item.is_modified
          inventoryMap[item.sku_pricing_id].is_active = item.is_active
          inventoryMap[item.sku_pricing_id].newPrice = item.newPrice
        }
      })
    }

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
    updatedMap[skuPricingId].is_modified = true
    if(e.target.name === "is_active") {
      updatedMap[skuPricingId].is_active = (e.target.checked)
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
    const modifiedInventoryList =  localStorage.getItem("modifiedInventoryList")
    console.log("stored inventories", modifiedInventoryList)
    localStorage.removeItem("modifiedInventoryList")
  }

  render() {
    const {loadingInventory, inventoryList, selectedGenreIdx} = this.state
    return (
      <Layout title="Retailer Inventory">
        <div>
          <div className="header">
            <p>Retailer Name: {this.state.outletName}</p>
          </div>
          <div className="select-container">
            <select 
              id="genre" 
              onChange={(e) => this.handleGenreChange(e)} 
              value={parseInt(selectedGenreIdx)}
              //value={selectedCityIdx ? parseInt(selectedCityIdx) : ""}
            >
              {this.state.genreList.map(item => {
                return <option value={item.value}>{item.text}</option>
              })}
            </select>
            <div className="btn--container">
              <CustomButton 
                text="FETCH INVENTORIES" 
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
          {
            !loadingInventory && inventoryList.length === 0 &&
            <div className="header">
              <p style={{fontWeight: '600'}}>No inventory found</p>
            </div>
          }
          <div className="inventory-list">
            {
              inventoryList.length > 0 &&
              <Accordian
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
                                    checked={
                                      this.state.inventoryMap[prod.sku_pricing_id].is_active
                                    }
                                    name="is_active"
                                    //disabled={!this.state.enableEdit}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="retailer-stock-price">
                              <div>
                                <input 
                                  type="checkbox"
                                  onChange={(e) => this.handleCheckboxes(e, prod.sku_pricing_id)}
                                  //checked={this.state.inventoryMap[prod.sku_pricing_id].is_active}
                                  //name="isActive"
                                  //disabled={!this.state.enableEdit}
                                />
                                <span>Retailer Price</span>
                              </div>
                              {/* <span>{prod.newPrice}</span> */}
                              <input 
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
              inventoryList.length > 0 &&
              <div className="btn--container">
                <CustomButton 
                  text="SAVE" 
                  handleClick={this.createOrUpdateInventory} 
                />
              </div>
            }
            {
              inventoryList && inventoryList.length > 0 &&
              <Pagination
                activePage={parseInt(this.state.activePage)}
                itemsCountPerPage={this.pagesLimit}
                totalItemsCount={parseInt(this.state.inventoryListCount)}
                setPage={this.handlePageChange}
              />
            }
          </div>
        </div>
      </Layout>
    )
  }
}

export default RetailerInventory
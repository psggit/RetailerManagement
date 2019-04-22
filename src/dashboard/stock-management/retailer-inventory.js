import React from "react"
import Layout from "Components/layout"
import CustomButton from 'Components/button'
import * as Api from './../../api'
import "Sass/style.scss"
import {mockSkuList} from "./../../mockData"
import Accordian from "Components/accordian"
import AccordianItem from "Components/accordian/accordian-item"
import Icon from "Components/icon"
//import Pager from "Components/pager"
import Pagination from 'Components/pagination'
// import PaginationToolbar from 'Components/paginationToolbar'
import { getQueryObj, getQueryUri } from 'Utils/url-utils'

class RetailerInventory extends React.Component {

  constructor() {
    super()

    this.state = {
      loadingGenreList: true,
      selectedGenreIdx: "",
      genreList: [],
      loadingInventory: true,
      fetchingInventories: false,
      creatingInventory: false,
      inventoryList: [],
      modifiedInventorylist: [],
      savedInventories: [],
      inventoryMap: {},
      inventoryListCount: 0,
      activeAccordian: -1,
      activePage: 1,
      offset: 0,
      retailerId: "",
      stateId: "",
      outletName: ""
    }
    this.pagesLimit = 5
    this.formatResponse = this.formatResponse.bind(this)
    this.handleGenreChange = this.handleGenreChange.bind(this)
    this.fetchRetailerInventory = this.fetchRetailerInventory.bind(this)
    this.successInventorylistCallback = this.successInventorylistCallback.bind(this)
    this.failureInventorylistCallback = this.failureInventorylistCallback.bind(this)
    this.setActiveAccordian = this.setActiveAccordian.bind(this)
    this.toggleAccordian = this.toggleAccordian.bind(this)
    //this.createOrUpdateInventory = this.createOrUpdateInventory.bind(this)
    this.handleSkuStatusCheckboxChange = this.handleSkuStatusCheckboxChange.bind(this)
    this.handleIsPriceSetCheckboxChange = this.handleIsPriceSetCheckboxChange.bind(this)
    // this.successCreateInventoryCallback =this.successCreateInventoryCallback.bind(this)
    // this.failureCreateInventoryCallback = this.failureCreateInventoryCallback.bind(this)
    this.handlePriceChange = this.handlePriceChange.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.saveModifiedStock = this.saveModifiedStock.bind(this)
    this.showModifiedStockList = this.showModifiedStockList.bind(this)
  }

  componentDidMount() {
    if (location.search.length) {
			this.setQueryParamas()
    } 
    // else {
    //   this.fetchGenreList({
    //     state_id: this.props.location.state.state_id
    //   }, this.formatResponse)
    //   //console.log("state", this.props)
    //   this.setState({
    //     outletName: this.props.location.state.outlet_name,
    //     retailerId: this.props.location.state.id,
    //     stateId: this.props.location.state.state_id
    //   })
    // }
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
      loadingInventory: true,
      savedInventories: localStorage.getItem("modifiedInventoryList") ? JSON.parse(localStorage.getItem("modifiedInventoryList")) : []
    })

    this.fetchGenreList({
      state_id:  queryObj.stateId
    }, this.formatResponse)

    if(queryObj.selectedGenreIdx) {
      this.fetchRetailerInventoryList({
        offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
        limit: this.pagesLimit,
        retailer_id:  parseInt(queryObj.retailerId),
        genre_id: parseInt(queryObj.selectedGenreIdx),
        state_id:  parseInt(queryObj.stateId)
      }, this.successInventorylistCallback, this.failureInventorylistCallback)
    }
  }

  fetchGenreList(payload, genreListSuccessCallback) {
		Api.fetchGenreList(payload, genreListSuccessCallback)
	}

	formatResponse(data) {
    const genreList = data.map((item) => {
      return {
        text: item.name,
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

  saveModifiedStock() {
    const inventoryList = Object.values(this.state.inventoryMap)
    const modifiedInventorylist = inventoryList.filter((item) => {
      if(item.is_modified) {
        return item
      }
    })
    //console.log("modified", modifiedInventorylist)
    let storedSavedInvertories = localStorage.getItem("modifiedInventoryList") 
                                  ? JSON.parse(localStorage.getItem("modifiedInventoryList")) 
                                  : []
    //console.log("stored", storedSavedInvertories)
    const newInventories = [...storedSavedInvertories, ...modifiedInventorylist]
  
    //Removes duplicates from array of objects
    const uniqueInventories = newInventories.reduce((acc, current) => {
      //console.log("acc", acc)
      const x = acc.find(item => item.sku_pricing_id === current.sku_pricing_id);
      if (!x) {
        //console.log("1",  acc.concat([current]))
        return acc.concat([current]);
      } else {
        //console.log("2", acc,  acc)
        const pricingIdx = acc.findIndex(item => item.sku_pricing_id === current.sku_pricing_id)
        acc[pricingIdx] = {...acc[pricingIdx], ...current}
        return acc
      }
    }, []);
    //console.log("filtered arr", uniqueInventories)
    this.setState({savedInventories: uniqueInventories})
    localStorage.setItem("modifiedInventoryList", JSON.stringify(uniqueInventories))
  }

  handlePageChange(pageObj) {
		const queryUri = decodeURI(location.search.slice(1))
    const queryObj = getQueryObj(queryUri)
  
		let pageNumber = pageObj.activePage
    let offset = pageObj.offset
    
		this.setState({ 
      activePage: pageNumber, 
      offset, 
      loadingInventory: true, 
      inventoryList: [] 
    })

    const queryParamsObj = {
      offset: pageObj.offset,
      activePage: pageObj.activePage,
      selectedGenreIdx: this.state.selectedGenreIdx,
      retailerId: this.state.retailerId,
      stateId: this.state.stateId,
      outletName: this.state.outletName
    }
    //this.saveModifiedStock()
    this.fetchRetailerInventoryList({
      offset: pageObj.offset,
      limit: this.pagesLimit,
      retailer_id: parseInt(this.state.retailerId),
      genre_id: parseInt(this.state.selectedGenreIdx),
      state_id: parseInt(this.state.stateId)
    }, this.successInventorylistCallback, this.failureInventorylistCallback)
    
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
      retailer_id: parseInt(this.state.retailerId),
      genre_id: parseInt(this.state.selectedGenreIdx),
      limit: this.pagesLimit,
      offset: 0,
      state_id: parseInt(this.state.stateId)
    }
    this.setState({loadingInventory: true, fetchingInventories: true, inventoryList: []})
    this.fetchRetailerInventoryList(payload, this.successInventorylistCallback, this.failureInventorylistCallback)
  }

  fetchRetailerInventoryList(payload, successCallback, failureCallback) {
    Api.fetchRetailerInventory(payload, successCallback, failureCallback)
  }

  successInventorylistCallback(response) {
    const inventoryMap = {}
    const retailerInventoryList = response.brands.map((item) => {
      item.sku.map((sku) => {
        inventoryMap[sku.sku_pricing_id] = {
          sku_pricing_id: sku.sku_pricing_id,
          is_active: sku.is_active,
          catalog_price: sku.catalog_price,
          volume: sku.volume,
          price: sku.retailer_price,
          is_retailer_price_set: sku.is_retailer_price_set,
          genre_id: this.state.selectedGenreIdx,
          state_id: this.state.stateId,
          retailer_id: parseInt(this.state.retailerId), 
          outlet_name: this.state.outletName,
          is_modified: false,
          brand_name: item.brand_name,
          stock: 0,
          version: 0
        }
      })
      return item
    })

    const savedInventoryList = localStorage.getItem("modifiedInventoryList") 
                                ? JSON.parse(localStorage.getItem("modifiedInventoryList")) 
                                : []

    if(savedInventoryList.length > 0) {
      savedInventoryList.map((item) => {
        if(inventoryMap[item.sku_pricing_id]) {
          inventoryMap[item.sku_pricing_id] = {...inventoryMap[item.sku_pricing_id], ...item}
          // inventoryMap[item.sku_pricing_id].is_modified = item.is_modified
          // inventoryMap[item.sku_pricing_id].is_active = item.is_active
          // inventoryMap[item.sku_pricing_id].is_retailer_price_set = item.is_retailer_price_set
          // inventoryMap[item.sku_pricing_id].price = item.price
        }
      })
    }

    this.setState({
      inventoryList: retailerInventoryList, 
      loadingInventory: false,
      fetchingInventories: false,
      inventoryMap,
      inventoryListCount: response.count
    })
  }

  failureInventorylistCallback() {
    this.setState({
      inventoryList: [], 
      loadingInventory: false,
      fetchingInventories: false,
      inventoryMap: {},
      inventoryListCount: 0
    })
  }

  setActiveAccordian(activeAccordian) {
    this.setState({activeAccordian})
  }

  toggleAccordian() {
    this.setState({activeAccordian: -1})
  }

  handleIsPriceSetCheckboxChange(e, skuPricingId) {
    let updatedMap = Object.assign({}, this.state.inventoryMap)
    updatedMap[skuPricingId].is_modified = true
    updatedMap[skuPricingId].is_retailer_price_set = !updatedMap[skuPricingId].is_retailer_price_set
    this.setState({ inventoryMap: updatedMap})
    this.saveModifiedStock()
  }

  handleSkuStatusCheckboxChange(e, skuPricingId) {
    let updatedMap = Object.assign({}, this.state.inventoryMap)
    updatedMap[skuPricingId].is_modified = true
    updatedMap[skuPricingId].is_active = !updatedMap[skuPricingId].is_active
    this.setState({ inventoryMap: updatedMap})
    this.saveModifiedStock()
  }

  handlePriceChange(e, skuPricingId) {
    let updatedMap = Object.assign({}, this.state.inventoryMap)
    updatedMap[skuPricingId].is_modified = true
    updatedMap[skuPricingId].price = parseInt(e.target.value)
    this.setState({ inventoryMap: updatedMap})
    this.saveModifiedStock()
  }

  // createOrUpdateInventory() {
  //   const modifiedInventoryList =  localStorage.getItem("modifiedInventoryList") ? JSON.parse(localStorage.getItem("modifiedInventoryList")) : []
  //   localStorage.removeItem("modifiedInventoryList")
  //   const payload = {
  //     inventories: modifiedInventoryList
  //   }
  //   if(modifiedInventoryList.length > 0) {
  //     this.setState({creatingInventory: true})
  //     this.createOrUpdateRetailerInventory(payload, this.successCreateInventoryCallback, this.failureCreateInventoryCallback)
  //   }
  //   //this.props.history.push("/admin/stock-and-price")
  // }

  // successCreateInventoryCallback() {
  //   this.setState({creatingInventory: false})
  // }

  // failureCreateInventoryCallback() {
  //   this.setState({creatingInventory: false})
  // }

  // createOrUpdateRetailerInventory(payload, successcallback) {
  //   Api.createOrUpdateStockPrice(payload, successcallback)
  // }

  showModifiedStockList() {
    this.props.history.push(`/admin/stock-and-price/modified-list/${this.state.outletName}`)
  }

  render() {
    const {loadingInventory, inventoryList, selectedGenreIdx, fetchingInventories} = this.state
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
            loadingInventory && fetchingInventories &&
            <div className="header">
              <p style={{fontWeight: '600'}}>Loading...</p>
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
              !loadingInventory && inventoryList.length > 0 &&
              <Accordian
                setActiveAccordian={this.setActiveAccordian}
                toggleAccordian={this.toggleAccordian}
                activeAccordian={this.state.activeAccordian}
              >
                {
                  inventoryList.map((item, index) => (
                    <AccordianItem key={index} title={item.brand_name} icon={this.state.activeAccordian !== -1 && this.state.activeAccordian === index ? <Icon name="upArrow" /> : <Icon name="downArrow" />} id={index}>
                     {
                        item.sku.map((prod) => {
                          return (
                            <div className="sku">
                              <div className="sku-details">
                                <div>
                                  <p>Volume(ml)</p>
                                  <p>{prod.volume}</p>
                                </div>
                                <div>
                                  <p>Price</p>
                                  <p>{prod.catalog_price}</p>
                                </div>
                                <div>
                                  <p>Status</p>
                                  <div>
                                    <span onClick={(e) => this.handleSkuStatusCheckboxChange(e, prod.sku_pricing_id)}>
                                      {
                                        this.state.inventoryMap[prod.sku_pricing_id].is_active 
                                        ? <Icon name="filledRectangle" /> 
                                        : <Icon name="rectangle" />
                                      }
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="retailer-stock-price">
                                <div>
                                  <span>Retailer Price</span>
                                  <span onClick={(e) => this.handleIsPriceSetCheckboxChange(e, prod.sku_pricing_id)}>
                                    {
                                      this.state.inventoryMap[prod.sku_pricing_id].is_retailer_price_set 
                                      ? <Icon name="filledRectangle" /> 
                                      : <Icon name="rectangle" />
                                    }
                                  </span>
                                </div>
                              </div>
                              <div>
                                <input 
                                  onChange={(e) => this.handlePriceChange(e, prod.sku_pricing_id)} 
                                  type="number"
                                  value={this.state.inventoryMap[(prod.sku_pricing_id)].price} 
                                />
                              </div>
                            </div>
                          )
                        })
                     }
                    </AccordianItem>
                  ))
                }
              </Accordian>
            }
            {
              this.state.savedInventories.length > 0 &&
              <div className="btn--container">
                <CustomButton 
                  text="Modified Stock List" 
                  handleClick={this.showModifiedStockList} 
                  //disableSave={!this.state.savedInventories}
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
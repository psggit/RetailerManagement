import React from "react"
import CustomButton from 'Components/button'
import * as Api from './../../api'
import "Sass/style.scss"
import Layout from "Components/layout"
import { formatStateAndCityList } from 'Utils/response-format-utils'
import { getQueryObj, getQueryUri } from 'Utils/url-utils'
import Pagination from 'Components/pagination'
import RetailerListItem from "./retailer-list"

class RetailerList extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedCityIdx: "",
      cityList: [],
      cityMap: {},
      retailerData: [],
      retailerListCount: 0,
      activePage: 1,
      offset: 0,
      filter: {},
      loadingRetailerData: true,
      loadingCityList: true,
      isCitySelected: false,
      fetchingRetailers: false
    }
    this.pagesLimit = 10
		this.handlePageChange = this.handlePageChange.bind(this)
    this.handleCityChange = this.handleCityChange.bind(this)
    this.fetchStateAndCityList = this.fetchStateAndCityList.bind(this)
    this.formatResponse = this.formatResponse.bind(this)
    this.fetchRetailerList = this.fetchRetailerList.bind(this)
    this.successFetchRetailerCallback = this.successFetchRetailerCallback.bind(this)
    this.failureFetchRetailerCallback = this.failureFetchRetailerCallback.bind(this)
    this.fetchRetailers = this.fetchRetailers.bind(this)
    // this.listRetailerInventory = this.listRetailerInventory.bind(this)
  }

  componentDidMount() {
    this.fetchStateAndCityList({}, this.formatResponse)
		if (location.search.length) {
			this.setQueryParamas()
    }
  }

  fetchDefaultData(filterObj) {
		this.setState({ 
      retailerData: [], 
      retailerListCount: 0, 
      fetchingRetailers: true,
      offset: 0, 
      activePage: 1
    })
    const queryObj = {
			filter: JSON.stringify(filterObj),
			offset: 0,
      activePage: 1,
      selectedCityIdx: this.state.selectedCityIdx
    }
   
    history.pushState(queryObj, "retailer listing", `/admin/stock-and-price?${getQueryUri(queryObj)}`)

		this.fetchRetailerList({
			offset: 0,
      limit: this.pagesLimit,
      filter: (filterObj)
		}, this.successFetchRetailerCallback, this.failureFetchRetailerCallback)
  }
  
  setQueryParamas() {
    const queryUri = decodeURI(location.search.slice(1))
		const queryObj = getQueryObj(queryUri)

		Object.entries(queryObj).forEach((item) => {
			this.setState({ [item[0]]: item[1] })
    })
    
		this.setState({ 
      retailerData: [], 
      retailerListCount: 0, 
      loadingRetailerData: true,
      isCitySelected: queryObj.selectedCityIdx ? true : false
    })

    this.fetchRetailerList({
      offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
      limit: this.pagesLimit,
      filter: JSON.parse(queryObj.filter)
    }, this.successFetchRetailerCallback, this.failureFetchRetailerCallback)
  }

  handlePageChange(pageObj) {
		const queryUri = decodeURI(location.search.slice(1))
    const queryObj = getQueryObj(queryUri)
  
		let pageNumber = pageObj.activePage
    let offset = pageObj.offset
    
		this.setState({ 
      activePage: pageNumber, 
      offset, 
      loadingRetailerData: true, 
      retailerData: [], 
      fetchingRetailers: true 
    })

    const queryParamsObj = {
      filter: (queryObj.filter),
      offset: pageObj.offset,
      activePage: pageObj.activePage,
      selectedCityIdx: this.state.selectedCityIdx
    }
		
    this.fetchRetailerList({
      offset: pageObj.offset,
      limit: this.pagesLimit,
      filter: JSON.parse(queryObj.filter)
    }, this.successFetchRetailerCallback, this.failureFetchRetailerCallback)
    
		history.pushState(queryParamsObj, "stock and price listing", `/admin/stock-and-price?${getQueryUri(queryParamsObj)}`)
  }
  
  fetchRetailers() {
    const filterObj = {
      column: 'CityName',
      operator: 'CASEIGNORE',
      value: this.state.cityMap[this.state.selectedCityIdx].text
    }

    this.setState({loadingRetailerData: true})
    this.fetchDefaultData(filterObj)
  }

  handleCityChange(e) {
    this.setState({
      selectedCityIdx: e.target.value,
      isCitySelected: true,
      loadingRetailerData: true
    })
  }

  fetchRetailerList(payloadObj, successCallback, failureCallback) {
		Api.fetchRetailerList(payloadObj, successCallback, failureCallback)
	}

  successFetchRetailerCallback(response) {
		if (response && response.ret_response) {
			this.setState({ 
        retailerData: response.ret_response, 
        retailerListCount: response.count, 
        loadingRetailerData: false, 
        fetchingRetailers: false 
      })
    }
	}

	failureFetchRetailerCallback() {
		this.setState({ 
      retailerData: [], 
      retailerListCount: 0, 
      loadingRetailerData: false 
    })
	}

  fetchStateAndCityList(payload, stateListSuccessCallback) {
		Api.fetchStateAndCityList(payload, stateListSuccessCallback)
	}

	formatResponse(data) {
    const { stateList, cityList, stateMap } = formatStateAndCityList(data.states)
    const cityMap = {}
    cityList.map((item) => {
      cityMap[item.value] = item
    })
		this.setState({ cityList, cityMap, loadingCityList: false })
  }

  // listRetailerInventory(item) {
  //   //this.props.history.push(`/admin/stock-and-price/list/${item.id}`, item)
  //   this.props.history.push(`/admin/stock-and-price/list?retailerId=${item.id}&outletName=${item.outlet_name}&stateId=${item.state_id}`, item)
  // }
  
  // renderOutlet(item) {
  //   return (
  //     <div className="retailer" onClick={() => this.listRetailerInventory(item)}>
  //       <div className="details">
  //         <p>{item.id}</p>
  //         <p>{item.outlet_name}</p>
  //       </div>
  //     </div>
  //   )
  // }

  render() {
    const {retailerData, isCitySelected, selectedCityIdx, loadingRetailerData, fetchingRetailers} = this.state
    console.log("state", this.state)
    return (
      <React.Fragment>
        <Layout title="Manage Retailer">
          <div className="select-container">
            <select 
              id="city" 
              onChange={(e) => this.handleCityChange(e)} 
              value={selectedCityIdx ? parseInt(selectedCityIdx) : ""}
            >
              <option value="" disabled selected>
                Choose a city
              </option>
              {this.state.cityList.map(item => {
                return <option value={item.value}>{item.text}</option>;
              })}
            </select>
            <div className="btn--container">
              <CustomButton 
                text="Fetch Retailers" 
                disableSave={this.state.loadingCityList || !this.state.isCitySelected}
                handleClick={this.fetchRetailers}
              />
            </div>
          </div>
          <RetailerListItem 
            isCitySelected={isCitySelected}
            retailerData={retailerData}
            loadingRetailerData={loadingRetailerData}
            fetchingRetailers={fetchingRetailers}
            history={this.props.history}
          />
          {
            retailerData && retailerData.length > 0 &&
            <Pagination
              activePage={parseInt(this.state.activePage)}
              itemsCountPerPage={this.pagesLimit}
              totalItemsCount={parseInt(this.state.retailerListCount)}
              setPage={this.handlePageChange}
            />
          }
        </Layout>
      </React.Fragment>
    )
  }
}

export default RetailerList
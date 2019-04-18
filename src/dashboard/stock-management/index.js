import React from "react"
import { Form, TextInput } from '@auth0/cosmos'
import CustomButton from 'Components/button'
import { Icon, Spinner, List, Dialog } from '@auth0/cosmos'
import * as Api from './../../api'
import "Sass/style.scss"
import Layout from "Components/layout"
import { Table } from '@auth0/cosmos'
import { formatStateAndCityList } from 'Utils/response-format-utils'
import { getQueryObj, getQueryUri } from 'Utils/url-utils'
import Pagination from 'Components/pagination'

class CitySelection extends React.Component {
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
      isCitySelected: false
    }
    this.pagesLimit = 10
    this.filter = {
			column: '',
			operator: '',
			value: ''
		}

		this.handlePageChange = this.handlePageChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.fetchStateAndCityList = this.fetchStateAndCityList.bind(this)
    this.formatResponse = this.formatResponse.bind(this)
    this.fetchRetailerList = this.fetchRetailerList.bind(this)
    this.setResponseData = this.setResponseData.bind(this)
    this.failureCallback = this.failureCallback.bind(this)
    this.fetchRetailers = this.fetchRetailers.bind(this)
  }

  // componentDidMount() {
  //   this.fetchStateAndCityList({}, this.formatResponse)
  // }

  componentDidMount() {
    this.fetchStateAndCityList({}, this.formatResponse)
		if (location.search.length) {
			this.setQueryParamas()
    } 
    // else {
		// 	this.fetchDefaultData()
		// }
  }

  fetchDefaultData(filterObj) {
		this.setState({ retailerData: [], retailerListCount: 0 })
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
		}, this.setResponseData, this.failureCallback)
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
    }, this.setResponseData, this.failureCallback)
  }

  handlePageChange(pageObj) {
		const queryUri = decodeURI(location.search.slice(1))
    const queryObj = getQueryObj(queryUri)
  
		let pageNumber = pageObj.activePage
		let offset = pageObj.offset
		this.setState({ activePage: pageNumber, offset, loadingRetailerData: true })

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
    }, this.setResponseData, this.failureCallback)
    
		history.pushState(queryParamsObj, "stock and price listing", `/admin/stock-and-price?${getQueryUri(queryParamsObj)}`)
  }
  
  fetchRetailers() {
    const filterObj = {
      column: 'CityName',
      operator: 'CASEIGNORE',
      value: this.state.cityMap[this.state.selectedCityIdx].text
    }
    this.fetchDefaultData(filterObj)
  }

  handleChange(e) {
    console.log("data", this.state.cityMap, e.target.value)
    this.setState({
      selectedCityIdx: e.target.value,
      isCitySelected: true
    })
  }

  fetchRetailerList(payloadObj, successCallback, failureCallback) {
    console.log("payload", payloadObj)
		Api.fetchRetailerList(payloadObj, successCallback, failureCallback)
	}

  setResponseData(response) {
		if (response && response.ret_response) {
			this.setState({ retailerData: response.ret_response, retailerListCount: response.count, loadingRetailerData: false })
    }
	}

	failureCallback() {
		this.setState({ retailerData: [], retailerListCount: 0, loadingRetailerData: false })
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
  
  renderOutlet(item) {
    return (
      <div className="retailer">
        <div className="details">
          <p>{item.id}</p>
          <p>{item.outlet_name}</p>
        </div>
      </div>
    )
  }

  render() {
    const {retailerData, isCitySelected, selectedCityIdx} = this.state
    console.log("state", this.state)
    return (
      <React.Fragment>
        <Layout title="Manage Retailer">
          <div className="select-container">
            <select 
              id="city" 
              onChange={(e) => this.handleChange(e)} 
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
                text="Select City" 
                disableSave={this.state.loadingCityList}
                handleClick={this.fetchRetailers}
              />
            </div>
          </div>
          <div className="retailer-list">
            {
              retailerData.length > 0 &&
              <div className="header">
                <h2>Retailer List</h2>
              </div>
            }
            {
              retailerData.length > 0 && retailerData.map((item) => (
                this.renderOutlet(item)
              ))
            }
            {
              isCitySelected && retailerData.length === 0 &&
              <p className="note">No retailers found</p>
            }
            {
              !this.state.isCitySelected &&
              <p className="note">Please select city to list retailer</p>
            }
          </div>
          {/* {
					<div style={{ marginTop: '40px', marginBottom: '20px' }}>
						<Table
							emptyMessage={this.state.loadingRetailerData ? <Spinner /> : 'No records found'}
							items={this.state.retailerData}
							onRowClick={(e, item) => this.handleRowClick(e, item)}
						>
							<Table.Column field="id" title="Retailer Id" />
							<Table.Column field="outlet_name" title="Outlet Name" />
							<Table.Column field="branch_status" title="Outlet Status">
								{
                 item => (item.branch_status === 'true' ? 'Active' : 'Inactive')
                }
							</Table.Column>
						</Table>
					</div>
        } */}
        {
					this.state.retailerData && this.state.retailerData.length > 0 &&
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

export default CitySelection
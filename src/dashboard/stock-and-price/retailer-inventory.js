import React from "react"
import Layout from "Components/layout"
import CustomButton from 'Components/button'

class RetailerInventory extends React.Component {
  constructor() {
    super()

    this.state = {
      activePage: 1,
			offset: 0,
			loadingRetailerInventory: true,
			retailerInventoryCount: 0,
      retailerInventoryList: []
    }

    this.pageLimit = 10
    this.handlePageChange = this.handlePageChange.bind(this)
		this.handleClick = this.handleClick.bind(this)
		this.setQueryParamas = this.setQueryParamas.bind(this)
		this.fetchDefaultData = this.fetchDefaultData.bind(this)
    //this.successFetchStockAndPriceCallback = this.successFetchStockAndPriceCallback.bind(this)
    //this.failureFetchStockAndPriceCallback = this.failureFetchStockAndPriceCallback.bind(this)
  }

  componentDidMount() {
		console.log("mount")
		if (location.search.length) {
			this.setQueryParamas()
		} else {
			this.fetchDefaultData()
		}
  }

  fetchDefaultData() {
		this.setState({ retailerInventoryList: [], retailerInventoryCount: 0 })
		//this.fetchOrganizationList({}, this.formatOrganizationList)
		this.fetchRetailerInventory({
			offset: 0,
			limit: this.pagesLimit,
		}, this.successRetailerInventoryCallback, this.failureRetailerInventoryCallback)
  }
  
  setQueryParamas() {
		console.log("set query")
		const queryUri = location.search.slice(1)
		const queryObj = getQueryObj(queryUri)

		Object.entries(queryObj).forEach((item) => {
			this.setState({ [item[0]]: item[1] })
			this.filter[item[0]] = item[1]
    })
    
		this.setState({ 
      retailerInventoryList: [], 
      retailerInventoryCount: 0, 
      loadingRetailerInventory: true 
    })

		if (queryObj.column && queryObj.column.length > 0) {
			this.fetchRetailerInventory({
				offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
				limit: this.pagesLimit,
				filter: this.filter
			}, this.successRetailerInventoryCallback, this.failureRetailerInventoryCallback)
		} else {
			this.fetchRetailerInventory({
				offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
				limit: this.pagesLimit,
			}, this.successRetailerInventoryCallback, this.failureRetailerInventoryCallback)
		}

  }

  fetchRetailerInventory(payload, successCallback, failureCallback) {
    //Api.fetchStockAndPriceList(payload, successCallback, failureCallback)
  }

  handleClick() {
    this.props.history.push('/admin/stock-and-price/create', this.props.location.state)
  }

  successRetailerInventoryCallback() {
    this.setState({ 
      retailerInventoryList: response.ret_response, 
      retailerInventoryCount: response.count, 
      loadingRetailerInventory: false 
    })
  }

  failureRetailerInventoryCallback() {
    this.setState({ 
      retailerInventoryList: [], 
      retailerInventoryCount: 0, 
      loadingRetailerInventory: false 
    })
  }

  handlePageChange() {
    const queryUri = location.search.slice(1)
		const queryObj = getQueryObj(queryUri)
		let queryParamsObj = {}

		let pageNumber = pageObj.activePage
		let offset = pageObj.offset
		this.setState({ activePage: pageNumber, offset, loading: true })

		if (queryObj && queryObj.column && queryObj.column.length > 0) {
			queryParamsObj = {
				column: queryObj.column,
				operator: queryObj.operator,
				value: queryObj.value,
				offset: pageObj.offset,
				activePage: pageObj.activePage,
			}
		} else {
			queryParamsObj = {
				offset: pageObj.offset,
				activePage: pageObj.activePage,
			}
		}

		if (location.search.length && queryObj.column && queryObj.column.length > 0) {
			let filterObj = {
				column: queryObj.column,
				operator: queryObj.operator,
				value: queryObj.value
			}
			this.fetchRetailerList({
				offset: pageObj.offset,
				limit: this.pagesLimit,
				filter: filterObj
			}, this.setResponseData, this.failureCallback)

		} else {

			this.fetchRetailerList({
				offset: pageObj.offset,
				limit: this.pagesLimit
			}, this.setResponseData, this.failureCallback)
		}

		history.pushState(queryParamsObj, "stock and price listing", `/admin/stock-and-price?${getQueryUri(queryParamsObj)}`)
  }

  render() {
    return (
      <Layout title="Manage Retailer Inventory">
        <div
          style={{
            verticalAlign: 'bottom',
            display: 'inline-block',
            margin: '20px 0 0 0'
          }}
        >
          <CustomButton 
            text="CREATE OR UPDATE STOCK AND PRICE" 
            handleClick={this.handleClick} 
          />
        </div>
        <div>Retailer inventory</div>
      </Layout>
    )
  }
}

export default RetailerInventory
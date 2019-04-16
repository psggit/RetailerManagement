import React from "react"
import Layout from 'Components/layout'
import { Table } from '@auth0/cosmos'
import Pagination from 'Components/pagination'
import { Spinner } from '@auth0/cosmos'
import { getQueryObj, getQueryUri } from 'Utils/url-utils'
import CustomButton from 'Components/button'

class StockAndPriceList extends React.Component {
  constructor() {
    super()

    this.state = {
      activePage: 1,
			offset: 0,
			loadingData: true,
			stockAndPriceCount: 0,
			stockAndPriceData: []
    }

    this.pageLimit = 10
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.successFetchStockAndPriceCallback = this.successFetchStockAndPriceCallback.bind(this)
    this.failureFetchStockAndPriceCallback = this.failureFetchStockAndPriceCallback.bind(this)
  }

  componentDidMount() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

		Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
    })

    this.fetchStockAndPriceList({
      offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
      limit: this.pageLimit,
    }, this.successFetchStockAndPriceCallback, this.failureFetchStockAndPriceCallback)
  }

  handleClick() {
    this.props.history.push('/admin/stock-and-price/update')
  }

  handlePageChange(pageObj) {
		const queryUri = location.search.slice(1)
		const queryObj = getQueryObj(queryUri)
		let queryParamsObj = {}

		let pageNumber = pageObj.activePage
		let offset = pageObj.offset
    this.setState({ activePage: pageNumber, offset, loadingData: true })
    
    this.fetchStockAndPriceList({
      offset: pageObj.offset,
      limit: this.pageLimit
    }, this.successFetchStockAndPriceCallback, this.failureFetchStockAndPriceCallback)
  
    history.pushState(
      queryParamsObj, 
      "stock and price listing", 
      `/admin/stock-and-price-list?${getQueryUri(queryParamsObj)}`
    )
  }

  fetchStockAndPriceList(payload, successCallback, failureCallback) {
    //Api.fetchStockAndPriceList(payload, successCallback, failureCallback)
  }

  successFetchStockAndPriceCallback() {
    this.setState({ 
      stockAndPriceData: response.ret_response, 
      stockAndPriceCount: response.count, 
      loadingData: false 
    })
  }

  failureFetchStockAndPriceCallback() {
    this.setState({ 
      stockAndPriceData: [], 
      stockAndPriceCount: 0, 
      loadingData: false 
    })
  }

  render() {
    return (
      <Layout title="Manage Stock and Price">
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
        {
          <div style={{ marginTop: '40px', marginBottom: '20px' }}>
            <Table
              emptyMessage={this.state.loadingData ? <Spinner /> : 'No stock found'}
              items={this.state.stockAndPriceData}
              //onRowClick={(e, item) => this.handleRowClick(e, item)}
            >
              <Table.Column field="id" title="Retailer Id" />
              <Table.Column field="outlet_name" title="Outlet Name" />
              <Table.Column field="store_address" title="Outlet Address" />
              <Table.Column field="state_name" title="State" />
              <Table.Column field="city_name" title="City" />
              <Table.Column field="organisation_id" title="Organization Id" />
              <Table.Column field="organisation_name" title="Organization Name" />
            </Table>
          </div>
        }
        {
          !this.state.loadingData && this.state.stockAndPriceData &&
          <Pagination
            activePage={parseInt(this.state.activePage)}
            itemsCountPerPage={this.pageLimit}
            totalItemsCount={parseInt(this.state.stockAndPriceCount)}
            setPage={this.handlePageChange}
          />
        }
      </Layout>
    )
  }
} 

export default StockAndPriceList
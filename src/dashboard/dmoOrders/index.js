import React from 'react'
import Layout from 'Components/layout'
import { Table } from '@auth0/cosmos'
import { Spinner } from '@auth0/cosmos'
import { Select, TextInput } from '@auth0/cosmos'
import Pagination from 'Components/pagination'
import { getQueryObj, getQueryUri } from 'Utils/url-utils'
import * as Api from './../../api'
import CustomButton from 'Components/button'

class ManageDmoOrders extends React.Component {

  constructor () {
    super()
    this.state = {
      activePage: 1,
      offset: 0,
      loading: true,
      dmoOrdersCount: 0,
      dmoOrders: [],
      operators: [
        { text: 'EQUAL', value: 'EQUAL' }
      ],
      // filter: {
      column: 'retailer_id',
      operator: 'EQUAL',
      value: ''
      //}
    }

    this.filter = {
      column: '',
      operator: '',
      value: ''
    }

    this.pagesLimit = 10
    this.handlePageChange = this.handlePageChange.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getFilteredRetailersList = this.getFilteredRetailersList.bind(this)
    this.fetchDefaultData = this.fetchDefaultData.bind(this)
    this.fetchDmoOrdersList = this.fetchDmoOrdersList.bind(this)
  }

  fetchDefaultData () {
    this.setState({ dmoOrders: [], dmoOrdersCount: 0 })
    this.fetchDmoOrdersList({
      offset: 0,
      limit: this.pagesLimit,
    })
  }

  componentDidMount () {
    if (location.search.length) {
      this.setQueryParamas()
    } 
  }

  setQueryParamas () {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
      this.filter[item[0]] = item[1]
    })
    this.setState({ dmoOrders: [], dmoOrdersCount: 0, loading: true })
    if (queryObj.column && queryObj.column.trim().length > 0) {
      this.fetchDmoOrdersList({
        offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
        limit: this.pagesLimit,
        filter: this.filter
      })
    }
  }

  fetchDmoOrdersList (payloadObj) {
    Api.fetchDmoOrdersList(payloadObj)
    .then((response) => {
      if (response && response.orders) {
        this.setState({ dmoOrders: response.orders, dmoOrdersCount: response.count, loading: false })
      } else {
        this.setState({ dmoOrders: [], dmoOrdersCount: 0, loading: false })
      }
    })
    .catch((error) => {
      this.setState({ dmoOrders: [], dmoOrdersCount: 0, loading: false })
    })
  }

  getFilteredRetailersList () {
    const { column, operator, value, offset, activePage } = this.state

    this.filter = {
      column,
      operator,
      value
    }

    const queryObj = {
      column,
      operator,
      value,
      offset,
      activePage,
    }

    this.setState({
      dmoOrders: [],
      dmoOrdersCount: 0,
      loading: true,
      offset,
      activePage,
      column,
      operator,
      value
    })

    history.pushState(queryObj, "dmo orders listing", `/admin/manage-dmo-orders?${getQueryUri(queryObj)}`)

    this.fetchDmoOrdersList({
      limit: this.pagesLimit,
      offset: 0,
      filter: this.filter
    })
  }

  handlePageChange (pageObj) {
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
      this.fetchDmoOrdersList({
        offset: pageObj.offset,
        limit: this.pagesLimit,
        filter: filterObj
      })

    } else {

      this.fetchDmoOrdersList({
        offset: pageObj.offset,
        limit: this.pagesLimit
      })
    }

    history.pushState(queryParamsObj, "dmo orders listing", `/admin/manage-dmo-orders?${getQueryUri(queryParamsObj)}`)
  }

  handleChange (e) {
    if (e.target.name === "value") {
      this.setState({ offset: 0, activePage: 1 })
    }
    this.setState({ [e.target.name]: (e.target.value).toString() })
  }

  resetFilter () {
    this.setState({
      column: 'retailer_id',
      operator: 'EQUAL',
      value: ''
    })
    this.fetchDefaultData()
    this.props.history.push(`/admin/manage-dmo-orders`)
  }

  render () {
    const { dmoOrders } = this.state
    return (
      <Layout title={`Manage DMO Orders`}>

        <div style={{ marginTop: '20px' }}>
          <div style={{
            width: '210px',
            display: 'inline-block',
            verticalAlign: 'bottom',
            marginRight: '20px'
          }}
          >
            <p style={{ margin: '10px 0' }}>Field</p>
            <Select
              placeholder="Select an field..."
              value={this.state.column}
              name="column"
              options={[
                { text: 'RETAILER ID', value: 'retailer_id' },
                { text: 'BANK RRN', value: 'bank_rrn' },
                { text: 'TRANSACTION STATUS', value: 'transaction_status' }
              ]}
              onChange={(e) => this.handleChange(e)}
            />
          </div>

          <div style={{
            width: '180px',
            display: 'inline-block',
            verticalAlign: 'bottom',
            marginRight: '20px'
          }}
          >
            <p style={{ margin: '10px 0' }}>Operator</p>
            <Select
              placeholder="Select an operator..."
              value={this.state.operator}
              name="operator"
              options={this.state.operators}
              onChange={(e) => this.handleChange(e)}
            />
          </div>

          <div style={{
            width: '240px',
            display: 'inline-block',
            verticalAlign: 'bottom',
            marginRight: '20px'
          }}
          >
            <p style={{ margin: '10px 0' }}>Search Text</p>
            <TextInput
              placeholder="Contains"
              type="text"
              size="default"
              name="value"
              value={this.state.value}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <div
            style={{
              verticalAlign: 'bottom',
              display: 'inline-block',
              marginRight: '20px'
            }}
          >
            <CustomButton text="Search" handleClick={this.getFilteredRetailersList} />
          </div>
          {
            this.state.value.length > 0 &&
            <div
              style={{
                verticalAlign: 'bottom',
                display: 'inline-block',
              }}
            >
              <CustomButton text="Reset" handleClick={this.resetFilter} />
            </div>
          }
        </div>
        {
          dmoOrders.length > 0 &&
          <div style={{ marginTop: '40px', marginBottom: '20px', overflowX: "scroll" }}>
            <Table
              emptyMessage={this.state.loading ? <Spinner /> : 'No records found'}
              items={dmoOrders}
              style={{ tableLayout: "unset" }}
            >
              <Table.Column field="order_id" title="Order Id" />
              <Table.Column field="retailer_id" title="Retailer Id" />
              <Table.Column field="merchant_id" title="Merchant Id" />
              <Table.Column field="bank_rrn" title="Bank RRN" />
              <Table.Column field="txn_status" title="Transaction Status" />
              <Table.Column field="payer_amount" title="Payer Amount" />
            </Table>
          </div>
        }
        {
          this.state.dmoOrders && this.state.dmoOrders.length > 0 &&
          <Pagination
            activePage={parseInt(this.state.activePage)}
            itemsCountPerPage={this.pagesLimit}
            totalItemsCount={parseInt(this.state.dmoOrdersCount)}
            setPage={this.handlePageChange}
          />
        }
      </Layout>
    )
  }
}

export default ManageDmoOrders
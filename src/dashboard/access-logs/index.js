import React from "react"
import Layout from 'Components/layout'
import * as Api from '../../api'
import Pagination from 'Components/pagination'
import { Table } from '@auth0/cosmos'
import { Select, TextInput } from '@auth0/cosmos'
import { Icon, Spinner, List, Dialog } from '@auth0/cosmos'
import Moment from "moment"
import { exportCSV } from 'Utils/logic-utils'
import CustomButton from 'Components/button'
import { getQueryObj, getQueryUri } from 'Utils/url-utils'

class AccessLogs extends React.Component {
  constructor() {
    super()

    this.pagesLimit = 10
    this.state = {
      loadingAccessLog: true,
      downloadingAccessLog: false,
      accessLogs: [],
      toDate: new Date().toISOString(),
      fromDate: "",
      activePage: 1,
      filter: {
        to: "",
        from: ""
      },
      accessLogsCount: 0
    }

    this.handlePageChange = this.handlePageChange.bind(this)
    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.downLoadAccessLog = this.downLoadAccessLog.bind(this)
  }

  componentDidMount() {
    if (location.search.slice(1)) {
      this.setQueryParamas()
    } else {
      this.fetchDefaultData()
    }
  }

  fetchDefaultData() {
    this.setState({ accessLogs: [], accessLogsCount: 0 })
    //this.fetchOrganizationList({}, this.formatOrganizationList)
    this.fetchAccessLogs({
      offset: 0,
      limit: this.pagesLimit,
    })
  }

  setQueryParamas() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
      //this.filter[item[0]] = item[1]
    })
    this.setState({ accessLogs: [], accessLogsCount: 0, loadingAccessLog: true })

    if (queryObj.filter) {
      this.setState({
        fromDate: JSON.parse(decodeURI(queryObj.filter)).from
          ? JSON.parse(decodeURI(queryObj.filter)).from.substr(0, 10)
          : "",
        toDate: JSON.parse(decodeURI(queryObj.filter)).to.substr(0, 10)
      })
      this.fetchAccessLogs({
        offset: queryObj.activePage ? this.pagesLimit * (parseInt(queryObj.activePage) - 1) : 0,
        limit: this.pagesLimit,
        filter: JSON.parse(decodeURI(queryObj.filter))
      })
    } else {
      this.fetchAccessLogs({
        offset: queryObj.activePage ? this.pagesLimit * (parseInt(queryObj.activePage) - 1) : 0,
        limit: this.pagesLimit
      })
    }
  }

  fetchAccessLogs(payloadObj) {
    Api.fetchAccessLogs(payloadObj)
      .then((response) => {
        this.setState({
          accessLogs: response.access_logs,
          accessLogsCount: response.count,
          loadingAccessLog: false
        })
      })
      .catch((error) => {
        console.log("Error in fetching access logs")
      })
  }

  handleSearch() {
    let filter = {}

    if (this.state.fromDate) {
      filter = {
        from: new Date(this.state.fromDate),
        to: new Date(new Date(this.state.toDate).setHours(23, 59, 0)).toISOString()
      }
      this.setState({ toDate: (this.state.toDate).toString().substr(0, 10) })
    } else {
      filter = {
        to: new Date(new Date(this.state.toDate).setHours(23, 59, 0)).toISOString()
      }
    }

    const queryObj = {
      activePage: this.state.activePage,
      filter: JSON.stringify(filter)
    }
    this.setState({
      accessLogs: [],
      accessLogsCount: 0,
      loadingAccessLog: true,
      activePage: this.state.activePage,
      filter
    })
    history.pushState(queryObj, "access logs listing", `/admin/access-logs?${getQueryUri(queryObj)}`)

    this.fetchAccessLogs({
      limit: this.pagesLimit,
      offset: 0,
      filter
    })
  }

  downLoadAccessLog() {
    this.setState({ downloadingAccessLog: true })
    Api.downLoadAccessLogs({
      start_date: new Date(this.state.fromDate).toISOString(),
      end_date: new Date(this.state.toDate).toISOString()
    })
      .then((csv) => {
        this.setState({
          downloadingAccessLog: false
        })
        exportCSV(csv, 'AccessLog')
      })
      .catch((error) => {
        this.setState({
          downloadingAccessLog: false
        })
        console.log("Error in fetching access logs", err)
      })
  }

  handlePageChange(pageObj) {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    let queryParamsObj = {}

    let pageNumber = pageObj.activePage
    let offset = pageObj.offset

    this.setState({
      activePage: pageNumber,
      loadingAccessLog: true
    })

    if (queryObj.filter) {
      queryParamsObj = {
        activePage: pageObj.activePage,
        filter: (queryObj.filter)
      }
    } else {
      queryParamsObj = {
        activePage: pageObj.activePage,
      }
    }

    if (queryObj.filter) {
      let filterObj = {
        to: JSON.parse(decodeURI(queryObj.filter)).to,
        from: JSON.parse(decodeURI(queryObj.filter)).from
      }
      this.fetchAccessLogs({
        offset: pageObj.offset,
        limit: this.pagesLimit,
        filter: filterObj
      })

    } else {
      this.fetchAccessLogs({
        offset: pageObj.offset,
        limit: this.pagesLimit
      })
    }

    history.pushState(queryParamsObj, "access logs listing", `/admin/access-logs?${getQueryUri(queryParamsObj)}`)
  }

  handleDateChange(e) {
    this.setState({
      [e.target.name]: (e.target.value)
    })
  }

  resetFilter() {
    this.setState({
      toDate: new Date().toISOString(),
      fromDate: "",
      activePage: 1
    })
    this.fetchDefaultData()
    this.props.history.push(`/admin/access-logs`)
  }

  render() {
    const { accessLogs, loadingAccessLog, fromDate } = this.state
    return (
      <Layout title="Access Logs">
        <div style={{
          width: '100%',
          display: 'inline-block',
          verticalAlign: 'bottom',
          margin: '20px 0'
        }}
        >
          <div style={{
            width: '240px',
            display: 'inline-block',
            verticalAlign: 'bottom',
            marginRight: '20px'
          }}
          >
            <p style={{ margin: '10px 0' }}>From Date</p>
            <TextInput
              type="date"
              size="default"
              name="fromDate"
              max="9999-12-31"
              //defaultValue={this.state.fromDate}
              value={this.state.fromDate}
              onChange={(e) => this.handleDateChange(e)}
            />
          </div>
          <div style={{
            width: '240px',
            display: 'inline-block',
            verticalAlign: 'bottom',
            marginRight: '20px'
          }}
          >
            <p style={{ margin: '10px 0' }}>To Date</p>
            <TextInput
              type="date"
              size="default"
              name="toDate"
              max="9999-12-31"
              //defaultValue={this.state.toDate}
              value={this.state.toDate}
              onChange={(e) => this.handleDateChange(e)}
            />
          </div>
          <div
            style={{
              verticalAlign: 'bottom',
              display: 'inline-block',
              marginRight: '20px'
            }}
          >
            <CustomButton text="Search" handleClick={this.handleSearch} />
          </div>
          <div
            style={{
              verticalAlign: 'bottom',
              display: 'inline-block',
              marginRight: '20px'
            }}
          >
            <CustomButton text="Reset" handleClick={this.resetFilter} />
          </div>
          {
            fromDate.length > 0 &&
            <div
              style={{
                verticalAlign: 'bottom',
                display: 'inline-block',
                marginRight: '20px'
              }}
            >
              <CustomButton text="Download" handleClick={this.downLoadAccessLog} />
            </div>
          }
        </div>
        {
          <div style={{ marginTop: '40px', marginBottom: '20px' }}>
            <Table
              emptyMessage={this.state.loadingAccessLog ? <Spinner /> : 'No logs found'}
              items={accessLogs}
            >
              <Table.Column field="user_id" title="User Id" />
              <Table.Column field="actions" title="Created At">
                {item => (
                  Moment(item.created_at).format("DD-MM-YYYY h:mm:s A")
                )}
              </Table.Column>
              <Table.Column field="actions" title="Updated At">
                {item => (
                  Moment(item.updated_at).format("DD-MM-YYYY h:mm:s A")
                )}
              </Table.Column>
              <Table.Column field="actions" title="Sku Pricing ID">
                {item => (
                  JSON.parse(item.request_params).SkuPricingID
                )}
              </Table.Column>
              <Table.Column field="actions" title="Retailer ID">
                {item => (
                  JSON.parse(item.request_params).RetailerID
                )}
              </Table.Column>
              <Table.Column field="actions" title="Retailer Price">
                {item => (
                  JSON.parse(item.request_params).Price
                )}
              </Table.Column>
              <Table.Column field="actions" title="Status">
                {item => (
                  JSON.parse(item.request_params).IsActive ? "Active" : "Inactive"
                )}
              </Table.Column>
            </Table>
          </div>
        }
        {
          this.state.accessLogs && this.state.accessLogs.length > 0 &&
          <Pagination
            activePage={parseInt(this.state.activePage)}
            itemsCountPerPage={this.pagesLimit}
            totalItemsCount={parseInt(this.state.accessLogsCount)}
            setPage={this.handlePageChange}
          />
        }
      </Layout>
    )
  }
}

export default AccessLogs
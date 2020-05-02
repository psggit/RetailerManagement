import React from "react"
import Layout from 'Components/layout'
import Pagination from 'Components/pagination'
import { Table } from '@auth0/cosmos'
import { TextInput } from '@auth0/cosmos'
import CustomButton from 'Components/button'
import { Spinner } from '@auth0/cosmos'
import Moment from "moment"
import { fetchDmoSoa } from "./../../api"
import { getQueryObj, getQueryUri } from 'Utils/url-utils'
import PropTypes from "prop-types"


const endDate = new Date()
const startDate = new Date()
startDate.setDate(endDate.getDate() - 1)

class DmoSoa extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      activePage: 1,
      retailerId: parseInt(this.props.match.params.retailerId),
      offset: 0,
      loading: true,
      dmoSOACount: 0,
      dmoSOA: [],
      // toDate: endDate.toISOString(),
      // fromDate: startDate.toISOString(),
      toDate: '',
      fromDate: '',
      transaction_id: '',
      filter: {
        to_date: "",
        from_date: "",
        transaction_id: ""
      }
    }
    this.pagesLimit = 5

    this.fetchDmoSOAList = this.fetchDmoSOAList.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
    this.fetchDefaultData = this.fetchDefaultData.bind(this)
  }

  componentDidMount () {
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.fetchDefaultData()
    }
  }

  setQueryParamas () {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
      //this.filter[item[0]] = item[1]
    })
    this.setState({ retailerSOA: [], retailerSOACount: 0, loading: true })

    if (queryObj.filter) {
      this.setState({
        transaction_id: JSON.parse(decodeURI(queryObj.filter)).Transaction_id
          ? JSON.parse(decodeURI(queryObj.filter)).Transaction_id
          : "",
        fromDate: JSON.parse(decodeURI(queryObj.filter)).Fromdate
          ? JSON.parse(decodeURI(queryObj.filter)).Fromdate.substr(0, 10)
          : "",
        toDate: JSON.parse(decodeURI(queryObj.filter)).Todate
          ? JSON.parse(decodeURI(queryObj.filter)).Todate.substr(0, 10)
          : ""
      })
      this.fetchDmoSOAList({
        Offset: queryObj.activePage ? this.pagesLimit * (parseInt(queryObj.activePage) - 1) : 0,
        Limit: this.pagesLimit,
        Retailer_id: parseInt(this.props.match.params.retailerId),
        SOAfilterForDMO: JSON.parse(decodeURI(queryObj.filter))
      })
    } else {
      this.fetchDmoSOAList({
        Offset: queryObj.activePage ? this.pagesLimit * (parseInt(queryObj.activePage) - 1) : 0,
        Limit: this.pagesLimit,
        Retailer_id: parseInt(this.props.match.params.retailerId)
      })
    }
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleDateChange (e) {
    if (e.target.name === "toDate") {
      this.setState({
        [e.target.name]: e.target.value,
        fromDate: !this.state.fromDate ? new Date(e.target.value) : this.state.fromDate,
      })
    } else if (e.target.name === "fromDate") {
      this.setState({
        [e.target.name]: e.target.value,
        toDate: !this.state.toDate ? new Date(e.target.value) : this.state.toDate,
      })
    }
  }

  handleSearch () {
    const { activePage, offset } = this.state
    let SOAfilterForDMO = {}
    console.log("trans", this.state)
    if (this.state.fromDate) {
      SOAfilterForDMO = {
        Transaction_id: this.state.transaction_id,
        Fromdate: this.state.fromDate ? new Date(this.state.fromDate) : "",
        Todate: this.state.toDate ? new Date(new Date(this.state.toDate).setHours(23, 59, 0)) : ""
      }
    } else {
      SOAfilterForDMO = {
        Transaction_id: this.state.transaction_id,
        Fromdate: this.state.fromDate ? new Date(this.state.fromDate) : "",
        Todate: this.state.toDate ? new Date(new Date(this.state.toDate).setHours(23, 59, 0)) : ""
      }
    }

    console.log("filter", SOAfilterForDMO)

    const queryParamsObj = {
      activePage,
      offset,
      RetailerID: parseInt(this.props.match.params.retailerId),
      filter: JSON.stringify(SOAfilterForDMO)
    }

    this.setState({
      dmoSOA: [],
      dmoSOACount: 0,
      loading: true,
      activePage: 1,
      SOAfilterForDMO
    })
    history.pushState(queryParamsObj, "dmo soa listing", `/admin/retailer/dmo-soa/${this.props.match.params.retailerId}?${getQueryUri(queryParamsObj)}`)

    this.fetchDmoSOAList({
      Limit: this.pagesLimit,
      Offset: 0,
      Retailer_id: parseInt(this.props.match.params.retailerId),
      SOAfilterForDMO
    })
  }

  fetchDefaultData () {
    this.setState({ dmoSOA: [], dmoSOACount: 0, loading: true })
    this.fetchDmoSOAList({
      Offset: 0,
      Limit: this.pagesLimit,
      Retailer_id: parseInt(this.props.match.params.retailerId),
    })
  }

  resetFilter () {
    this.setState({
      transaction_id: "",
      // toDate: endDate,
      // fromDate: startDate,
      toDate: "",
      fromDate: "",
      activePage: 1
    })
    this.fetchDefaultData()
    this.props.history.push(`/admin/retailer/dmo-soa/${this.props.match.params.retailerId}`)
  }

  fetchDmoSOAList (payload) {
    fetchDmoSoa(payload)
      .then((response) => {
        if (Object.keys(response).length > 0) {
          this.setState({
            dmoSOA: response.transactions,
            dmoSOACount: response.Count,
            loading: false
          })
        } else {
          this.setState({
            loading: false
          })
        }
      })
      .catch((error) => {
        this.setState({
          loading: false
        })
        // eslint-disable-next-line no-console
        console.log("Error in fetching dmo soa", error)
      })
  }

  handlePageChange (pageObj) {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    let queryParamsObj = {}

    let pageNumber = pageObj.activePage
    let offset = pageObj.offset

    this.setState({ activePage: pageNumber, offset, loading: true })

    if (queryObj.filter) {
      queryParamsObj = {
        activePage: pageObj.activePage,
        filter: (queryObj.filter)
      }
      this.fetchDmoSOAList({
        Offset: pageObj.offset,
        Limit: this.pagesLimit,
        Retailer_id: parseInt(this.props.match.params.retailerId),
        SOAfilterForDMO: JSON.parse(decodeURI((queryObj.filter)))
      })
    } else {
      queryParamsObj = {
        activePage: pageObj.activePage,
      }
      this.fetchDmoSOAList({
        Offset: pageObj.offset,
        Limit: this.pagesLimit,
        Retailer_id: parseInt(this.props.match.params.retailerId),
      })
    }

    history.pushState(queryParamsObj, "dmo soa listing", `/admin/retailer/dmo-soa/${this.props.match.params.retailerId}?${getQueryUri(queryParamsObj)}`)
  }

  render () {
    const retailerId = this.props.match.params.retailerId
    const { loading, dmoSOA } = this.state
    return (
      <Layout title={`Retailer SOA (${retailerId})`}>
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
            <p style={{ margin: '10px 0' }}>Transaction ID</p>
            <TextInput
              type="text"
              size="default"
              name="transaction_id"
              value={this.state.transaction_id}
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
            <CustomButton text="Search"
              handleClick={this.handleSearch} />
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
        </div>
        {
          <div style={{ marginTop: '40px', marginBottom: '20px' }}>
            <Table
              emptyMessage={!loading && dmoSOA.length === 0 ? 'No records found' : <Spinner />}
              items={this.state.dmoSOA}
            //onRowClick={(e, item) => this.handleRowClick(e, item)}
            >
              <Table.Column field="Transaction_id" title="Transaction Id" />
              <Table.Column field="Type" title="Transaction Type" />
              <Table.Column field="Opening_balance" title="Opening Balance" />
              <Table.Column field="Closing_balance" title="Closing Balance" />
              <Table.Column field="Amount" title="Amount" />
              <Table.Column field="actions" title="Created At">
                {item => (
                  Moment(item.created_at).format("DD-MM-YYYY h:mm:s A")
                )}
              </Table.Column>
            </Table>
          </div>
        }
        {
          this.state.dmoSOA && this.state.dmoSOA.length > 0 &&
          <Pagination
            activePage={parseInt(this.state.activePage)}
            itemsCountPerPage={this.pagesLimit}
            totalItemsCount={parseInt(this.state.dmoSOACount)}
            setPage={this.handlePageChange}
          />
        }
      </Layout>
    )
  }
}

DmoSoa.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      retailerId: PropTypes.string,
    }),
  })
}
export default DmoSoa
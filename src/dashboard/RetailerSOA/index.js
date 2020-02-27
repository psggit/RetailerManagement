import React from "react"
import Layout from 'Components/layout'
import Pagination from 'Components/pagination'
import { Table } from '@auth0/cosmos'
import { TextInput } from '@auth0/cosmos'
import CustomButton from 'Components/button'
import { Spinner } from '@auth0/cosmos'
import Moment from "moment"
import { fetchRetailerSOA } from "./../../api"
import { getQueryObj, getQueryUri } from 'Utils/url-utils'
import PropTypes from "prop-types"


const endDate = new Date()
const startDate = new Date()
startDate.setDate(endDate.getDate() - 1) 

class RetailerSOA extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      activePage: 1,
      retailerId: parseInt(this.props.match.params.retailerId),
      offset: 0,
      loading: true,
      retailerSOACount: 0,
      retailerSOA: [],
      // toDate: endDate.toISOString(),
      // fromDate: startDate.toISOString(),
      toDate: '',
      fromDate: '',
      consumerId: '',
      filter: {
        to_date: "",
        from_date: "",
        consumer_id: ""
      }
    }
    this.pagesLimit = 10

    this.fetchRetailerSOAList = this.fetchRetailerSOAList.bind(this)
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
        consumerId: JSON.parse(decodeURI(queryObj.filter)).consumerId
          ? JSON.parse(decodeURI(queryObj.filter)).consumerId
          : "",
        fromDate: JSON.parse(decodeURI(queryObj.filter)).fromDate
          ? JSON.parse(decodeURI(queryObj.filter)).fromDate.substr(0, 10)
          : "",
        toDate: JSON.parse(decodeURI(queryObj.filter)).toDate
          ? JSON.parse(decodeURI(queryObj.filter)).toDate.substr(0, 10)
          : ""
      })
      this.fetchRetailerSOAList({
        Offset: queryObj.activePage ? this.pagesLimit * (parseInt(queryObj.activePage) - 1) : 0,
        Limit: this.pagesLimit,
        RetailerID: parseInt(this.props.match.params.retailerId),
        SOAfilter: JSON.parse(decodeURI(queryObj.filter))
      })
    } else {
      this.fetchRetailerSOAList({
        Offset: queryObj.activePage ? this.pagesLimit * (parseInt(queryObj.activePage) - 1) : 0,
        Limit: this.pagesLimit,
        RetailerID: parseInt(this.props.match.params.retailerId)
      })
    }
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleDateChange (e) {
    if(e.target.name === "toDate") {
      this.setState({
        [e.target.name]: e.target.value,
        fromDate: !this.state.fromDate ? new Date(new Date(e.target.value) - 1 * 24 * 60 * 60 * 1000) : this.state.fromDate,
      })
    } else if (e.target.name === "fromDate") {
      this.setState({
        [e.target.name]: e.target.value,
        toDate: new Date(new Date(e.target.value) - (-1) * 24 * 60 * 60 * 1000),
      })
    }
  }

  handleSearch () {
    const { activePage, offset } = this.state
    let SOAfilter = {}

    if (this.state.fromDate) {
      SOAfilter = {
        ConsumerID: parseInt(this.state.consumerId),
        Fromdate: this.state.fromDate ? new Date(this.state.fromDate) : "",
        Todate: this.state.toDate ? new Date(new Date(this.state.toDate).setHours(23, 59, 0)) : ""
      }
    } else {
      SOAfilter = {
        ConsumerID: parseInt(this.state.consumerId),
        Fromdate: this.state.fromDate ? new Date(this.state.fromDate) : "",
        Todate: this.state.toDate ? new Date(new Date(this.state.toDate).setHours(23, 59, 0)) : ""
      }
    }

    const queryParamsObj = {
      activePage,
      offset,
      RetailerID: parseInt(this.props.match.params.retailerId),
      filter: JSON.stringify(SOAfilter)
    }

    this.setState({
      retailerSOA: [],
      retailerSOACount: 0,
      loading: true,
      activePage: 1,
      SOAfilter
    })
    history.pushState(queryParamsObj, "retailer soa listing", `/admin/retailer/soa/${this.props.match.params.retailerId}?${getQueryUri(queryParamsObj)}`)

    this.fetchRetailerSOAList({
      Limit: this.pagesLimit,
      Offset: 0,
      RetailerID: parseInt(this.props.match.params.retailerId),
      SOAfilter
    })
  }

  fetchDefaultData () {
    this.setState({ retailerSOA: [], retailerSOACount: 0, loading: true })
    this.fetchRetailerSOAList({
      Offset: 0,
      Limit: this.pagesLimit,
      RetailerID: parseInt(this.props.match.params.retailerId),
    })
  }

  resetFilter () {
    this.setState({
      consumerId: "",
      // toDate: endDate,
      // fromDate: startDate,
      toDate: "",
      fromDate: "",
      activePage: 1
    })
    this.fetchDefaultData()
    this.props.history.push(`/admin/retailer/soa/${this.props.match.params.retailerId}`)
  }

  fetchRetailerSOAList (payload) {
    fetchRetailerSOA(payload)
      .then((response) => {
        if (Object.keys(response).length > 0) {
          this.setState({
            retailerSOA: response.transactions,
            retailerSOACount: response.Count,
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
        console.log("Error in fetching retailer soa", error)
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
      this.fetchRetailerSOAList({
        Offset: pageObj.offset,
        Limit: this.pagesLimit,
        RetailerID: parseInt(this.props.match.params.retailerId),
        SOAfilter: JSON.parse(decodeURI((queryObj.filter)))
      })
    } else {
      queryParamsObj = {
        activePage: pageObj.activePage,
      }
      this.fetchRetailerSOAList({
        Offset: pageObj.offset,
        Limit: this.pagesLimit,
        RetailerID: parseInt(this.props.match.params.retailerId),
      })
    }

    history.pushState(queryParamsObj, "retailer soa listing", `/admin/retailer/soa/${this.props.match.params.retailerId}?${getQueryUri(queryParamsObj)}`)
  }

  render () {
    const retailerId = this.props.match.params.retailerId
    const { loading, retailerSOA } = this.state
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
            <p style={{ margin: '10px 0' }}>Consumer ID</p>
            <TextInput
              type="text"
              size="default"
              name="consumerId"
              value={this.state.consumerId}
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
              emptyMessage={!loading && retailerSOA.length === 0 ? 'No records found' : <Spinner />}
              items={this.state.retailerSOA}
              //onRowClick={(e, item) => this.handleRowClick(e, item)}
            >
              <Table.Column field="order_id" title="Order Id" />
              <Table.Column field="order_type" title="Order Type" />
              <Table.Column field="consumer_id" title="Consumer Id" />
              <Table.Column field="cart_total" title="Cart Total" />
              <Table.Column field="gift_wallet_amount" title="Gift Wallet Amount" />
              <Table.Column field="hipbar_wallet_amount" title="Hipbar Wallet Amount" />
              <Table.Column field="promo_used" title="Promo Used" />
              <Table.Column field="promo_cashback" title="Promo Cashback" />
              <Table.Column field="brands" title="Cart Items">
                {item => (
                  <div
                    title={item.brands}
                    style={{
                      overflow: "hidden",
                      width: "100px",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis"
                    }}
                  >
                    {item.brands}
                  </div>
                )}
              </Table.Column>
              <Table.Column field="actions" title="Created At">
                {item => (
                  Moment(item.created_at).format("DD-MM-YYYY h:mm:s A")
                )}
              </Table.Column>
            </Table>
          </div>
        }
        {
          this.state.retailerSOA && this.state.retailerSOA.length > 0 &&
          <Pagination
            activePage={parseInt(this.state.activePage)}
            itemsCountPerPage={this.pagesLimit}
            totalItemsCount={parseInt(this.state.retailerSOACount)}
            setPage={this.handlePageChange}
          />
        }
      </Layout>
    )
  }
}

RetailerSOA.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      retailerId: PropTypes.string,
    }),
  })
}
export default RetailerSOA
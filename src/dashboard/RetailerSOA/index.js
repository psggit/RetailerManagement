import React from "react"
import Layout from 'Components/layout'
import Pagination from 'Components/pagination'
import { Table } from '@auth0/cosmos'
import { Spinner } from '@auth0/cosmos'
import Moment from "moment"
import { fetchRetailerSOA } from "./../../api"
import { getQueryObj, getQueryUri } from 'Utils/url-utils'
import PropTypes from "prop-types"


class RetailerSOA extends React.Component {
  constructor (props) {
    super(props)
 
    this.state = {
      activePage: 1,
      retailerId: parseInt(this.props.match.params.retailerId),
      offset: 0,
      loading: true,
      retailerSOACount: 0,
      retailerSOA: []
    }
    this.pagesLimit = 10

    this.fetchRetailerSOAList = this.fetchRetailerSOAList.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.setQueryParamas = this.setQueryParamas.bind(this)
  }

  componentDidMount () {
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.fetchRetailerSOAList({
        Offset: 0,
        Limit: this.pagesLimit,
        RetailerID: parseInt(this.props.match.params.retailerId)
      })
    }
  }

  setQueryParamas () {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
      this.filter[item[0]] = item[1]
    })
    this.setState({ retailerSOA: [], retailerSOACount: 0, loading: true })
    if (queryObj.column && queryObj.column.trim().length > 0) {
      this.fetchRetailerSOAList({
        Offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
        Limit: this.pagesLimit,
        RetailerID: queryObj.retailerId
      })
    } else {
      this.fetchRetailerSOAList({
        Offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
        Limit: this.pagesLimit,
        RetailerID: parseInt(this.props.match.params.retailerId)
      })
    }
  }
  
  fetchRetailerSOAList (payload) {
    fetchRetailerSOA(payload)
    .then((retailerSOAData) => {
      if(Object.keys(retailerSOAData) > 0) {
        this.setState({
          retailerSOA: retailerSOAData.transactions,
          retailerSOACount: retailerSOAData.Count,
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
    let pageNumber = pageObj.activePage
    let offset = pageObj.offset
    this.setState({ activePage: pageNumber, offset, loading: true })

    let queryParamsObj = {
      offset: pageObj.offset,
      activePage: pageObj.activePage,
      retailerId: parseInt(this.props.match.params.retailerId)
    }

    this.fetchRetailerSOAList({
      Offset: pageObj.offset,
      Limit: this.pagesLimit,
      RetailerID: parseInt(this.props.match.params.retailerId)
    })
    history.pushState(queryParamsObj, "retailer soa listing", `/admin/retailer/soa/${this.props.match.params.retailerId}?${getQueryUri(queryParamsObj)}`)
  }

  render () {
    const retailerId = this.props.match.params.retailerId
    const {loading, retailerSOA} = this.state
    return (
      <Layout title={`Retailer SOA (${retailerId})`}>
        {
          <div style={{ marginTop: '40px', marginBottom: '20px' }}>
            <Table
              emptyMessage={!loading && retailerSOA.length === 0 ? 'No records found' : <Spinner /> }
              items={this.state.retailerSOA}
              onRowClick={(e, item) => this.handleRowClick(e, item)}
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
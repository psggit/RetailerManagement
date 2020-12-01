import React from "react"
import Layout from 'Components/layout'
import { Table } from '@auth0/cosmos'
import { Spinner } from '@auth0/cosmos'
import { listDeliveryFee } from "./../../api"
import CustomButton from 'Components/button'
import { Button } from '@auth0/cosmos'
import { NavLink } from 'react-router-dom'
import Pagination from 'Components/pagination'
import Switch2 from 'Components/switch'
import ModalBox from 'Components/ModalBox'
import * as Api from './../../api'
import ModalHeader from 'Components/ModalBox/ModalHeader'
import ModalBody from 'Components/ModalBox/ModalBody'
import ModalFooter from '../../components/ModalBox/ModalFooter'
//import Pagination from "../../components/pagination"
import { getQueryUri,getQueryObj } from 'Utils/url-utils'

class DeliveryFeeList extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      activePage: 1,
      retailerId: parseInt(this.props.match.params.retailerId),
      offset: 0,
      loadingDeliveryFee: false,
      deliveryFeeList: [],
      deliveryFeeCount: 0,
      feeId: "",
      feeStatus: false
    }
    this.pagesLimit = 10

    this.fetchDeliveryFeeList = this.fetchDeliveryFeeList.bind(this)
    this.handleEditDeliveryFee = this.handleEditDeliveryFee.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.onToggleChange = this.onToggleChange.bind(this)
    this.setDialogState = this.setDialogState.bind(this)
    this.updateStatus = this.updateStatus.bind(this)
  }

  componentDidMount () {
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.fetchDeliveryFeeList({
        offset: 0,
        limit: this.pagesLimit,
        retailer_id: parseInt(this.props.match.params.retailerId)
      })
    }
  }

  setQueryParamas () {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
    })
    this.setState({ deliveryFeeList: [], deliveryFeeCount: 0, loadingDeliveryFee: true })
    
    this.fetchDeliveryFeeList({
      offset: queryObj.activePage ? this.pagesLimit * (parseInt(queryObj.activePage) - 1) : 0,
      limit: this.pagesLimit,
      retailer_id: parseInt(this.props.match.params.retailerId)
    })
  }

  fetchDeliveryFeeList (payloadObj) {
    this.setState({ deliveryFeeList: [], deliveryFeeCount: 0, loadingDeliveryFee: true })
    listDeliveryFee(payloadObj)
      .then((response) => {
        if (Object.keys(response.retailerdeliveryfeeslab).length > 0) {
          this.setState({
            deliveryFeeList: response.retailerdeliveryfeeslab,
            deliveryFeeCount: response.count,
            loadingDeliveryFee: false
           })}
       })
      .catch((error) => {
        this.setState({ loadingDeliveryFee: false})
        console.log("Error in fetching delivery fee", error)
      })
  }

  handlePageChange (pageObj) {
    let queryParamsObj = {}
    let pageNumber = pageObj.activePage
    let offset = pageObj.offset

    this.setState({ activePage: pageNumber, offset, loadingDeliveryFee: true })

    queryParamsObj = {
      activePage: pageObj.activePage
    }

    this.fetchDeliveryFeeList({
      offset: pageObj.offset,
      limit: this.pagesLimit,
      retailer_id: parseInt(this.props.match.params.retailerId)
    })
    history.pushState(queryParamsObj, "delivery fee listing", `/admin/delivery-fee/${this.props.match.params.retailerId}?${getQueryUri(queryParamsObj)}`)
  }

  handleEditDeliveryFee (e,item) {
    e.stopPropagation()
    this.props.history.push(`/admin/delivery-fee/edit/${item.retailer_id}`, item)
  }

  onToggleChange (item) {
    this.setState({
      mountDialog: true,
      feeId: item.id,
      feeStatus: item.is_active
    })
  }

  setDialogState() {
    this.setState({ mountDialog: false })
  }

  updateStatus() {
    this.setDialogState()
    Api.updateDeliveryFeeStatus({
      id: this.state.feeId,
      is_active: this.state.feeStatus ? false : true
    })
      .then((response) => {
        location.reload()
      })
      .catch((error) => {
        console.log("Error in updating delivery fee status", error)
        error.response.json().then(json => { Notify("danger", json.message) })
      })
  }
  
  render () {
    const { loadingDeliveryFee, deliveryFeeList, retailerId } = this.state
    return (
      <Layout title={`Delivery Fee (Retailer ID: ${retailerId})`}>
        <div style={{ width: '200px', marginTop: '20px' }}>
          <NavLink to={`/admin/delivery-fee/create/${retailerId}`}>
            <div style={{ marginTop: '20px' }}>
              <CustomButton text="CREATE DELIVERY FEE" />
            </div>
          </NavLink>
        </div>
        {
          <div style={{ marginTop: '40px', marginBottom: '20px' }}>
            <Table
              emptyMessage={!loadingDeliveryFee && deliveryFeeList.length === 0 ? 'No records found' : <Spinner />}
              items={this.state.deliveryFeeList}
            >
              <Table.Column field="actions">
                {item => (
                  <Button icon="pencil" onClick={(e) => this.handleEditDeliveryFee(e, item, 'edit')} />
                )}
              </Table.Column>
              <Table.Column field="id" title="ID" />
              <Table.Column field="cart_min" title="Cart Min" />
              <Table.Column field="cart_max" title="Cart Max" />
              <Table.Column field="flat_value" title="Flat Value" />
              <Table.Column field="percentage_value" title="Percentage Value" />
              <Table.Column field="fee_min" title="Fee Min" />
              <Table.Column field="fee_max" title="Fee Max" />
              <Table.Column field="actions" title="Start Time">
                {item => (
                  <div>{item.start_time.substring(11, 19)}</div>
                )}
              </Table.Column>
              <Table.Column field="actions" title="End Time">
                {item => (
                  <div>{item.end_time.substring(11, 19)}</div>
                )}
              </Table.Column>
              <Table.Column field="is_active" title="STATUS">
                {items => (
                  <Switch2 on={items.is_active ? true : false} accessibleLabels={[]} onToggle={this.onToggleChange} value={items} />
                )}
              </Table.Column>
            </Table>
          </div> 
        }
        { 
          this.state.deliveryFeeList && this.state.deliveryFeeList.length > 0 &&
          <Pagination
            activePage={parseInt(this.state.activePage)}
            itemsCountPerPage={this.pagesLimit}
            totalItemsCount={parseInt(this.state.deliveryFeeCount)}
            setPage={this.handlePageChange}
          />
        }
        {
          this.state.mountDialog &&
          <ModalBox>
            <ModalHeader>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '18px' }}>{this.state.feeStatus ? 'UnActivate' : 'Activate'} Delivery Fee</div>
              </div>
            </ModalHeader>
            <ModalBody height="60px">
              <table className="table--hovered">
                <tbody>
                  Are you sure you want to {this.state.feeStatus ? 'UnActivate' : 'Activate'} Delivery Fee ? {this.state.feeId}
                </tbody>
              </table>
            </ModalBody>
            <ModalFooter>
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontWeight: '600' }}>
                <button className="btn btn-primary" onClick={() => this.updateStatus()}> Yes </button>
                <button className="btn btn-secondary" onClick={() => this.setDialogState()}> Cancel </button>
              </div>
            </ModalFooter>
          </ModalBox>
        }
      </Layout>
    )
  }
}

export default DeliveryFeeList
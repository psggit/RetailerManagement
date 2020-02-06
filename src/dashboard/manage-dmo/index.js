/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React from "react"
import { NavLink } from 'react-router-dom'
import Layout from 'Components/layout'
import CustomButton from 'Components/button'
import { Select, TextInput } from '@auth0/cosmos'
import { Table } from '@auth0/cosmos'
import Switch2 from 'Components/switch'
import { Button } from '@auth0/cosmos'
import * as Api from './../../api'
import Pagination from 'Components/pagination'
import ModalBox from 'Components/ModalBox'
import ModalHeader from 'Components/ModalBox/ModalHeader'
import ModalBody from 'Components/ModalBox/ModalBody'
import ModalFooter from '../../components/ModalBox/ModalFooter'
import { getQueryObj, getQueryUri } from 'Utils/url-utils'
import { Spinner } from '@auth0/cosmos'


class ManageDMO extends React.Component {

  constructor () {
    super()
    this.state = {
      activePage: 1,
      offset: 0,
      loading: true,
      dmoListCount: 0,
      dmoData: [],
      dmoStatus:'',
      retailerId: '',
      eazypayId:'',
      virtualAddress:'',
      mountDialog: false,
      operators: [
        { text: 'EQUAL', value: 'EQUAL' }
      ],
      column: 'ID',
      operator: 'EQUAL',
      value: ''
    }

    this.filter = {
      column: '',
      operator: '',
      value: ''
    }
    this.pagesLimit=10
    this.onToggleChange = this.onToggleChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.setDialogState = this.setDialogState.bind(this)
    this.deactivateDmo = this.deactivateDmo.bind(this)
    this.fetchDefaultData = this.fetchDefaultData.bind(this)
    this.fetchDmoList = this.fetchDmoList.bind(this)
    this.getFilteredDmoList = this.getFilteredDmoList.bind(this)
    this.callback= this.callback.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleEditDmoDetail = this.handleEditDmoDetail.bind(this)
  }

  fetchDefaultData () {
    this.setState({ dmoData: [], dmoListCount: 0 })
    this.fetchDmoList({
      offset: 0,
      limit: this.pagesLimit,
    }, this.setResponseData, this.failureCallback)
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
      this.filter[item[0]] = item[1]
    })
    this.setState({ dmoData: [], dmoListCount: 0, loading: true })
    if (queryObj.column && queryObj.column.trim().length > 0) {
      this.fetchDmoList({
        offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
        limit: this.pagesLimit,
        filter: this.filter
      })
    } else {
      this.fetchDmoList({
        offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
        limit: this.pagesLimit,
      })
    }
  }

  fetchDmoList (payloadObj) {
    Api.fetchDmoList(payloadObj)
      .then((response) => {
        if (response && response.dmo_details) {
          this.setState({ dmoData: response.dmo_details, dmoListCount: response.count, loading: false })
        } else {
          this.setState({ dmoData: [], dmoListCount: 0, loading: false })
        }
      })
      .catch((error) => {
        this.setState({ dmoData: [], dmoListCount: 0, loading: false })
      })
  }

  handleChange (e) {
    if (e.target.name === "column" && (e.target.value === "ID")) {
      this.setState({
        operators: [
          { text: 'EQUAL', value: 'EQUAL' },
        ],
        operator: 'EQUAL'
      })
    } else if (e.target.name === "column") {
      this.setState({
        operators: [
          { text: 'EQUAL', value: 'EQUAL' }
        ]
      })
    } else if (e.target.name === "value") {
      this.setState({ offset: 0, activePage: 1 })
    }

    this.setState({ [e.target.name]: (e.target.value).toString() })
  }

  onToggleChange (item, value) {
    this.setState({ 
      mountDialog: true, 
      eazypayId:item.eazypay_id, 
      dmoStatus: item.is_blocked,
      virtualAddress: item.virtual_address
    })
  }

  getFilteredDmoList () {
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
      dmoData: [],
      dmoListCount: 0,
      loading: true,
      offset,
      activePage,
      column,
      operator,
      value
    })

    history.pushState(queryObj, "dmo listing", `/admin/dmo?${getQueryUri(queryObj)}`)

    this.fetchDmoList({
      limit: this.pagesLimit,
      offset: 0,
      filter: this.filter
    })
  }

  deactivateDmo () {
    this.setDialogState()
    Api.deactivateDmo({
      virtual_address:this.state.virtualAddress,
      eazypay_id:this.state.eazypayId,
      is_blocked: this.state.dmoStatus === "true" ? false : true
    }, this.callback)
  }

  callback () {
    this.handlePageChange({
      activePage: this.state.activePage,
      offset: this.state.offset
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
      this.fetchDmoList({
        offset: pageObj.offset,
        limit: this.pagesLimit,
        filter: filterObj
      }, this.setResponseData, this.failureCallback)

    } else {

      this.fetchDmoList({
        offset: pageObj.offset,
        limit: this.pagesLimit
      }, this.setResponseData, this.failureCallback)
    }
    history.pushState(queryParamsObj, "dmo listing", `/admin/dmo?${getQueryUri(queryParamsObj)}`)
  }

  handleEditDmoDetail (e, item, action) {
    e.stopPropagation()
    this.props.history.push(`/admin/dmo/edit/${item.retailer_id}`, item)
  }

  resetFilter () {
    this.setState({
      column: 'ID',
      operator: 'EQUAL',
      value: ''
    })
    this.fetchDefaultData()
    this.props.history.push(`/admin/dmo`)
  }

  setDialogState () {
    this.setState({ mountDialog: false })
  }

  render () {
    return (
      <Layout title="Manage DMO">

        <div style={{ width: '200px', marginTop: '20px' }}>
          <NavLink to={`/admin/dmo/create`}>
            <CustomButton text="CREATE DMO" />
          </NavLink>
        </div>

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
                { text: 'ID', value: 'ID' }
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
            <CustomButton text="Search" handleClick={this.getFilteredDmoList} />
          </div>
          <div
            style={{
              verticalAlign: 'bottom',
              display: 'inline-block',
            }}
          >
            <CustomButton text="Reset" handleClick={this.resetFilter} />
          </div>
          {
            <div style={{ marginTop: '40px', marginBottom: '20px' }}>
              <Table
                emptyMessage={this.state.loading ? <Spinner /> : 'No records found'}
                items={this.state.dmoData}
              >
                <Table.Column field="actions">
                  {item => (
                    <Button icon="pencil" onClick={(e) => this.handleEditDmoDetail(e, item, 'edit')} />
                  )}
                </Table.Column>
                  <Table.Column field="retailer_id" title="Retailer ID"/>
                <Table.Column field="merchant_legal_name" title="Merchant Name" />
                <Table.Column field="merchant_address" title="Merchant Address" />
                <Table.Column field="merchant_state" title="State" />
                <Table.Column field="merchant_city" title="City" />
                <Table.Column field="eazypay_id" title="Eazypay Merchant ID" />
                <Table.Column field="virtual_address" title="VPA" />
                <Table.Column field="is_blocked" title="DMO Status">
                  {items => (
                    <Switch2 on={items.is_blocked === 'true' ? true : false} accessibleLabels={[]} onToggle={this.onToggleChange} value={items} />
                  )}
                </Table.Column>
              </Table>
            </div>
          }
          {
            this.state.mountDialog &&
            <ModalBox>
              <ModalHeader>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '18px' }}>{this.state.dmoStatus === "true" ? 'Unblock' : 'Block'} DMO</div>
                </div>
              </ModalHeader>
              <ModalBody height="60px">
                <table className="table--hovered">
                  <tbody>
                    Are you sure you want to {this.state.dmoStatus === "true" ? 'Unblock' : 'Block'} this merchant ? {this.state.retailerId}
                  </tbody>
                </table>
              </ModalBody>
              <ModalFooter>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontWeight: '600' }}>
                  <button className="btn btn-primary" onClick={() => this.deactivateDmo()}> Yes </button>
                  <button className="btn btn-secondary" onClick={() => this.setDialogState()}> Cancel </button>
                </div>
              </ModalFooter>
            </ModalBox>
          }
          {
            this.state.dmoData && this.state.dmoData.length > 0 &&
            <Pagination
              activePage={parseInt(this.state.activePage)}
              itemsCountPerPage={this.pagesLimit}
              totalItemsCount={parseInt(this.state.dmoListCount)}
              setPage={this.handlePageChange}
            />
          }
        </div>
      </Layout>
    );
  }
}

export default ManageDMO

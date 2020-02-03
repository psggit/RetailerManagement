/* eslint-disable no-undef */
import React from "react"
import { NavLink } from 'react-router-dom'
import Layout from 'Components/layout'
import CustomButton from 'Components/button'
import { Select, TextInput } from '@auth0/cosmos'
import { Table } from '@auth0/cosmos'
import Switch2 from 'Components/switch'
import { Button } from '@auth0/cosmos'
import { dmoData } from './mock-data'
import * as Api from './../../api'
import Pagination from 'Components/pagination'
import ModalBox from 'Components/ModalBox'
import ModalHeader from 'Components/ModalBox/ModalHeader'
import ModalBody from 'Components/ModalBox/ModalBody'
import ModalFooter from '../../components/ModalBox/ModalFooter';

class ManageDMO extends React.Component {

  constructor () {
    super()
    this.state = {
      activePage: 1,
      offset: 0,
      loading: true,
      dmoListCount: dmoData.count,
      dmoData: dmoData.data,
      dmo_status: dmoData.data,
      retailerId: '',
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
  }


  handleChange (e) {
    if (e.target.name === "column" && e.target.value === "ID") {
      this.setState({
        operators: [
          { text: 'EQUAL', value: 'EQUAL' },
        ],
        operator: 'EQUAL'
      })
    }

    this.setState({ [e.target.name]: e.target.value })
  }

  onToggleChange (items, value) {
    this.setState({ 
      mountDialog: true, 
      retailerId: items.id
    })
  }

  getFilteredDmoList () {
    const { column, operator, value, activePage, offset } = this.state

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
      organizationData: [],
      organisationCount: 0,
      loading: true,
      offset,
      activePage,
      column,
      operator,
      value,
    })
    history.pushState(queryObj, "organisation listing", `/admin/organization?${getQueryUri(queryObj)}`)
  }

  deactivateDmo () {
    console.log("dmodata")
    this.setDialogState()
    Api.deactivateDmo({
      Id: this.state.retailerId,
      BranchStatus: this.state.retailerStatus === "true" ? "false" : "true"
    }, this.callback)
  }

  setDialogState () {
    this.setState({ mountDialog: false })
  }

  render () {
    return (
      <Layout title="Manage DMO">

        <div style={{ width: '200px', marginTop: '20px' }}>
          <NavLink to={`/admin/retailer/create`}>
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
                items={this.state.dmoData}
                //onRowClick={(evt, item) => alert(`${item.name} was clicked!`)}
              >
                <Table.Column field="actions">
                  {item => (
                    <Button icon="pencil" onClick={(e) => this.editOutletDetail(e, item, 'edit')} />
                  )}
                </Table.Column>
                  <Table.Column field="dmo_id" title="Retailer ID"/>
                <Table.Column field="merchant_name" title="Merchant Name" />
                <Table.Column field="merchant_adress" title="Merchant Address" />
                <Table.Column field="state" title="State" />
                <Table.Column field="city" title="City" />
                <Table.Column field="easypay_merchant_id" title="Eazypay Merchant ID" />
                <Table.Column field="qr_code" title="QR Code" />
                <Table.Column field="dmo_status" title="DMO Status">
                  {items => (
                    <Switch2 on={items.dmo_status === 'active' ? true : false} accessibleLabels={[]} onToggle={this.onToggleChange} value={items} />
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
                  <div style={{ fontSize: '18px' }}>{this.state.dmo_status === "active" ? 'Unblock' : 'Block'} DMO</div>
                </div>
              </ModalHeader>
              <ModalBody height="60px">
                <table className="table--hovered">
                  <tbody>
                    Are you sure you want to {this.state.dmo_status === "active" ? 'Unblock' : 'Block'} this merchant ? {this.state.outletName} {this.state.retailerId}
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
            // this.state.dmoData && this.state.dmoDataData.length > 0 &&
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

import React from 'react'
import Layout from 'Components/layout'
import { Table } from '@auth0/cosmos'
import { Icon, Spinner, List } from '@auth0/cosmos'
import { Select, TextInput } from '@auth0/cosmos'
import { Button } from '@auth0/cosmos'
import {retailerData} from './../../mockData'
import Pagination from 'Components/pagination'
import Notify from 'Components/notify'
import { getQueryObj, getQueryUri } from 'Utils/url-utils'
import { NavLink } from 'react-router-dom'
import Switch2 from 'Components/switch'

class ManageRetailer extends React.Component {

    constructor() {
        super()
        this.defaultFilters = {
           searchField: '',
           searchOperator: '',
           searchText: ''
        }
        this.state = {
            activePage: 1,
            pageOffset: 0,
            loading: false,
            retailerListCount: 0,
            data: [],
            organizationList: [],
            operators:  [
                {text: 'ID', value: 'ID'},
                {text: 'LIKE', value: 'LIKE'},
                {text: 'IGNORE CASE', value: 'IGNORE CASE'},
            ],
            ...this.defaultFilters
        }

        this.filter = {
            searchField: '',
            searchOperator: '',
            searchText: ''
        }
    
        this.pagesLimit = 5
        this.handlePageChange = this.handlePageChange.bind(this)
        this.resetFilter = this.resetFilter.bind(this)
        this.handleChange = this.handleChange.bind(this)
        //this.handleOrganizationChange = this.handleOrganizationChange.bind(this)
        this.getFilteredRetailersList = this.getFilteredRetailersList.bind(this)
        this.fetchDefaultData = this.fetchDefaultData.bind(this)
        this.fetchRetailerList = this.fetchRetailerList.bind(this)
        this.setResponseData = this.setResponseData.bind(this)
        this.editOutletDetail = this.editOutletDetail.bind(this)
        this.onToggleChange = this.onToggleChange.bind(this)
        this.fetchOrganizationList = this.fetchOrganizationList.bind(this)
        this.formatOrganizationList = this.formatOrganizationList.bind(this)
    }

    fetchDefaultData() {
        this.fetchOrganizationList(this.formatOrganizationList)
        this.fetchRetailerList({
            offset: 0,
            limit: this.pagesLimit,
            filter: null
        }, this.setResponseData)
    }

    componentDidMount() {
        if (location.search.length) {
            this.setQueryParamas()
        } else {
            this.fetchDefaultData()
        }
    }
    
    setQueryParamas() {
        const queryUri = location.search.slice(1)
        const queryObj = getQueryObj(queryUri)

        Object.entries(queryObj).forEach((item) => {
            this.setState({ [item[0]]: item[1] })
            this.filter[item[0]] = item[1]
        })

        this.fetchRetailerList({
            offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
            limit: this.pagesLimit,
            filter: this.filter
        }, this.setResponseData)
    }

    fetchRetailerList(payloadObj, successCallback) {
        console.log("payload obj", payloadObj)
        this.setState({ data: [], retailerListCount: 100 })
        // POST({
        //   api: '/excisePortal/ottpHistory',
        //   apiBase: 'agamotto',
        //   handleError: true,
        //   data: payloadObj
        // })
        //   .then((json) => {
        //     this.setState({
        //       data: json.data,
        //       count: json.count,
        //       loading: false
        //     })
               //successCallback(json)
        //   })
        //   .catch(err => {
        //     err.response.json().then(json => { Notify("danger", json.message) })
        //   })
    }

    fetchOrganizationList(organizationListSuccessCallback) {
        this.setState({organizationList: []})
        // POST({
        //   api: '/excisePortal/ottpHistory',
        //   apiBase: 'agamotto',
        //   handleError: true,
        //   data: {}
        // })
        //   .then((json) => {
        //     this.setState({
        //       data: json.data,
        //       count: json.count,
        //       loading: false
        //     })
               //organizationListSuccessCallback(json)
        //   })
        //   .catch(err => {
        //     err.response.json().then(json => { Notify("danger", json.message) })
        //   })
    }

    getFilteredRetailersList() {
        const { searchField, searchOperator, searchText } = this.state

        this.filter = {
            searchField: searchField,
            searchOperator: searchOperator,
            searchText: searchText
        }
        //console.log("Filtered params", "field", searchField, "operatr", searchOperator, "text", searchText)
        
        const queryObj = {
            searchField: searchField,
            searchOperator: searchOperator,
            searchText: searchText,
            offset: 0,
            activePage: 1,
        }
    
        history.pushState(queryObj, "organisation listing", `/home/manage-retailer?${getQueryUri(queryObj)}`)
    
        this.fetchRetailerList({
            limit: this.pagesLimit,
            offset: 0,
            filter: this.filter
        }, this.setResponseData)
    }

    formatOrganizationList(data) {
        console.log("Fetched org list with state details", data)
    }

    setResponseData(response) {
        console.log("response", response)
    }

    handlePageChange(pageObj) {
        //console.log("handle page change", "active page", pageObj.activePage, "offset", pageObj.offset)
        this.setState({activePage: pageObj.activePage, pageOffset: pageObj.offset})
    }

    handleChange(e) {
        //console.log("event", e.target.value, e.target.name)
        this.setState({[e.target.name]: e.target.value})  
        if(e.target.name === "searchField" && e.target.value === "ID") {
            this.setState({
                operators: [
                    {text: 'ID', value: 'ID'},
                ]
            })
        }
    }

    // handleOrganizationChange(e) {

    // }

    editOutletDetail(item, action) {
        //console.log("item", item, this.props.history)
        this.props.history.push(`/home/manage-retailer/edit-retailer/${item.id}`, item)
    }

    resetFilter() {
        this.setState({
            searchField: '',
            searchOperator: '',
            searchText: ''
        })
    }

    onToggleChange(value, item) {
        console.log("On toggle change", value, item)
    }

    render() {
        //const { activePage, pageOffset, itemCount} = this.state
        return (
            <Layout title="Manage Retailer">
                <NavLink to={`/home/manage-retailer/create-retailer`}>
                    <div style={{marginTop: '20px'}}>
                        <Button> Create Retailer </Button>
                    </div>
                </NavLink>
               
                <div style={{marginTop: '20px'}}>
                    <div style={{
                            width: '210px',
                            display: 'inline-block',
                            verticalAlign: 'bottom',
                            marginRight: '20px'
                        }}
                    >
                        <p style={{ margin: '10px 0' }}>Retailer Field</p>
                        <Select
                            placeholder="Select an field..."
                            value={this.state.searchField}
                            name="searchField"
                            options={[
                                // { text: 'All', value: 'all' },
                                { text: 'ID', value: 'ID' },
                                { text: 'ORGANISATION NAME', value: 'Organisation name' },
                                { text: 'CITY', value: 'City'}
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
                            value={this.state.searchOperator}
                            name="searchOperator"
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
                            name="searchText"
                            value={this.state.searchText}
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
                        <Button onClick={() => this.getFilteredRetailersList()}>Search</Button>
                    </div>
                    <div
                        style={{
                            verticalAlign: 'bottom',
                            display: 'inline-block',
                        }}
                    >
                        <Button onClick={() => this.resetFilter()}>Reset</Button>
                    </div>
                </div>
                {
                    this.state.loading &&
                    <div style={{ marginTop: '40px'}}>
                        <Table
                            loading
                            items={[]}
                        >   
                            <Table.Column field="id" title="ID" />
                            <Table.Column field="outletName" title="Outlet Name" />
                            <Table.Column field="outletAddress" title="Outlet Address" />
                            {/* <Table.Column field="outletsCount" title="Outlets Count" width="13%"/>
                            <Table.Column field="selectedKycIdx" title="KYC Status" width="10%"/> */}
                            <Table.Column field="state" title="State" />
                            <Table.Column field="city" title="City" />
                            {/* <Table.Column field="cinNumber" title="CIN Number" width="15%"/> */}
                        </Table>
                    </div>
                }
                {
                    !this.state.loading &&
                    <div style={{ marginTop: '40px', marginBottom: '20px' }}>
                        <Table
                            emptyMessage={this.state.loading ? <Spinner /> : 'No records found'}
                            items={retailerData}
                        >
                            <Table.Column field="actions">
                                {item => (
                                    <Button icon="pencil" onClick={() => this.editOutletDetail(item, 'edit')} />
                                )}
                            </Table.Column>
                            <Table.Column field="id" title="ID"/>
                            <Table.Column field="outletName" title="Outlet Name"/>
                            <Table.Column field="outletAddress" title="Outlet Address"/>
                            {/* <Table.Column field="retailerStatus" title="Retailer Status"/> */}
                            <Table.Column field="state" title="State"/>
                            <Table.Column field="city" title="City"/>
                            <Table.Column field="actions" title="Outlet Status">
                                {item => (
                                    <Switch2 on={item.retailerStatus === 'active' ? true : false} accessibleLabels={[]} onToggle={this.onToggleChange} value={item} />
                                )}
                            </Table.Column>
                        </Table>
                    </div>
                }
                {
                    this.state.data.length > 0 &&
                    <Pagination 
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.pagesLimit}
                        totalItemsCount={this.state.retailerListCount}
                        setPage={this.handlePageChange}
                    />
                }
            </Layout>
        ) 
    }
}

export default ManageRetailer
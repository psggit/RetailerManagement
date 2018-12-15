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
import * as Api from './../../api'

class ManageRetailer extends React.Component {

    constructor() {
        super()
        this.defaultFilters = {
           column: '',
           operator: 'EQUAL',
           value: ''
        }
        this.state = {
            activePage: 1,
            offset: 0,
            loading: true,
            retailerListCount: 0,
            retailerData: [],
            //organizationList: [],
            operators:  [
                {text: 'EQUAL', value: 'EQUAL'},
                {text: 'LIKE', value: 'LIKE'},
                {text: 'IGNORE CASE', value: 'CASEIGNORE'},
            ],
            ...this.defaultFilters
        }

        this.filter = {
            column: '',
            operator: '',
            value: ''
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
        // this.fetchOrganizationList = this.fetchOrganizationList.bind(this)
        // this.formatOrganizationList = this.formatOrganizationList.bind(this)
        this.handleRowClick = this.handleRowClick.bind(this)
        this.callback = this.callback.bind(this)
    }

    fetchDefaultData() {
        this.setState({retailerData: [], retailerListCount: 0})
        //this.fetchOrganizationList({}, this.formatOrganizationList)
        this.fetchRetailerList({
            offset: 0,
            limit: this.pagesLimit,
            //filter: null
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
        this.setState({retailerData: [], retailerListCount: 0})

        if(queryObj.column && queryObj.column.length > 0) {
            this.fetchRetailerList({
                offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
                limit: this.pagesLimit,
                filter: this.filter
            }, this.setResponseData)
        } else {
            this.fetchRetailerList({
                offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
                limit: this.pagesLimit,
                // filter: this.filter
            }, this.setResponseData)
        }
       
    }

    fetchRetailerList(payloadObj, successCallback) {
        console.log("payload obj", payloadObj)
        Api.fetchRetailerList(payloadObj, successCallback)
        //this.setState({ data: [], retailerListCount: 100 })
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

    //fetchOrganizationList(payloadObj, organizationListSuccessCallback) {
        // this.setState({organizationList: []})
        //Api.fetchOrganizationAndStateList(payloadObj, organizationListSuccessCallback)
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
    //}

    getFilteredRetailersList() {
        const { column, operator, value, offset, activePage } = this.state

        this.filter = {
           column,
           operator,
           value
        }
        //console.log("Filtered params", "field", searchField, "operatr", searchOperator, "text", searchText)
        
        const queryObj = {
            column,
            operator,
            value,
            offset,
            activePage,
        }

        this.setState({ 
            retailerData: [], 
            retailerListCount: 0,  
            offset, 
            activePage,
            column,
            operator,
            value
        })
    
        history.pushState(queryObj, "retailer listing", `/home/manage-retailer?${getQueryUri(queryObj)}`)
      
        this.fetchRetailerList({
            limit: this.pagesLimit,
            offset: 0,
            filter: this.filter
        }, this.setResponseData)
    }

    // formatOrganizationList(data) {
    //     console.log("Fetched org list with state details", data)
    // }

    setResponseData(response) {
        console.log("response", response)
        if(response.ret_response) {
            this.setState({retailerData: response.ret_response, retailerListCount: response.count, loading: false})
        } else {
            this.setState({retailerData: [], retailerListCount: 0, loading: false})
        }
        
    }

    // handlePageChange(pageObj) {
    //     //console.log("handle page change", "active page", pageObj.activePage, "offset", pageObj.offset)
    //     this.setState({activePage: pageObj.activePage, pageOffset: pageObj.offset})
    // }


    handlePageChange(pageObj) {
        const queryUri = location.search.slice(1)
        const queryObj = getQueryObj(queryUri)
        let queryParamsObj = {}
    
        let pageNumber = pageObj.activePage
        let offset = pageObj.offset
        this.setState({ activePage: pageNumber, offset })

        if(queryObj.column && queryObj.column.length > 0) {
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
    
        if(location.search.length && queryObj.column && queryObj.column.length > 0) {
          let filterObj = {
              column: queryObj.column,
              operator: queryObj.operator,
              value: queryObj.value
          }
          this.fetchRetailerList({
            offset: pageObj.offset,
            limit: this.pagesLimit,
            filter: filterObj
          }, this.setResponseData)

        } else{

            this.fetchRetailerList({
                offset: pageObj.offset,
                limit: this.pagesLimit
            }, this.setResponseData)      
        }

        history.pushState(queryParamsObj, "retailer listing", `/home/manage-retailer?${getQueryUri(queryParamsObj)}`)
    }

    handleChange(e) {
        //console.log("event", e.target.value, e.target.name)
        this.setState({[e.target.name]: (e.target.value).toString()})  
        // if(e.target.name === "column" && e.target.value === "ID") {
        //     this.setState({
        //         operators: [
        //             {text: 'ID', value: 'ID'},
        //         ]
        //     })
        // }
        console.log("hadle change", e.target.value)
        if(e.target.name === "column" && (e.target.value === "ID" || e.target.value === "OrganisationID")) {
            console.log("if)")
            this.setState({
                operators: [
                    {text: 'EQUAL', value: 'EQUAL'},
                ],
                operator: 'EQUAL'
            })
        } else if(e.target.name === "column"){
            console.log("if2")
            this.setState({
                operators: [
                    {text: 'EQUAL', value: 'EQUAL'},
                    {text: 'LIKE', value: 'LIKE'},
                    {text: 'IGNORE CASE', value: 'CASEIGNORE'},
                ]
            })
        }
    }

    // handleOrganizationChange(e) {

    // }

    editOutletDetail(e, item, action) {
        //console.log("item", item, this.props.history)
        e.stopPropagation()
        this.props.history.push(`/home/manage-retailer/edit-retailer/${item.id}`, item)
    }

    resetFilter() {
        this.setState({
            column: '',
            operator: 'EQUAL',
            value: ''
        })
    }

    onToggleChange(value, item) {
        //e.stopPropagation()
        console.log("On toggle change", value, item)
        // Api.deactivateRetailer({
        //     id: item.id,
        //     branch_status: item.branch_status
        // }, this.callback)
    }

    callback() {
        this.handlePageChange({
            activePage: this.state.activePage,
            offset: this.state.offset
        })
    }

    handleRowClick(e,item) {
        console.log("row item", item)
        //this.props.history.push(`/home/manage-retailer/retailer-details/${item.id}`, item)
    }

    render() {
        const {retailerData} = this.state
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
                            value={this.state.column}
                            name="column"
                            options={[
                                // { text: 'All', value: 'all' },
                                { text: 'ID', value: 'ID' },
                                { text: 'RETAILER NAME', value: 'RetailerName' },
                                { text: 'CITY', value: 'CITYID'},
                                { text: 'ORGANIZATION ID', value: 'OrganisationID' }
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
                    <div style={{ marginTop: '40px', marginBottom: '20px' }}>
                        <Table
                            emptyMessage={this.state.loading ? <Spinner /> : 'No records found'}
                            items={retailerData}
                            onRowClick={(e,item) => this.handleRowClick(e,item)}
                        >
                            <Table.Column field="actions">
                                {item => (
                                    <Button icon="pencil" onClick={(e) => this.editOutletDetail(e, item, 'edit')} />
                                )}
                            </Table.Column>
                            <Table.Column field="id" title="Retailer Id"/>
                            <Table.Column field="outlet_name" title="Outlet Name"/>
                            <Table.Column field="store_address" title="Outlet Address"/>
                            {/* <Table.Column field="retailerStatus" title="Retailer Status"/> */}
                            <Table.Column field="state_name" title="State"/>
                            <Table.Column field="city_name" title="City"/>
                            <Table.Column field="organisation_id" title="Organization Id"/>
                            <Table.Column field="organisation_name" title="Organization Name"/>
                            <Table.Column field="actions" title="Outlet Status">
                                {item => (
                                    <Switch2 on={item.branch_status === 'true' ? 'Active' : 'Inactive'} accessibleLabels={[]} onToggle={this.onToggleChange} value={item} />
                                )}
                            </Table.Column>
                        </Table>
                    </div>
                }
                {
                    this.state.retailerData && this.state.retailerData.length > 0 &&
                    <Pagination 
                        activePage={parseInt(this.state.activePage)}
                        itemsCountPerPage={this.pagesLimit}
                        totalItemsCount={parseInt(this.state.retailerListCount)}
                        setPage={this.handlePageChange}
                    />
                }
            </Layout>
        ) 
    }
}

export default ManageRetailer
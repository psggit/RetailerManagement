import React from 'react'
import Layout from 'Components/layout'
import { Table } from '@auth0/cosmos'
import { Icon, Spinner, List } from '@auth0/cosmos'
import { Select, TextInput } from '@auth0/cosmos'
import { Button } from '@auth0/cosmos'
import {organizationData} from './../../mockData'
import Pagination from 'Components/pagination'
//import Notify from 'Components/notify'
import { getQueryObj, getQueryUri } from 'Utils/url-utils'
import { NavLink } from 'react-router-dom'
//import { POST } from 'Utils/fetch'
import * as Api from './../../api'
// import {stateAndCityList} from './../../mockData'

class ManageOrganization extends React.Component {

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
            organisationCount: 0,
            data: [],
            list: [],
            // stateList: [],
            // cityList: [],
            // list: stateAndCityList.states,
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
        this.getFilteredOrganisationList = this.getFilteredOrganisationList.bind(this)
        this.fetchDefaultData = this.fetchDefaultData.bind(this)
        this.fetchOrganisationList = this.fetchOrganisationList.bind(this)
        this.setResponseData = this.setResponseData.bind(this)
        //this.formatStateAndCityList = this.formatStateAndCityList.bind(this)
        this.handleEditOrg = this.handleEditOrg.bind(this)
        this.handleRowClick = this.handleRowClick.bind(this)
        //this.fetchStateAndCityList = this.fetchStateAndCityList.bind(this)
    }

    fetchDefaultData() {
        // console.log("default data", this.state.list)
        // const {list, stateList, cityList} = this.state
        // //let state = {}, city = {} 
        // for(const i in list) {
        //     console.log("item", list[i].state_name)
        //     let state = {}, city = {}
        //     state.text = list[i].state_name
        //     state.value = list[i].state_short_name
        //     stateList[i] = state

        //     for(const j in list[i].cities) {  
        //         city.text = (list[i].cities[j].city_name)
        //         city.value = (list[i].cities[j].city_id)
        //         cityList[j] = city
        //     } 
        // }

        // // for(const i in list) {
        // //     for(const j in list[i].cities) {
        // //         console.log(list[i].cities[j].city_name)
        // //     }
        // // }
        // console.log("state list", stateList)
        // console.log("city list", cityList)


        this.setState({ data: [], organisationCount: 0, list: [] })
        // this.fetchStateAndCityList({
        //     offset: 0,
        //     limit: 0
        // },this.formatStateAndCityList)

        this.fetchOrganisationList({
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
        this.setState({ data: [], organisationCount: 0 })
        this.fetchOrganisationList({
            offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
            limit: this.pagesLimit,
            filter: this.filter
        }, this.setResponseData)
    }

    // fetchStateAndCityList(payload, stateListSuccessCallback) {
    //     Api.fetchStateAndCityList(payload, stateListSuccessCallback)
        //this.setState({ list: [] })
        // POST({
        //     api: '/deliveryStatus/liveOrders',
        //     apiBase: 'gremlinUrl',
        //     data: {
        //         limit: 10,
        //         offset: 0
        //     },
        //     handleError: true
        // })
        // .then((json) => {
        //     //this.setState({
        //     //       data: json.data,
        //     //       count: json.count,
        //     //       loading: false
        //     //     })
        //     Notify("success", "Successfully created organization")
        //     sucessStateListCallback(json)
        // })
        // .catch(err => {
        //     err.response.json().then(json => { Notify("danger", json.message) })
        // })
    //}

    fetchOrganisationList(payloadObj, successCallback) {
        console.log("payload obj", payloadObj)
        Api.fetchOrganizationList(payloadObj, successCallback)
        //this.setState({ data: [], organisationCount: 0 })
        // POST({
        //     api: '/deliveryStatus/liveOrders',
        //     apiBase: 'gremlinUrl',
        //     data: {
        //         limit: 10,
        //         offset: 0
        //     },
        //     handleError: true
        // })
        // .then((json) => {
        //     //this.setState({
        //     //       data: json.data,
        //     //       count: json.count,
        //     //       loading: false
        //     //     })
        //     //Notify("success", "Successfully created organization")
        //     successCallback(json)
        // })
        // .catch(err => {
        //     err.response.json().then(json => { Notify("danger", json.message) })
        // })
    }

    getFilteredOrganisationList() {
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
    
        history.pushState(queryObj, "organisation listing", `/home/manage-organization?${getQueryUri(queryObj)}`)
        this.setState({ data: [], organisationCount: 0 })
        this.fetchOrganisationList({
            limit: this.pagesLimit,
            offset: 0,
            filter: this.filter
        }, this.setResponseData)
    }

    setResponseData(response) {
        console.log("response", response)
    }

    // formatStateAndCityList(data) {
    //     console.log("state and city list", data)
    // }

    handlePageChange(pageObj) {
        //console.log("handle page change", "active page", pageObj.activePage, "offset", activePage.offset)
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

    handleEditOrg(e,item, action) {
        //console.log("item", item, this.props.history)
        e.stopPropagation()
        this.props.history.push(`/home/manage-organization/edit-organization/${item.id}`, item)
    }

    resetFilter() {
        this.setState({
            searchField: '',
            searchOperator: '',
            searchText: ''
        })
    }

    handleRowClick(e,item) {
        console.log("row item", item)
        this.props.history.push(`/home/manage-organization/organization-details/${item.id}`, item)
    }

    render() {
        //const { activePage, pageOffset, itemCount} = this.state
        const {stateList, cityList} = this.state
        return (
            <Layout title="Manage Organization">
                <NavLink to={`/home/manage-organization/create-organization`}>
                    <div style={{marginTop: '20px'}}>
                        <Button> Create Organisation </Button>
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
                        <p style={{ margin: '10px 0' }}>Organization Field</p>
                        <Select
                            placeholder="Select an field..."
                            value={this.state.searchField}
                            name="searchField"
                            options={[
                                // { text: 'All', value: 'all' },
                                { text: 'ID', value: 'ID' },
                                { text: 'ORGANISATION NAME', value: 'Organisation name' },
                                { text: 'STATE', value: 'State'}
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
                        <Button onClick={() => this.getFilteredOrganisationList()}>Search</Button>
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
                            <Table.Column field="id" title="ID" width="7%" />
                            <Table.Column field="organizationName" title="Organisation Name" width="15%"/>
                            <Table.Column field="organizationType" title="Organisation Type" width="15%"/>
                            <Table.Column field="outletsCount" title="Outlets Count" width="13%"/>
                            <Table.Column field="selectedKycIdx" title="KYC Status" width="10%"/>
                            <Table.Column field="selectedOrganizationStatusIdx" title="Organisation Status" width="15%"/>
                            <Table.Column field="panNumber" title="PAN Number" width="10%"/>
                            <Table.Column field="cinNumber" title="CIN Number" width="15%"/>
                        </Table>
                    </div>
                }
                {
                    !this.state.loading &&
                    <div style={{ marginTop: '40px', marginBottom: '20px' }}>
                        <Table
                            emptyMessage={this.state.loading ? <Spinner /> : 'No records found'}
                            items={organizationData}
                            onRowClick={(e,item) => this.handleRowClick(e,item)}
                        >
                            <Table.Column field="actions">
                                {item => (
                                    <Button icon="pencil" onClick={(e) => this.handleEditOrg(e, item, 'edit')} />
                                )}
                            </Table.Column>
                            <Table.Column field="id" title="ID" width="7%" />
                            <Table.Column field="organizationName" title="Organisation Name" width="15%"/>
                            <Table.Column field="organizationType" title="Organisation Type" width="15%"/>
                            <Table.Column field="outletsCount" title="Outlets Count" width="13%"/>
                            <Table.Column field="selectedKycIdx" title="KYC Status" width="10%"/>
                            <Table.Column field="selectedOrganizationStatusIdx" title="Organisation Status" width="15%"/>
                            <Table.Column field="panNumber" title="PAN Number" width="10%"/>
                            <Table.Column field="cinNumber" title="CIN Number" width="10%"/>
                        </Table>
                    </div>
                }
                {
                    this.state.data.length > 0 &&
                    <Pagination 
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.pagesLimit}
                        totalItemsCount={this.state.organisationCount}
                        setPage={this.handlePageChange}
                    />
                }
            </Layout>
        ) 
    }
}

export default ManageOrganization
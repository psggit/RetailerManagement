import React from 'react'
import Layout from 'Components/layout'
import { Table } from '@auth0/cosmos'
import { Icon, Spinner, List } from '@auth0/cosmos'
import { Select, TextInput } from '@auth0/cosmos'
import { Button } from '@auth0/cosmos'
import Pagination from 'Components/pagination'
import { getQueryObj, getQueryUri } from 'Utils/url-utils'
import { NavLink } from 'react-router-dom'
import * as Api from './../../api'

class ManageOrganization extends React.Component {

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
            organizationCount: 0,
            organizationData: [],
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
        this.getFilteredOrganisationList = this.getFilteredOrganisationList.bind(this)
        this.fetchDefaultData = this.fetchDefaultData.bind(this)
        this.fetchOrganisationList = this.fetchOrganisationList.bind(this)
        this.setResponseData = this.setResponseData.bind(this)
        this.handleEditOrg = this.handleEditOrg.bind(this)
        this.handleRowClick = this.handleRowClick.bind(this)
    }

    fetchDefaultData() {
        this.setState({ organizationData: [], organisationCount: 0})
        this.fetchOrganisationList({
            offset: 0,
            limit: this.pagesLimit
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
        this.setState({ organizationData: [], organisationCount: 0 })
       
        if(queryObj.column && queryObj.column.length > 0) {
            this.fetchOrganisationList({
                offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
                limit: this.pagesLimit,
                filter: this.filter
            }, this.setResponseData)
    
        } else {
            this.fetchOrganisationList({
                offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
                limit: this.pagesLimit
            }, this.setResponseData)
    
        }
    }

    fetchOrganisationList(payloadObj, successCallback) {
        Api.fetchOrganizationList(payloadObj, successCallback)
    }

    getFilteredOrganisationList() {
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
            offset, 
            activePage,
            column,
            operator,
            value,
        })
        history.pushState(queryObj, "organisation listing", `/home/manage-organization?${getQueryUri(queryObj)}`)
     
        this.fetchOrganisationList({
            limit: this.pagesLimit,
            offset: 0,
            filter: this.filter
        }, this.setResponseData)
    }

    setResponseData(response) {
        if(response && response.org_response && response.org_response.length > 0) {
            response.org_response.map((item) => {
                return(
                    item.kyc_status = item.kyc_status === "true" ? 'Verified' : 'Not Verified',
                    item.status = item.status === "true" ? 'Active' : 'Inactive'
                )
            })

            this.setState({organizationData: response.org_response, organizationCount: response.count, loading: false})
        } else {
            this.setState({organizationData: [], organizationCount: 0, loading: false})
        }
    }

    handlePageChange(pageObj) {
        const queryUri = location.search.slice(1)
        const queryObj = getQueryObj(queryUri)
        let queryParamsObj = {}
    
        let pageNumber = pageObj.activePage
        let offset = pageObj.offset
        this.setState({ activePage: pageNumber, offset })

        if(queryObj && queryObj.column && queryObj.column.length > 0) {
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
          this.fetchOrganisationList({
            offset: pageObj.offset,
            limit: this.pagesLimit,
            filter: filterObj
          }, this.setResponseData)

        } else{
            this.fetchOrganisationList({
                offset: pageObj.offset,
                limit: this.pagesLimit
            }, this.setResponseData)      
        }

        history.pushState(queryParamsObj, "organisation listing", `/home/manage-organization?${getQueryUri(queryParamsObj)}`)
    }

    handleChange(e) {
       
        if(e.target.name === "column" && e.target.value === "ID") {
            this.setState({
                operators: [
                    {text: 'EQUAL', value: 'EQUAL'},
                ],
                operator: 'EQUAL'
            })
        } else if(e.target.name === "column"){
            this.setState({
                operators: [
                    {text: 'EQUAL', value: 'EQUAL'},
                    {text: 'LIKE', value: 'LIKE'},
                    {text: 'IGNORE CASE', value: 'CASEIGNORE'},
                ]
            })
        }

        this.setState({[e.target.name]: e.target.value})  
    }

    handleEditOrg(e,item, action) {
        e.stopPropagation()
        this.props.history.push(`/home/manage-organization/edit-organization/${item.id}`, item)
    }

    resetFilter() {
        this.setState({
            column: '',
            operator: 'EQUAL',
            value: ''
        })
        this.fetchDefaultData()
        this.props.history.push(`/home/manage-organization`)
    }

    handleRowClick(e,item) {
        this.props.history.push(`/home/manage-organization/organization-details/${item.id}`, item)
    }

    render() {
        return (
            <Layout title="Manage Organization">
                <NavLink to={`/home/manage-organization/create-organization`}>
                    <div style={{marginTop: '20px'}}>
                        <Button> Create Organization </Button>
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
                        <p style={{ margin: '10px 0' }}>Field</p>
                        <Select
                            placeholder="Select an field..."
                            value={this.state.column}
                            name="column"
                            options={[
                                { text: 'ID', value: 'ID' },
                                { text: 'ORGANISATION NAME', value: 'OrganisationName' },
                                { text: 'STATE NAME', value: 'StateName'}
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
                <div style={{ marginTop: '40px', marginBottom: '20px' }}>
                    <Table
                        emptyMessage={this.state.loading ? <Spinner /> : 'No records found'}
                        items={this.state.organizationData}
                        onRowClick={(e,item) => this.handleRowClick(e,item)}
                    >
                        <Table.Column field="actions">
                            {item => (
                                <Button icon="pencil" onClick={(e) => this.handleEditOrg(e, item, 'edit')} />
                            )}
                        </Table.Column>
                        <Table.Column field="id" title="ID" width="7%" />
                        <Table.Column field="organisation_name" title="Organization Name" width="15%"/>
                        <Table.Column field="type_of_organisation" title="Organization Type" width="10%"/>
                        <Table.Column field="no_of_outlets" title="Outlets Count" width="13%"/>
                        <Table.Column field="kyc_status" title="KYC Status" width="10%"/>
                        <Table.Column field="status" title="Organization Status" width="13%"/>
                        <Table.Column field="state_name" title="State Name" width="7%"/>
                        <Table.Column field="pan_number" title="PAN Number" width="10%"/>
                        <Table.Column field="cin_no" title="CIN Number" width="10%"/>
                    </Table>
                </div>
                {
                    this.state.organizationData && this.state.organizationData.length > 0 &&
                    <Pagination 
                        activePage={parseInt(this.state.activePage)}
                        itemsCountPerPage={this.pagesLimit}
                        totalItemsCount={parseInt(this.state.organizationCount)}
                        setPage={this.handlePageChange}
                    />
                }
            </Layout>
        ) 
    }
}

export default ManageOrganization
import React from 'react'
import Layout from 'Components/layout'
import { Table } from '@auth0/cosmos'
import { Icon, Spinner, List } from '@auth0/cosmos'
import { Select, TextInput } from '@auth0/cosmos'
import { Button } from '@auth0/cosmos'
import {organizationData} from './../mockData'
import Pagination from 'Components/pagination'

class ManageOrganization extends React.Component {

    constructor() {
        super()
        this.defaultFilters = {
           searchField: 'all',
           searchOperator: '',
           searchText: ''
        }
        this.state = {
            activePage: 1,
            pageOffset: 0,
            loading: false,
            itemsCount: 100,
            ...this.defaultFilters
        }
    
        this.pagesLimit = 5
        this.handlePageChange = this.handlePageChange.bind(this)
        this.getFilteredOrganisationList = this.getFilteredOrganisationList.bind(this)
    }

    getFilteredOrganisationList() {
        console.log("Filtered params", "field", this.state.searchField, "operatr", this.state.searchOperator, "text", this.state.searchText)
    }

    handlePageChange(pageObj) {
        console.log("handle page change", "active page", pageObj.activePage, "offset", activePage.offset)
        this.setState({activePage: pageObj.activePage, pageOffset: pageObj.offset})
    }

    handleChange(e) {
        //console.log("event", e.target.value, e.target.name)
        this.setState({[e.target.name]: e.target.value})   
    }

    render() {
        const { activePage, pageOffset, itemCount} = this.state
        return (
            <Layout title="Manage Organization">
                <div style={{marginTop: '20px'}}>
                    <Button> Create Organisation </Button>
                </div>
                <div style={{marginTop: '20px'}}>
                    <div style={{
                            width: '240px',
                            display: 'inline-block',
                            verticalAlign: 'bottom',
                            marginRight: '20px'
                        }}
                    >
                        <p style={{ margin: '10px 0' }}>Organisation field</p>
                        <Select
                            placeholder="Select organisation field..."
                            value={this.state.searchField}
                            name="searchField"
                            options={[
                                { text: 'All', value: 'all' },
                                { text: 'ID', value: 'Id' },
                                { text: 'ORGANISATION NAME', value: 'Organisation name' },
                                { text: 'STATE', value: 'State'}
                            ]}
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
                        <p style={{ margin: '10px 0' }}>Select operator</p>
                        <Select
                            placeholder="Select an option..."
                            value={this.state.searchOperator}
                            name="searchOperator"
                            options={[
                                { text: 'EQUAL', value: 'EQUAL' },
                                { text: 'LIKE', value: 'LIKE' },
                                { text: 'IGNORE CASE', value: 'IGNORE CASE' }
                            ]}
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
                        }}
                    >
                        <Button onClick={() => this.getFilteredOrganisationList()}>Search</Button>
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
                            <Table.Column field="org_name" title="Organisation Name" width="15%"/>
                            <Table.Column field="org_type" title="Organisation Type" width="15%"/>
                            <Table.Column field="outlets_count" title="Outlets Count" width="13%"/>
                            <Table.Column field="kyc_status" title="KYC Status" width="10%"/>
                            <Table.Column field="org_status" title="Organisation Status" width="15%"/>
                            <Table.Column field="pan_no" title="PAN Number" width="10%"/>
                            <Table.Column field="cin_no" title="CIN Number" width="15%"/>
                        </Table>
                    </div>
                }
                {
                    !this.state.loading &&
                    <div style={{ marginTop: '40px', marginBottom: '20px' }}>
                        <Table
                            emptyMessage={this.state.loading ? <Spinner /> : 'No records found'}
                            items={organizationData}
                        >
                            <Table.Column field="id" title="ID" width="7%" />
                            <Table.Column field="org_name" title="Organisation Name" width="15%"/>
                            <Table.Column field="org_type" title="Organisation Type" width="15%"/>
                            <Table.Column field="outlets_count" title="Outlets Count" width="13%"/>
                            <Table.Column field="kyc_status" title="KYC Status" width="10%"/>
                            <Table.Column field="org_status" title="Organisation Status" width="15%"/>
                            <Table.Column field="pan_no" title="PAN Number" width="10%"/>
                            <Table.Column field="cin_no" title="CIN Number" width="15%"/>
                        </Table>
                    </div>
                }
                {
                    organizationData.length > 0 &&
                    <Pagination 
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.pagesLimit}
                        totalItemsCount={this.state.itemsCount}
                        setPage={this.handlePageChange}
                    />
                }
            </Layout>
        ) 
    }
}

export default ManageOrganization
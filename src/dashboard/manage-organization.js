import React from 'react'
import Layout from 'Components/layout'
import { Table } from '@auth0/cosmos'
import { Icon, Spinner, List } from '@auth0/cosmos'
//import { Select } from '@auth0/cosmos'
import { Button } from '@auth0/cosmos'
import {organizationData} from './../mockData'
import Pagination from 'Components/pagination'

class ManageOrganization extends React.Component {

    constructor() {
        super()
        this.state = {
            activePage: 1,
            pageOffset: 0,
            loading: false,
            itemsCount: 100
        }
    
        this.pagesLimit = 5
        this.handlePageChange = this.handlePageChange.bind(this)
    }

    handlePageChange(pageObj) {
        console.log("handle page change", "active page", pageObj.activePage, "offset", activePage.offset)
        this.setState({activePage: pageObj.activePage, pageOffset: pageObj.offset})
    }

    render() {
        const { activePage, pageOffset, itemCount} = this.state
        return (
            <Layout title="Manage Organization">
                <div style={{marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Button> Create Organisation </Button>
                    <Button> Filter </Button>
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
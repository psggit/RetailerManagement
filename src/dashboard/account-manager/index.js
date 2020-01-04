import React from "react"
import Layout from 'Components/layout'
import { Table } from '@auth0/cosmos'
import { Spinner } from '@auth0/cosmos'
import { fetchAccountManagers } from "./../../api"
import CustomButton from 'Components/button'
import PropTypes from "prop-types"
import { Button } from '@auth0/cosmos'
import { NavLink } from 'react-router-dom'

class AccountManagerList extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      organizationId: parseInt(this.props.match.params.organizationId),
      loading: true,
      accountManagerList: []
    }

    this.fetchAccountManagerList = this.fetchAccountManagerList.bind(this)
    this.handleEditAccountManager = this.handleEditAccountManager.bind(this)
  }

  componentDidMount () {
    this.fetchAccountManagerList({
      organisation_id: parseInt(this.props.match.params.organizationId)
    })
  }

  fetchAccountManagerList (payload) {
    fetchAccountManagers(payload)
      .then((accountManagersData) => {
        if (Object.keys(accountManagersData).length > 0) {
          this.setState({
            accountManagerList: accountManagersData.list_account_manager,
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
        console.log("Error in fetching account managers", error)
      })
  }

  handleEditAccountManager (e, item, action) {
    this.props.history.push(`/admin/account-manager/edit/${item.organisation_id}`, item)
  }

  render () {
    const organizationId = this.props.match.params.organizationId
    const { loading, accountManagerList } = this.state
    return (
      <Layout title={`Account Managers (${organizationId})`}>
        <div style={{ width: '200px', marginTop: '20px' }}>
          <NavLink to={`/admin/account-manager/create/${organizationId}`}>
            <div style={{ marginTop: '20px' }}>
              <CustomButton text="CREATE ACCOUNT MANAGER" />
            </div>
          </NavLink>
        </div>
        {
          <div style={{ marginTop: '40px', marginBottom: '20px' }}>
            <Table
              emptyMessage={!loading && accountManagerList.length === 0 ? 'No records found' : <Spinner />}
              items={this.state.accountManagerList}
              // onRowClick={(e, item) => this.handleRowClick(e, item)}
            >
              <Table.Column field="actions">
                {item => (
                  <Button icon="pencil" onClick={(e) => this.handleEditAccountManager(e, item, 'edit')} />
                )}
              </Table.Column>
              <Table.Column field="account_manager" title="Account Manager" />
              <Table.Column field="user_id" title="User Id" />
              <Table.Column field="mobile_number" title="Mobile Number" />
              <Table.Column field="organisation_id" title="Organization Id" />
              <Table.Column field="actions" title="Status">
                {item => (
                  <div>{item.account_status ? "Active" : "Inactive"}</div>
                )}
              </Table.Column>
            </Table>
          </div>
        }
      </Layout>
    )
  }
}

AccountManagerList.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      organizationId: PropTypes.string,
    }),
  })
}
export default AccountManagerList
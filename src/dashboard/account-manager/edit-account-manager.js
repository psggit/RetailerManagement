import React from "react"
import AccountManagerForm from "./account-manager-form"
import { updateAccountManager } from "./../../api"
import Layout from 'Components/layout'
import Card from 'Components/card'
import Notify from "Components/notify"
import PropTypes from "prop-types"

class EditAccountManager extends React.Component {

  constructor () {
    super()

    this.state = {
      isSaved: false
    }

    this.handleSaveAccountManager = this.handleSaveAccountManager.bind(this)
  }

  handleSaveAccountManager () {
    const accountManagerData = this.settlementUserForm.getData()
    this.setState({
      isSaved: true
    })
    updateAccountManager({
      user_id: parseInt(this.props.history.location.state.user_id),
      account_status: accountManagerData.selectedStatusIdx === "1" ? true : false
    })
      .then((response) => {
        Notify("success", "Successfully updated")
        location.href = `/admin/account-manager/${this.props.match.params.organizationId}`
      })
      .catch((error) => {
        this.setState({
          isSaved: false
        })
        Notify("success", "Error in updating account maanager")
        // eslint-disable-next-line no-console
        console.log("Error in creating account managers", error)
      })
  }

  render () {
    return (
      <Layout title="Create Account Manager">
        <Card width="800px">
          <AccountManagerForm
            handleSave={this.handleSaveAccountManager}
            isSaved={this.state.isSaved}
            data={this.props.history.location.state}
            ref={input => (this.settlementUserForm = input)}
          />
        </Card>
      </Layout>
    )
  }
}

EditAccountManager.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      organizationId: PropTypes.string,
    }),
  }),
  history: PropTypes.object
}

export default EditAccountManager
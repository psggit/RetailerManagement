import React from "react"
import AccountManagerForm from "./account-manager-form"
import { createAccountManager} from "./../../api"
import Layout from 'Components/layout'
import Card from 'Components/card'
import Notify from "Components/notify"
import PropTypes from "prop-types"

class CreateAccountManager extends React.Component {

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
    createAccountManager({
      account_manager: accountManagerData.accountManagerName,
      mobile_number: accountManagerData.mobile,
      organisation_id: parseInt(this.props.match.params.organizationId),
      account_status: accountManagerData.selectedStatusIdx === "1" ? true : false
    }) 
    .then((response) => {
      Notify("success", "Successfully created account manager")
      location.href = `/admin/account-manager/${this.props.match.params.organizationId}`
    })
    .catch((error) => {
      this.setState({
        isSaved: false
      })
      Notify("success", "Error in creating account manager")
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
            ref={input => (this.settlementUserForm = input)}
          />
        </Card>
      </Layout>
    )
  }
}

CreateAccountManager.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      organizationId: PropTypes.string,
    }),
  })
}

export default CreateAccountManager
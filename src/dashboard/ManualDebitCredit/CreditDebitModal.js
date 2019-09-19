import React from "react"
import TitleAndSave from "Components/ModalBox2/TitleAndSave"
import { unmountModal } from "Components/ModalBox2/api"
import { Select, TextInput, TextArea } from "@auth0/cosmos"
import { fetchRetailerList, fetchTransactionCode, insertManualCreditDebit } from "../../api"
import Notify from "Components/notify"

export default function CreditDebitModal (props) {
  return class CreditDebitModal extends React.Component {
    constructor () {
      super()
      this.state = {
        retailers: [],
        loading: true,
        activeRetailer: 0,
        activeTransactionCode: 0,
        showTransactionCodes: false,
        amount: "",
        comment: ""
      }
      this.handleRetailerChange = this.handleRetailerChange.bind(this)
      this.handleTransactionCodeChange = this.handleTransactionCodeChange.bind(this)
      this.handleAmountChange = this.handleAmountChange.bind(this)
      this.handleCommentChange = this.handleCommentChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount () {
      const fetchRetailerListReq = {
        offset: 0,
        limit: 9999,
        filter: null
      }
      fetchRetailerList(fetchRetailerListReq)
        .then(fetchRetailerListRes => {
          const retailers = fetchRetailerListRes.ret_response.map(item => ({
            value: item.id,
            text: `${item.id} - ${item.outlet_name}`
          }))
          this.setState({ retailers, loading: false })
        })
    }

    handleRetailerChange (e) {
      this.setState({ activeRetailer: parseInt(e.target.value), showTransactionCodes: true })
      const fetchTransactionCodeReq = {
        "": ""
      }
      fetchTransactionCode(fetchTransactionCodeReq)
        .then(fetchTransactionCodeRes => {
          const transactionCodes = fetchTransactionCodeRes.ret_trans_code.map(item => ({
            value: item.id,
            text: item.code
          }))
          this.setState({ transactionCodes, showTransactionCodes: true })
        })
    }

    handleTransactionCodeChange (e) {
      this.setState({ activeTransactionCode: e.target.value, showAmount: true })
    }

    handleAmountChange (e) {
      if (e.target.validity.valid) {
        this.setState({ amount: e.target.value })
      }
    }

    handleCommentChange (e) {
      this.setState({ comment: e.target.value })
    }

    handleSubmit () {
      const { activeRetailer, activeTransactionCode, amount, comment } = this.state
      const insertManualCreditDebitReq = {
        retailer_id: activeRetailer,
        code_id: activeTransactionCode,
        amount: parseFloat(amount),
        comment: comment
      }
      if (amount.length > 0) {
        insertManualCreditDebit(insertManualCreditDebitReq)
          .then(insertManualCreditDebitRes => {
            Notify("success", insertManualCreditDebitRes.Message)
            props.toggleReset(!props.isReset)
            unmountModal()
          })
          .catch(err => {
            err.response.json().then(json => {
              Notify("error", json.message)
              unmountModal()
            })
          })
      }
    }

    render () {
      return (
        <TitleAndSave handleSave={this.handleSubmit} title="Create new debit/credit">
          <Select
            value={this.state.activeRetailer}
            disabled={this.state.loading}
            loading={this.state.loading}
            placeholder={this.state.loading === true ? "Loading.." : "Select retailer"}
            options={this.state.retailers}
            onChange={this.handleRetailerChange}
          />
          {
            this.state.showTransactionCodes === true &&
            <div style={{ marginTop: "20px" }}>
              <Select
                value={this.state.activeTransactionCode}
                options={this.state.transactionCodes}
                placeholder="Select transaction code"
                onChange={this.handleTransactionCodeChange}
              />
            </div>
          }
          {
            this.state.showAmount === true &&
            <div style={{ marginTop: "20px" }}>
              <TextInput
                pattern="[0-9]+"
                value={this.state.amount}
                onChange={this.handleAmountChange}
                placeholder="Enter amount"
              />
            </div>
          }
          {
            this.state.showAmount === true &&
            <div style={{ marginTop: "20px" }}>
              <TextArea
                value={this.state.comment}
                onChange={this.handleCommentChange}
                placeholder="Write comment..."
              />
            </div>
          }
        </TitleAndSave>
      )
    }
  }
}
import React, { useState, useEffect } from "react"
import Layout from "Components/layout"
import { Table, Select, TextInput, Form } from "@auth0/cosmos"
import { fetchCreditDebitRetailers, fetchTransactionCode } from "../../api"
import CreditDebitModal from "./CreditDebitModal"
import { mountModal } from "Components/ModalBox2/api"
import CustomButton from 'Components/button'
import Pagination from 'Components/pagination'
import Moment from "moment"
import {
  getOffsetUsingPageNo,
  getQueryParamByName,
  getQueryUri
} from "./../../utils/helpers"

export default function ManageManualDebitCredit (props) {
  const pageNo = parseInt(getQueryParamByName("page")) || 1
  const searchValue = getQueryParamByName("q") || ""
  const filterByValue = getQueryParamByName("f") || 0
  const limit = 10
  const [retailers, setRetailers] = useState([])
  const [retailersCount, setRetailersCount] = useState(0)
  const [isLoaded, setLoading] = useState(false)
  const [offset, setOffset] = useState(getOffsetUsingPageNo(pageNo, limit))
  const [activePage, setActivePage] = useState(pageNo)
  const [isReset, toggleReset] = useState(false)
  const [filterBy, setFilterBy] = useState(filterByValue)
  const [filterValue, setFilterValue] = useState(searchValue)
  const [finalFilterValue, setFinalFilterValue] = useState(searchValue)
  const [transactionCodes, setTransactionCodes] = useState([])

  const filters = {
    "0": null,
    "1": "RETAILER_ID",
    "2": "CODE_ID"
  }

  const handlePageChange = page => {
    const { offset, activePage } = page
    setOffset(offset)
    setActivePage(activePage)

    const queryObj = {}
    if (searchValue.length) {
      queryObj.search = searchValue
    }
    if (pageNo) {
      queryObj.page = activePage
    }
    props.history.push(`/admin/manage-credit-debit${getQueryUri(queryObj)}`)
  }

  const handleFilterByChange = e => {
    const { value } = e.target
    setFilterBy(value)
    setFilterValue("")
    setFinalFilterValue("")
  }

  const handleFilterSubmit = e => {
    e.preventDefault()
    setFinalFilterValue(filterValue)
    /** reset pagination if filter is applied */
    setOffset(0)
    setActivePage(1)
    props.history.push(`/admin/manage-credit-debit?f=${filterBy}&q=${filterValue}&page=${1}`)
  }

  const reset = () => {
    props.history.push("/admin/manage-credit-debit")
    setFilterValue("")
    setFinalFilterValue("")
    setFilterBy(0)
    setActivePage(1)
    setOffset(0)
  }

  const handleRetailerIDChange = e => {
    const { value } = e.target
    if (value.length > 0) {
      setFilterValue(value)
    } else {
      reset()
    }
  }

  console.log(finalFilterValue)

  const handleCodeIDChange = e => {
    const { value } = e.target
    setFilterValue(value)
    setFinalFilterValue(value)
    setOffset(0)
    setActivePage(1)
    props.history.push(`/admin/manage-credit-debit?f=${filterBy}&q=${value}&page=${1}`)
  }

  const fetchCreditDebitRetailersReq = {
    limit: limit,
    offset: offset
  }

  if (finalFilterValue.length > 0) {
    fetchCreditDebitRetailersReq.filter = {
      column: filters[filterBy],
      operator: "EQUAL",
      value: finalFilterValue
    }
  }

  useEffect(() => {
    const fetchTransactionCodeReq = {
      "": ""
    }
    fetchTransactionCode(fetchTransactionCodeReq)
      .then(fetchTransactionCodeRes => {
        const transactionCodes = fetchTransactionCodeRes.ret_trans_code.map(item => ({
          value: item.id,
          text: item.code
        }))
        setTransactionCodes(transactionCodes)
      })
  }, [])

  useEffect(() => {
    fetchCreditDebitRetailers(fetchCreditDebitRetailersReq)
      .then(fetchCreditDebitRetailersRes => {
        setRetailersCount(fetchCreditDebitRetailersRes.count)
        setRetailers(fetchCreditDebitRetailersRes.retailer_manual_det || [])
        setLoading(true)
      })
  }, [offset, isReset, finalFilterValue])
  return (
    <Layout title="Manual credit and debit">
      <div style={{ margin: "10px 0 20px 0", display: "flex", justifyContent: "space-between" }}>
        <CustomButton text="Create new" handleClick={() => {
          mountModal(CreditDebitModal({
            history: props.history,
            toggleReset: toggleReset,
            isReset: isReset
          }))
        }} />

        <div style={{ display: "flex" }}>
          <Select
            value={filterBy}
            options={[{ text: "Retailer ID", value: 1 }, { text: "Code ID", value: 2 }]}
            placeholder="Filter by"
            onChange={handleFilterByChange}
          />
          <div style={{ marginLeft: "10px" }}>
            <Form onSubmit={handleFilterSubmit}>
              {
                filterBy === "1" &&
                <TextInput
                  required
                  value={filterValue}
                  pattern="[0-9]+"
                  onChange={handleRetailerIDChange}
                  placeholder="Enter retailer ID"
                />
              }
              {
                filterBy === "2" &&
                <Select
                  value={parseInt(filterValue) || 0}
                  onChange={handleCodeIDChange}
                  options={transactionCodes}
                  placeholder="Select code ID"
                />
              }
            </Form>
          </div>
          {
            finalFilterValue.length > 0 &&
            <div style={{ marginLeft: "10px" }}>
              <CustomButton text="RESET" handleClick={reset} />
            </div>
          }
        </div>
      </div>

      <Table
        emptyMessage="No transaction found"
        items={retailers}
        loading={!isLoaded}
      >
        <Table.Column field="retailer_id" title="Retailer ID" />
        <Table.Column field="branch_name" title="Retailer Name" />
        <Table.Column field="amount" title="Amount" />
        <Table.Column field="comment" title="Comment" />
        <Table.Column field="code" title="Code" />
        <Table.Column field="created_at" title="Created at">
          {item => Moment(item.created_at).format("DD/MM/YYYY, h:m:a")}
        </Table.Column>
      </Table>

      <Pagination
        activePage={activePage}
        itemsCountPerPage={limit}
        totalItemsCount={retailersCount}
        setPage={handlePageChange}
      />
    </Layout>
  )
}
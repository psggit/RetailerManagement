import React, { useState, useEffect } from "react"
import Layout from "Components/layout"
import { Table, Button } from "@auth0/cosmos"
import { fetchCreditDebitRetailers } from "../../api"
import CreditDebitModal from "./CreditDebitModal"
import { mountModal } from "Components/ModalBox2/api"
import CustomButton from 'Components/button'
import Pagination from 'Components/pagination'
import Moment from "moment"

export default function ManageManualDebitCredit() {
  const limit = 10
  const [retailers, setRetailers] = useState([])
  const [retailersCount, setRetailersCount] = useState(0)
  const [isLoaded, setLoading] = useState(false)
  const [offset, setOffset] = useState(0)
  const [activePage, setActivePage] = useState(1)

  const handlePageChange = page => {
    const { offset, activePage } = page
    setOffset(offset)
    setActivePage(activePage)
  }

  const fetchCreditDebitRetailersReq = {
    limit: limit,
    offset: offset
  }
  useEffect(() => {
    fetchCreditDebitRetailers(fetchCreditDebitRetailersReq)
      .then(fetchCreditDebitRetailersRes => {
        setRetailersCount(fetchCreditDebitRetailersRes.count)
        setRetailers(fetchCreditDebitRetailersRes.retailer_manual_det)
        setLoading(true)
      })
  }, [offset])
  return (
    <Layout title="Manual credit and debit">
      <div style={{ margin: "10px 0" }}>
        <CustomButton text="Create new" handleClick={() => {
          mountModal(CreditDebitModal({}))
        }} />
      </div>
      <Table
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
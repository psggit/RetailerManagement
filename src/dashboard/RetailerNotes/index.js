import React, { useState, useEffect } from "react"
import Pagination from "Components/pagination"
import { getOffsetUsingPageNo } from "Utils/helpers"
import { Spinner } from '@auth0/cosmos'
import { Table } from '@auth0/cosmos'
import { fetchRetailerNotes } from "./../../api"
import { mountModal } from "Components/ModalBox/utils"
// import CreateNoteModal from "./CreateNoteModal"
import Layout from 'Components/layout'
import CustomButton from 'Components/button'
import { Button } from '@auth0/cosmos'
import CreateNoteModal from "./CreateNote"


export default function RetailerNotes(props) {
  const retailer_id = parseInt(props.match.params.retailerId)
  const limit = 50
  const [retailerNotes, setRetailerNotes] = useState([])
  const [retailerNotesCount, setRetailerNotesCount] = useState(0)
  const [isLoaded, setLoadingState] = useState(false)
  const [activePage, setActivePage] = useState(1)
  const [activeOffset, setActiveOffset] = useState(0)
  const [isNotesUpdated, toggleIsNotesUpdated] = useState(false)

  const fetchRetailerNotesReq = {
    retailer_id,
    list_request: {
      limit,
      offset: activeOffset
    }
  }

  const setRetailerResponse = (response) => {
    if (response && response.note_details) {
      setRetailerNotes(response.note_details)
      setRetailerNotesCount(response.count)
    }
  }

  useEffect(() => {
    fetchRetailerNotes(fetchRetailerNotesReq)
      .then(fetchRetailerNotesRes => {
        setRetailerResponse(fetchRetailerNotesRes)
        setLoadingState(true)
      })
  }, [activeOffset, isNotesUpdated])

  return (
    <Layout title={`Retailer Notes (${retailer_id})`}>
      <div style={{ margin: "20px 0" }}>
        <CustomButton
          handleClick={() => {
            mountModal(CreateNoteModal({
              isNotesUpdated,
              toggleIsNotesUpdated
            }))
          }}
          text="CREATE NOTE"
        />
      </div>
      <Table
        emptyMessage={isLoaded && retailerNotes.length === 0 ? 'Notes are empty' : <Spinner />}
        items={retailerNotes}
      >
        <Table.Column field="created_by" title="Created By" />
        <Table.Column field="description" title="Description" />
        <Table.Column field="issue_code" title="Issue code" />
      </Table>
    </Layout>
  )
}
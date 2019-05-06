import React from "react"
import ModalHeader from "Components/ModalBox/ModalHeader"
import ModalBody from 'Components/ModalBox/ModalBody'
import ModalBox from 'Components/ModalBox'
import ModalFooter from 'Components/ModalBox/ModalFooter'
import { unMountModal } from "Components/ModalBox/utils"
import Notify from "Components/notify"
import { fetchNoteIssues, createRetailerNote } from "./../../api"
import "./CreateNote.scss"

export default function CreateNoteModal(props) {
  return class CreateNoteModal extends React.Component {
    constructor() {
      super()
      const retailer_id = parseInt(location.pathname.split("/").pop())
      this.state = {
        retailer_id,
        issueId: null,
        noteDescription: "",
        noteIssues: []
      }
      this.handleSave = this.handleSave.bind(this)
      this.setNoteIssues = this.setNoteIssues.bind(this)
      this.setIssueId = this.setIssueId.bind(this)
    }
    handleSave() {
      const { retailer_id, issueId, noteDescription } = this.state
      const createRetailerNoteReq = {
        retailer_id,
        issue_id: parseInt(issueId),
        description: noteDescription,
        created_by: localStorage.getItem("hasura-id")
      }
      if (noteDescription.length) {
        createRetailerNote(createRetailerNoteReq)
          .then(json => {
            Notify("success", json.Message)
            props.toggleIsNotesUpdated(!props.isNotesUpdated)
            unMountModal()
          })
          .catch(err => {
            unMountModal()
            err.response.json()
              .then(json => Notify("error", json.Message))
          })
      }
    }
    setNoteIssues(noteIssues) {
      this.setState({ noteIssues })
    }
    setIssueId(issueId) {
      this.setState({ issueId })
    }
    setNoteDescription(noteDescription) {
      this.setState({ noteDescription })
    }
    componentDidMount() {
      fetchNoteIssues()
        .then(fetchNoteIssuesRes => {
          this.setNoteIssues(fetchNoteIssuesRes.issue_details)
          this.setIssueId(fetchNoteIssuesRes.issue_details[0].id)
        })
    }
    render() {
      return (
        <div id="create-note">
          <ModalBox>
            <ModalHeader><h3>Create Note</h3></ModalHeader>
            <ModalBody>
              <select onChange={(e) => { this.setIssueId(e.target.value) }}>
                {
                  this.state.noteIssues.map((item, i) => (
                    <option key={item.id} value={item.id}>{item.code}</option>
                  ))
                }
              </select>
              <textarea onChange={(e) => { this.setNoteDescription(e.target.value) }}></textarea>
            </ModalBody>
            <ModalFooter>
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontWeight: '600' }}>
                <button className='btn btn-primary' onClick={this.handleSave}> OK </button>
                <button className='btn btn-secondary' onClick={unMountModal}> Cancel </button>
              </div>
            </ModalFooter>
          </ModalBox>
        </div>
      )
    }
  }
}
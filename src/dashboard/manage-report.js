import React from 'react'
import CustomButton from 'Components/button'
import * as Api from '../api'
import Layout from 'Components/layout'
import Card from 'Components/card'
import Icon from "Components/icon"
import "Sass/upload-report.scss"
import { Form } from '@auth0/cosmos'

class UploadReport extends React.Component {
  constructor () {
    super()
    this.state = {
      message: "Choose csv file",
      reportTypeIdx: 1,
      selectedReportType: "Refund Report"
    }
    this.reportTypes = [
      { text: 'Refund Report', value: 1 },
      { text: 'Settlement Report', value: 2 }
    ]
    this.url = ""
    this.handleChange = this.handleChange.bind(this)
    this.handleUploadClick = this.handleUploadClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setUploadUrl = this.setUploadUrl.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  handleSubmit () {
    const formData = new FormData()
    formData.append('data', this.state.data)
    this.setUploadUrl()
    const payload = {
      data: formData,
      url: this.url
    }
    Api.uploadReport(payload)
  }

  handleUploadClick () {
    this.fileInput.click()
  }

  handleChange (e) {
    this.setState({ message: 'Choose csv file' })
    const file = e.target.files[0]
    this.setState({
      data: file,
      message: file.name
    })
  }

  handleSelectChange (e) {
    const selectedReportType = this.reportTypes.filter(item => item.value === parseInt(e.target.value))[0].text
    this.setState({ reportTypeIdx: e.target.value, selectedReportType })
  }

  setUploadUrl () {
    switch(this.state.selectedReportType) {
      case 'Refund Report':
        this.url = "/Api/upload/refundreport"
        break;
      case 'Settlement Report':
        this.url = "/Api/upload/settlementreport"
        break;
      default: 
        break;
    }
  }

  render () {
    return (
      <Layout title="Upload Report">
        <Card width="340px" className="file-uploader-container">
          <Form layout="label-on-top" style={{ marginBottom: "20px" }}>
            <Form.Select
              options={this.reportTypes}
              label="Report Type"
              value={this.state.reportTypeIdx}
              onChange={event => this.handleSelectChange(event)}
            />
          </Form>
          <div
            onClick={this.handleUploadClick}
            className='file-uploader'
          >
            <Icon name="upload" />
            <p>{this.state.message}</p>
          </div>
          <input
            style={{ display: 'none' }}
            ref={(node) => { this.fileInput = node }}
            onChange={(e) => { this.handleChange(e) }}
            type="file"
            accept=".csv"
          />
        </Card>
        <CustomButton text="Upload" handleClick={this.handleSubmit} />
      </Layout>
    )
  }
}

export default UploadReport

import React from 'react'
import CustomButton from 'Components/button'
import * as Api from './../api'
import Layout from 'Components/layout'
import Card from 'Components/card'
import Icon from "Components/icon"
import "Sass/upload-report.scss"

class UploadRefundReport extends React.Component {
  constructor () {
    super()
    this.state = {
      message: 'Choose a csv file'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleUploadClick = this.handleUploadClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit () {
    const formData = new FormData()
    formData.append('data', this.state.data)
    Api.uploadRefundReport(formData)
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

  render () {
    return (
      <Layout title="Upload Refund Report">
        <Card width="340px" className="file-uploader-container">
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

export default UploadRefundReport

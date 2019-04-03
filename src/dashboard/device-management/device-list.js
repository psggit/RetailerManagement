import React from "react"
import Layout from "Components/layout"
import { Table } from '@auth0/cosmos'
import { Icon, Spinner, List, Dialog } from '@auth0/cosmos'
import { Form, Checkbox, ButtonGroup } from '@auth0/cosmos'
import Button from "Components/button"
import * as Api from './../../api'
import "./device-management.scss"
import Switch2 from 'Components/switch'
import ModalHeader from 'Components/ModalBox/ModalHeader'
import ModalBody from 'Components/ModalBox/ModalBody'
import ModalBox from 'Components/ModalBox'
import ModalFooter from 'Components/ModalBox/ModalFooter'

class DeviceList extends React.Component {
  constructor() {
    super()
    this.state = {
      retailerData: {},
      deviceList: [],
      loadingDeviceList: true,
      mountDialog: false,
      mountAddDevice: false,
      posId: "",
      deviceStatus: "",
      deviceNumber: "",
      email: "",
      operator: "",
      password: "",
      newDeviceNumber: "",
      newDeviceStatus: true,
      selectedDeviceStatusIdx: 1,
      mobile: "",
      newDeviceNumberErr: {
        value: "",
        status: false
      },
      passwordErr: {
        value: "",
        status: false
      },
      emailErr: {
        value: "",
        status: false
      },
      operatorErr: {
        value: "",
        status: false
      },
      mobileErr: {
        value: "",
        status: false
      }
    }

    this.onToggleChange = this.onToggleChange.bind(this)
    this.deactivateDevice = this.deactivateDevice.bind(this)
    this.successCallback = this.successCallback.bind(this)
    this.fetchDeviceList = this.fetchDeviceList.bind(this)
    this.mountAddDeviceModal = this.mountAddDeviceModal.bind(this)
    this.addDevice = this.addDevice.bind(this)
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.isFormValid = this.isFormValid.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this)
    this.successDeviceListCallback = this.successDeviceListCallback.bind(this)
    this.failureDeviceListCallback = this.failureDeviceListCallback.bind(this)
    this.setDefaultState = this.setDefaultState.bind(this)
  }

  componentDidMount() {
    this.setState({retailerData: this.props.location.state})
    this.fetchDeviceList({
      retailer_id: this.props.location.state.id
    })
  }

  fetchDeviceList(payload) {
    Api.fetchDeviceList(payload, this.successDeviceListCallback, this.failureDeviceListCallback)
  }

  successDeviceListCallback(response) {
		if (response && response.device_details) {
			this.setState({ deviceList: response.device_details, loadingDeviceList: false })
		} else {
			this.setState({ deviceList: [], loadingDeviceList: false })
		}
	}

	failureDeviceListCallback() {
		this.setState({ deviceList: [], loadingDeviceList: false })
	}

  onToggleChange(item, value) {
		this.setState({ mountConfirmationDialog: true, posId: item.id, deviceStatus: item.is_active, deviceNumber: item.device_number })
  }

  handleStatusChange(e) {
    this.setState({
      newDeviceStatus: e.target.value === 1 ? true : false,
      selectedDeviceStatusIdx: e.target.value})
  }
  
  unmountDialog(modalName) {
    this.setDefaultState()
		this.setState({ [modalName]: false })
	}

	deactivateDevice() {
		this.unmountDialog('mountConfirmationDialog')
		Api.deactivateDevice({
			pos_id: this.state.posId,
			is_active: this.state.deviceStatus === true ? false : true
		}, this.successCallback)
	}

	successCallback() {
    this.setDefaultState()
		this.fetchDeviceList({
      retailer_id: this.props.location.state.id,
		})
  }

  setDefaultState() {
    this.setState({
      email: "",
      mobile: "",
      newDeviceNumber: "",
      operator: "",
      password: "",
      selectedDeviceStatusIdx: 1,
      newDeviceStatus: true,
      newDeviceNumberErr: {
        value: "",
        status: false
      },
      passwordErr: {
        value: "",
        status: false
      },
      emailErr: {
        value: "",
        status: false
      },
      operatorErr: {
        value: "",
        status: false
      },
      mobileErr: {
        value: "",
        status: false
      }
    })
  }

  handleFieldChange(evt) {
    const errName = `${evt.target.name}Err`
    this.setState({
      [errName] : {
        value: "",
        status: false
      }
    })
    if(!evt.target.validity.patternMismatch) {
      //console.log("log")
      this.setState({ [evt.target.name]: evt.target.value})
    } else { 
      //console.log("else")
      evt.preventDefault()
    }
  }

  handleTextChange(e) {
    const errName = `${e.target.name}Err`
    this.setState({
      [errName] : {
        value: "",
        status: false
      }
    })
    this.setState({[e.target.name]: e.target.value})
  }

  isFormValid() {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(this.state.newDeviceNumber.trim().length === 0) {
      this.setState({
        newDeviceNumberErr: {
          value: "Device number is required",
          status: true
        }
      })
      return false;
    } else if(this.state.password.trim().length === 0) {
      this.setState({
        passwordErr: {
          value: "Password is required",
          status: true
        }
      })
      return false;
    } else if(this.state.email.trim().length === 0) {
      this.setState({
        emailErr: {
          value: "Email is required",
          status: true
        }
      })
      return false;
    } else if(!emailRegex.test(this.state.email.trim())) {
      this.setState({
        emailErr: {
          value: "Email is invalid",
          status: true
        }
      })
      return false;
    } else if(this.state.mobile.trim().length === 0) {
      this.setState({
        mobileErr: {
          value: "Mobile is required",
          status: true
        }
      })
      return false;
    } else if(this.state.operator.trim().length === 0) {
      this.setState({
        operatorErr: {
          value: "Operator is required",
          status: true
        }
      })
      return false;
    }
    return true;
  }

  mountAddDeviceModal() {
    this.setState({mountAddDevice: true})
  }

  addDevice() {
    if(this.isFormValid()) {
      this.unmountDialog('mountAddDevice')
      Api.addDevice({
        retailer_id: this.props.location.state.id,
        email: this.state.email,
        mobile_number: this.state.mobile,
        device_number: this.state.newDeviceNumber,
        operator: this.state.operator,
        password: this.state.password,
        is_active: this.state.newDeviceStatus
      }, this.successCallback)
    }
  }
 
  render() {
    const {retailerData, deviceList, emailErr, newDeviceNumberErr, mobileErr, passwordErr, operatorErr} = this.state
    return (
      <Layout title="Device Management">
        <div id="deviceManagement">
          <div className="section">
            <div className="item">
              <span className="title">Retailer Id:</span>
              <span>{retailerData.id}</span>
            </div>
            <div className="item">
              <span className="title">City Name:</span>
              <span>{retailerData.city_name}</span>
            </div>
          </div>
          <div className="section">
            <div className="item">
              <span className="title">Outlet Name:</span>
              <span>{retailerData.outlet_name}</span>
            </div>
            <div className="item">
              <span className="title">Organization Id:</span>
              <span>{retailerData.organisation_id}</span>
            </div>
          </div>
          <div className="section">
            <p>Mapped Device List</p>
            <Button text="Add Device" handleClick={this.mountAddDeviceModal}>Add Device</Button>
          </div>
          {
            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
              <Table
                emptyMessage={this.state.loadingDeviceList ? <Spinner /> : 'No devices found'}
                items={deviceList}
                //onRowClick={(e, item) => this.handleRowClick(e, item)}
              >
                <Table.Column field="email" title="Email" />
                <Table.Column field="mobile_number" title="Mobile" />
                <Table.Column field="device_number" title="Device Number" />
                <Table.Column field="actions" title="Status">
                  {item => (
                    <Switch2 on={item.is_active === true} accessibleLabels={[]} onToggle={this.onToggleChange} value={item} />
                  )}
                </Table.Column>
              </Table>
            </div>
          }
          {
            this.state.mountConfirmationDialog &&
            <ModalBox>
              <ModalHeader>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '18px' }}>{this.state.deviceStatus === true ? 'Deactivate' : 'Activate'} Device</div>
                </div>
              </ModalHeader>
              <ModalBody height='60px'>
                <table className='table--hovered'>
                  <tbody>
                    Are you sure you want to {this.state.deviceStatus === true ? 'Deactivate' : 'Activate'} this device - {this.state.deviceNumber}
                  </tbody>
                </table>
              </ModalBody>
              <ModalFooter>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontWeight: '600' }}>
                  <button className='btn btn-primary' onClick={() => this.deactivateDevice()}> OK </button>
                  <button className='btn btn-secondary' onClick={() => this.unmountDialog('mountConfirmationDialog')}> Cancel </button>
                </div>
              </ModalFooter>

            </ModalBox>
          }
          {
            this.state.mountAddDevice &&
            <ModalBox>
              <ModalHeader>
                Add Device
              </ModalHeader>
              <ModalBody>
                <div>
                  <Form layout="label-on-top">
                    <Form.TextInput
                      //placeholder="Crystal Wines"
                      label="Email*"
                      type="text"
                      name="email"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      autoComplete="fefef"
                      value={this.state.email}
                      error={emailErr.status ? emailErr.value : ''}
                      onChange={(e) => this.handleTextChange(e)}
                    />
                    <Form.TextInput
                      //placeholder="Crystal Wines"
                      label="Mobile*"
                      type="text"
                      maxLength={10}
                      pattern="[0-9]*$"
                      name="mobile"
                      autoComplete="fefef"
                      value={this.state.mobile}
                      error={mobileErr.status ? mobileErr.value : ''}
                      onChange={(e) => this.handleFieldChange(e)}
                    />
                    <Form.TextInput
                      //placeholder="Crystal Wines"
                      label="Device Number*"
                      type="text"
                      name="newDeviceNumber"
                      autoComplete="fefef"
                      //maxLength={16}
                      //pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      value={this.state.newDeviceNumber}
                      error={newDeviceNumberErr.status ? newDeviceNumberErr.value : ''}
                      onChange={(e) => this.handleTextChange(e)}
                    />
                    <Form.TextInput
                      //placeholder="Crystal Wines"
                      label="Operator*"
                      type="text"
                      name="operator"
                      autoComplete="fefef"
                      pattern="[a-zA-Z]*"
                      value={this.state.operator}
                      error={operatorErr.status ? operatorErr.value : ''}
                      onChange={(e) => this.handleFieldChange(e)}
                    />
                    <Form.TextInput
                      //placeholder="Crystal Wines"
                      label="Password*"
                      type="text"
                      name="password"
                      autoComplete="fefef"
                      pattern="[a-zA-Z0-9!#@]*"
                      value={this.state.password}
                      error={passwordErr.status ? passwordErr.value : ''}
                      onChange={(e) => this.handleFieldChange(e)}
                    />
                    <Form.Select
                      label="Status*"
                      value={this.state.selectedDeviceStatusIdx}
                      name="newDeviceStatus"
                      options={[
                        { text: 'Active', value: '1' },
                        { text: 'In Active', value: '2' },
                      ]}
                      onChange={(e) => this.handleStatusChange(e)}
                    />
                  </Form>
                </div>
              </ModalBody>
              <ModalFooter>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontWeight: '600' }}>
                  <button className='btn btn-primary' onClick={() => this.addDevice()}> Add </button>
                  <button className='btn btn-secondary' onClick={() => this.unmountDialog('mountAddDevice')}> Cancel </button>
                </div>
              </ModalFooter>
            </ModalBox>
          }
        </div>
      </Layout>
    )
  }
}

export default DeviceList
import React from 'react'
import { Form, Checkbox, ButtonGroup } from '@auth0/cosmos'
import { validateTextField, validateEmail, validateNumberField } from 'Utils/validators'
import { checkCtrlA, validateNumType, checkCtrlV } from 'Utils/logic-utils'
import CustomButton from 'Components/button'
import PropTypes from "prop-types"

class RetailerForm extends React.Component {
	constructor (props) {
		super(props)
		this.inputNameMap = {
			storeCode: 'Store code',
			outletName: 'Outlet name',
			exciseLicenceNo: 'Excise license no',
			discountPercent: 'Discount percent',
			serviceChargePercent: 'Service charge percent',
			deliveryDiscountPercent: 'Delivery discount percent',
			FSSAINumber: 'FSSAI number',
			bankName: 'Bank name',
			accountHolderName: 'Account holder name',
			accountNumber: 'Account number',
			branch: 'Branch',
			IFSC: 'IFSC code',
			outletAddress: 'Outlet address',
			landlineNo: 'Landline number',
			mobileNo: 'Mobile number',
			gpsCoordinates: 'GPS coordinates',
			pincode: 'Pincode',
			email: 'Email'
		}
		console.log("props", props)
		this.errorFlag = false,
			this.orgIndexError = false,
			this.state = {
				organizationList: this.props.organizationList,
				organizationMap: this.props.organizationMap,
				stateList: this.props.stateList,
				stateMap: this.props.stateMap,
				cityList: this.props.cityList,
				selectedOrganizationIdx: props.data ? props.data.organisation_id : 0,
				storeCode: props.data ? props.data.ksbcl_code : '',
				outletName: props.data ? props.data.outlet_name : '',
				exciseLicenceNo: props.data ? props.data.excise_licence_number : '',
				discountPercent: props.data ? props.data.discount_percent : '',
				deliveryDiscountPercent: props.data ? props.data.delivery_discount_percent : '',
				serviceChargePercent: props.data ? props.data.service_charge_percent : '',
				KYCVerified: props.data ? props.data.KYCVerified : '',
				selectedKycIdx: props.data ? (props.data.kyc_status === "true" ? "1" : "2") : "1",
				selectedOutletStatusIdx: props.data ? (props.data.branch_status === "true" ? "1" : "2") : "1",
				// selectedUpiStoreTypeIdx: props.data ? (props.data.store_type === "P2PM" ? "1" : "2") : "1",
				FSSAINumber: props.data ? props.data.fssai_no : '',
				selectedCityIdx: props.data ? props.data.city_id : 0,
				selectedStateIdx: props.data ? props.data.state_id : 0,
				pincode: props.data ? props.data.pincode : '',
				outletAddress: props.data ? props.data.store_address : '',
				landlineNo: props.data ? props.data.landline_number : '',
				gpsCoordinates: props.data ? props.data.gps_cordinates : '',
				mobileNo: props.data ? props.data.mobile_number : '',
				email: props.data ? props.data.email : '',
				bankName: props.data ? props.data.bank_name : '',
				accountHolderName: props.data ? props.data.acc_holder_name : '',
				accountNumber: props.data ? props.data.account_number : '',
				branch: props.data ? props.data.bank_branch : '',
				accountType: props.data ? props.data.acc_type : 'savings',
				// customerFilterTag: props.data ? props.data.customer_filter_tag : 'mall',
				IFSC: props.data ? props.data.ifsc_code : '',
				cancelledCheck: props.data ? props.data.is_cancelled_cheque : false,
				isHipbarWalletEnabled: props.data ? props.data.hbwallet_enabled : false,
				isUpiEnabled: props.data ? props.data.upi_enabled : false,
				isGiftWalletEnabled: props.data ? props.data.gift_wallet_enabled : false,
				catalogEnabled: props.data ? props.data.catalog_enabled : false,
				hbRecommended: props.data ? props.data.recommended_retailer : false,
				inventoryEnabled: props.data ? props.data.inventory_enabled : false,
				deliveryEnabled: props.data ? props.data.is_deliverable : false,
				exciseLicense: props.data ? props.data.is_excise_license : false,
				outletPhoto: props.data ? props.data.is_photo_of_outlet : false,

				storeCodeErr: {
					value: '',
					status: false
				},
				outletNameErr: {
					value: '',
					status: false
				},
				exciseLicenceNoErr: {
					value: '',
					status: false
				},
				discountPercentErr: {
					value: '',
					status: false
				},
				deliveryDiscountPercentErr: {
					value: '',
					status: false
				},
				serviceChargePercentErr: {
					value: '',
					status: false
				},
				FSSAINumberErr: {
					value: '',
					status: false
				},
				outletAddressErr: {
					value: '',
					status: false
				},
				pincodeErr: {
					value: '',
					status: false
				},
				landlineNoErr: {
					value: '',
					status: false
				},
				mobileNoErr: {
					value: '',
					status: false
				},
				emailErr: {
					value: '',
					status: false
				},
				bankNameErr: {
					value: '',
					status: false
				},
				accountHolderNameErr: {
					value: '',
					status: false
				},
				accountNumberErr: {
					value: '',
					status: false
				},
				branchErr: {
					value: '',
					status: false
				},
				IFSCErr: {
					value: '',
					status: false
				},
				gpsCoordinatesErr: {
					value: '',
					status: false
				}
			}

		this.handleChange = this.handleChange.bind(this)
		this.handleSelectChange = this.handleSelectChange.bind(this)
		this.handleTextChange = this.handleTextChange.bind(this)
		this.handleEmailChange = this.handleEmailChange.bind(this)
		this.handleNumberChange = this.handleNumberChange.bind(this)
		this.getData = this.getData.bind(this)
		this.checkForm = this.checkForm.bind(this)
		this.handleSave = this.handleSave.bind(this)
		this.validate = this.validate.bind(this)
		this.handleStateChange = this.handleStateChange.bind(this)
	}

// 	componentWillReceiveProps (newProps) {
// 		if (this.props.organizationList !== newProps.organizationList) {
// 			this.setState({ organizationList: newProps.organizationList })
	// componentWillReceiveProps (newProps) {
	// 	if (this.props.organizationList !== newProps.organizationList) {
	// 		this.setState({ organizationList: newProps.organizationList })
	// 	}

	// 	if (this.props.stateList !== newProps.stateList) {
	// 		this.setState({ stateList: newProps.stateList })
	// 		if (location.pathname.includes("create")) {
	// 			this.setState({ selectedStateIdx: newProps.stateList[0].value })
	// 		}
	// 	}

	// 	if (this.props.organizationMap !== newProps.organizationMap) {
	// 		this.setState({ organizationMap: newProps.organizationMap })
	// 		// if (location.pathname.includes("edit")) {
	// 		// 	console.log("Edit")
	// 		// 	let updateCityIdx = false
	// 		// 	this.setState({ cityList: newProps.stateMap[newProps.organizationMap[this.props.data.organisation_id].state_id] })

	// 		// 	const cityFound = newProps.stateMap[newProps.organizationMap[this.props.data.organisation_id].state_id].find((item) => parseInt(item.value) === parseInt(this.state.selectedCityIdx))

	// 		// 	if (!cityFound) {
	// 		// 		this.setState({ selectedCityIdx: newProps.stateMap[newProps.organizationMap[this.props.data.organisation_id].state_id][0].value })
	// 		// 	}
	// 		// }
	// 	}

	// 	if (this.props.stateMap !== newProps.stateMap) {
	// 		this.setState({ stateMap: newProps.stateMap })
	// 	}

	// 	if (newProps.cityList && this.props.cityList !== newProps.cityList) {
	// 		console.log("city", newProps.cityList, this.state.selectedCityIdx)

	// 		this.setState({ cityList: newProps.cityList })
	// 		if (location.pathname.includes("create")) {
	// 			this.setState({ selectedCityIdx: newProps.cityList[0].value })
	// 		}
	// 	}
	// }

	// eslint-disable-next-line no-unused-vars
	componentDidUpdate (prevProps, prevState) {
		if (this.props.organizationList !== prevProps.organizationList) {
			this.setState({ organizationList: this.props.organizationList })
		}

		if (this.props.stateList !== prevProps.stateList) {
			this.setState({ stateList: this.props.stateList })
			if (location.pathname.includes("create")) {
				this.setState({ selectedStateIdx: this.props.stateList[0].value })
			}
		}

		if (this.props.organizationMap !== prevProps.organizationMap) {
			this.setState({ organizationMap: this.props.organizationMap })
		}

		if (this.props.stateMap !== prevProps.stateMap) {
			this.setState({ stateMap: this.props.stateMap })
		}

		if (prevProps.cityList && this.props.cityList !== prevProps.cityList) {
			this.setState({ cityList: this.props.cityList })
			if (location.pathname.includes("create")) {
				this.setState({ selectedCityIdx: this.props.cityList[0].value })
			}
		}
	}

	handleStateChange (e) {
		if (e.target.name.toString().includes("StateIdx")) {
			this.setState({
				cityList: this.state.stateMap[e.target.value],
				[e.target.name]: e.target.value
			})
		}
	}

	handleChange (e) {
		if (e.target.name.includes("OrganizationIdx")) {
			this.orgIndexError = false
			this.setState({
				selectedStateIdx: parseInt(this.state.organizationMap[e.target.value].state_id),
				cityList: this.state.stateMap[parseInt(this.state.organizationMap[e.target.value].state_id)],
				selectedCityIdx: this.state.stateMap[parseInt(this.state.organizationMap[e.target.value].state_id)][0].value,
				[e.target.name]: e.target.value
			})
		} else {
			this.setState({
				[e.target.name]: e.target.value
			})
		}
	}

	handleSelectChange (e) {
		this.setState({ [e.target.name]: e.target.checked })
	}

	handleTextChange (e) {
		const errName = `${e.target.name}Err`

		this.setState({
			[e.target.name]: e.target.value,
			[errName]: validateTextField(this.inputNameMap[e.target.name], e.target.value),
		})
	}

	handleNumberChange (e) {
		const errName = `${e.target.name}Err`
		this.length = 0
		this.checkLength = true

		switch (e.target.name) {
			case 'pincode':
				this.length = 6
				this.checkLength = true
				break;

			case 'mobileNo':
				this.length = 10
				this.checkLength = true
				break;

			default:
				this.checkLength = false
				break;
		}

		if (validateNumType(e.keyCode) || checkCtrlA(e) || checkCtrlV(e)) {
			this.setState({
				[e.target.name]: e.target.value,
				[errName]: validateNumberField({
					fieldName: this.inputNameMap[e.target.name],
					fieldValue: e.target.value,
					length: this.length,
					checkLength: this.checkLength
				})
			})
		} else {
			e.preventDefault()
		}
	}

	handleEmailChange (e) {
		const errName = `${e.target.name}Err`

		this.setState({
			[e.target.name]: e.target.value,
			[errName]: validateEmail(this.inputNameMap[e.target.name], e.target.value),
		})
	}

	getData () {
		return this.state
	}

	handleSave (e) {
		e.preventDefault()
		this.checkForm()
		if (!this.errorFlag && !this.orgIndexError) {
			this.props.handleSave()
		}
	}

	checkForm () {
		this.errorFlag = false
		const formEl = document.getElementById('RetailerForm')
		const inputCollection = formEl.getElementsByTagName('input')
		const inputsArr = Array.prototype.slice.call(inputCollection)
		if (this.state.selectedOrganizationIdx === 0) {
			this.orgIndexError = true
		}

		const textInputs = inputsArr.filter(item => item.type == 'text')
		textInputs.forEach(item => {
			this.validate(item)
		})
	}

	validate (item) {
		const errName = `${item.name}Err`

		if (item.name === "pincode" || item.name === "mobileNo" || item.name === "discountPercent" || item.name === "serviceChargePercent" || item.name === "deliveryDiscountPercent") {
			this.length = 0
			this.checkLength = true

			switch (item.name) {

				case 'pincode':
					this.length = 6
					this.checkLength = true
					break;

				case 'mobileNo':
					this.length = 10
					this.checkLength = true
					break;

				default:
					this.checkLength = false
					break;
			}
			const error = validateNumberField({
				fieldName: this.inputNameMap[item.name],
				fieldValue: item.value,
				length: this.length,
				checkLength: this.checkLength
			})
			if (error.status) {
				this.errorFlag = true
			}
			this.setState({
				[errName]: validateNumberField({
					fieldName: this.inputNameMap[item.name],
					fieldValue: item.value,
					length: this.length,
					checkLength: this.checkLength
				}),
			})
		} else if (item.name === "email") {
			const error = validateEmail(this.inputNameMap[item.name], item.value)
			if (error.status) {
				this.errorFlag = true
			}
			this.setState({
				[errName]: validateEmail(this.inputNameMap[item.name], item.value),
			})

		} else {
			const error = validateTextField(this.inputNameMap[item.name], item.value)
			if (error.status) {
				this.errorFlag = true
			}
			this.setState({
				[errName]: validateTextField(this.inputNameMap[item.name], item.value),
			})
		}
	}

	render () {
		const {
			storeCodeErr,
			outletNameErr,
			exciseLicenceNoErr,
			discountPercentErr,
			serviceChargePercentErr,
			deliveryDiscountPercentErr,
			FSSAINumberErr,
			bankNameErr,
			accountHolderNameErr,
			accountNumberErr,
			branchErr,
			IFSCErr,
			outletAddressErr,
			pincodeErr,
			landlineNoErr,
			mobileNoErr,
			emailErr,
			gpsCoordinatesErr,
		} = this.state
		console.log("state", this.state)
		return (
			<div id="RetailerForm">
				<Form layout="label-on-top">
					<Form.FieldSet label="Organization Details">
						<Form.Select
							placeholder="Select Organization"
							label="Organization*"
							value={this.state.selectedOrganizationIdx}
							name="selectedOrganizationIdx"
							error={this.orgIndexError ? 'Organization name is required' : ''}
							options={this.state.organizationList}
							onChange={(e) => this.handleChange(e)}
						/>
						<Form.TextInput
							label="Store Code*"
							type="text"
							name="storeCode"
							value={this.state.storeCode}
							error={storeCodeErr.status ? storeCodeErr.value : ''}
							onChange={(e) => this.handleTextChange(e)}
							autoComplete="fefef"
						/>
						<Form.TextInput
							label="Outlet Name*"
							type="text"
							name="outletName"
							value={this.state.outletName}
							error={outletNameErr.status ? outletNameErr.value : ''}
							onChange={(e) => this.handleTextChange(e)}
							autoComplete="fefef"
						/>
						{/* <Form.Radio
							name="customerFilterTag"
							label="Customer Filter Tag*"
							type="radio"
							selected={this.state.customerFilterTag}
							autoComplete="fefef"
							onChange={e => this.handleChange(e)}
							align="horizontal"
						>
							<Form.Radio.Option value="mall">Mall Store</Form.Radio.Option>
							<Form.Radio.Option value="non-mall">Non-Mall Store</Form.Radio.Option>
						</Form.Radio> */}
						<div style={{ marginBottom: '20px' }}>
							<div style={{ marginBottom: '8px' }}>
								<label style={{fontWeight: "500"}}> Payment Type*</label>
							</div>
							<div style={{ display: 'flex' }}>
								<div style={{ marginRight: '24px' }}>
									<Checkbox
										name="isHipbarWalletEnabled"
										onChange={e => this.handleSelectChange(e)}
										value="isHipbarWalletEnabled"
										checked={this.state.isHipbarWalletEnabled}
									>
										Hipbar Wallet
									</Checkbox>
								</div>
								<div style={{ marginRight: '24px' }}>
									<Checkbox
										name="isGiftWalletEnabled"
										onChange={e => this.handleSelectChange(e)}
										value="isGiftWalletEnabled"
										checked={this.state.isGiftWalletEnabled}
									>
										Gift Wallet
									</Checkbox>
								</div>
								<div style={{ marginRight: '24px' }}>
									<Checkbox
										name="isUpiEnabled"
										onChange={e => this.handleSelectChange(e)}
										value="isUpiEnabled"
										checked={this.state.isUpiEnabled}
									>
										UPI
									</Checkbox>
								</div>
							</div>
						</div>
						<div style={{ marginBottom: '20px' }}>
							<div style={{ display: 'flex' }}>
								<div style={{ marginRight: '24px' }}>
									<Checkbox
										name="catalogEnabled"
										onChange={e => this.handleSelectChange(e)}
										value="catalogEnabled"
										checked={this.state.catalogEnabled}
									>
										Catalog Enabled
									</Checkbox>
								</div>
								<div style={{ marginRight: '24px' }}>
									<Checkbox
										name="hbRecommended"
										onChange={e => this.handleSelectChange(e)}
										value="hbRecommended"
										checked={this.state.hbRecommended}
									>
										Hipbar Recommended
									</Checkbox>
								</div>
								<div style={{ marginRight: '24px' }}>
									<Checkbox
										name="inventoryEnabled"
										onChange={e => this.handleSelectChange(e)}
										value="inventoryEnabled"
										checked={this.state.inventoryEnabled}
									>
										Inventory Enabled
									</Checkbox>
								</div>
								<div style={{ marginRight: '24px' }}>
									<Checkbox
										name="deliveryEnabled"
										onChange={e => this.handleSelectChange(e)}
										value="deliveryEnabled"
										checked={this.state.deliveryEnabled}
									>
										Delivery Enabled
									</Checkbox>
								</div>
							</div>
						</div>
						{/* <Form.Select
							label="UPI Store Type*"
							value={this.state.selectedUpiStoreTypeIdx}
							name="selectedUpiStoreTypeIdx"
							options={[
								{ text: 'P2PM', value: '1' },
								{ text: 'P2M', value: '2' },
							]}
							onChange={(e) => this.handleChange(e)}
						/> */}
						<Form.TextInput
							label="Excise License Number*"
							type="text"
							name="exciseLicenceNo"
							value={this.state.exciseLicenceNo}
							error={exciseLicenceNoErr.status ? exciseLicenceNoErr.value : ''}
							onChange={(e) => this.handleTextChange(e)}
							autoComplete="fefef"
						/>
						<Form.TextInput
							label="Discount Percent*"
							type="text"
							name="discountPercent"
							defaultValue={this.state.discountPercent}
							error={discountPercentErr.status ? discountPercentErr.value : ''}
							onKeyDown={(e) => { this.handleNumberChange(e) }}
							onKeyUp={(e) => { this.handleNumberChange(e) }}
							autoComplete="fefef"
						/>
						<Form.TextInput
							label="Service Charge Percent*"
							type="text"
							name="serviceChargePercent"
							defaultValue={this.state.serviceChargePercent}
							error={serviceChargePercentErr.status ? serviceChargePercentErr.value : ''}
							onKeyDown={(e) => { this.handleNumberChange(e) }}
							onKeyUp={(e) => { this.handleNumberChange(e) }}
							autoComplete="fefef"
						/>
						<Form.TextInput
							label="Delivery Discount Percent*"
							type="text"
							name="deliveryDiscountPercent"
							defaultValue={this.state.deliveryDiscountPercent}
							error={deliveryDiscountPercentErr.status ? deliveryDiscountPercentErr.value : ''}
							onKeyDown={(e) => { this.handleNumberChange(e) }}
							onKeyUp={(e) => { this.handleNumberChange(e) }}
							autoComplete="fefef"
						/>
						<Form.TextInput
							label="FSSAI Number*"
							type="text"
							name="FSSAINumber"
							value={this.state.FSSAINumber}
							error={FSSAINumberErr.status ? FSSAINumberErr.value : ''}
							onChange={(e) => this.handleTextChange(e)}
							autoComplete="fefef"
						/>
						<Form.Select
							label="KYC Verification Status*"
							value={this.state.selectedKycIdx}
							name="selectedKycIdx"
							options={[
								{ text: 'Verified', value: '1' },
								{ text: 'Not Verified', value: '2' },
							]}
							onChange={(e) => this.handleChange(e)}
						/>
						<Form.Select
							label="Outlet Status*"
							value={this.state.selectedOutletStatusIdx}
							name="selectedOutletStatusIdx"
							options={[
								{ text: 'Active', value: '1' },
								{ text: 'Inactive', value: '2' },
							]}
							onChange={(e) => this.handleChange(e)}
						/>
					</Form.FieldSet>
					<Form.FieldSet label="Bank Account Details">
						<Form.TextInput
							label="Bank Name*"
							type="text"
							name="bankName"
							value={this.state.bankName}
							autoComplete="fefef"
							error={bankNameErr.status ? bankNameErr.value : ''}
							onChange={(e) => this.handleTextChange(e)}
						/>
						<Form.TextInput
							label="Account Holder Name*"
							type="text"
							name="accountHolderName"
							value={this.state.accountHolderName}
							autoComplete="fefef"
							error={accountHolderNameErr.status ? accountHolderNameErr.value : ''}
							onChange={(e) => this.handleTextChange(e)}
						/>
						<Form.TextInput
							label="Account Number*"
							type="text"
							name="accountNumber"
							value={this.state.accountNumber}
							autoComplete="fefef"
							error={accountNumberErr.status ? accountNumberErr.value : ''}
							onChange={(e) => this.handleTextChange(e)}
						/>
						<Form.TextInput
							label="Branch*"
							type="text"
							name="branch"
							value={this.state.branch}
							autoComplete="fefef"
							error={branchErr.status ? branchErr.value : ''}
							onChange={(e) => this.handleTextChange(e)}
						/>
						<Form.Radio
							name="accountType"
							label="Account Type*"
							type="radio"
							selected={this.state.accountType}
							autoComplete="fefef"
							onChange={e => this.handleChange(e)}
							align="horizontal"
						>
							<Form.Radio.Option value="savings">Savings</Form.Radio.Option>
							<Form.Radio.Option value="current">Current</Form.Radio.Option>
							<Form.Radio.Option value="overdraft">ODCC Account</Form.Radio.Option>
						</Form.Radio>
						<Form.TextInput
							label="IFSC Code*"
							type="text"
							name="IFSC"
							value={this.state.IFSC}
							autoComplete="fefef"
							error={IFSCErr.status ? IFSCErr.value : ''}
							onChange={(e) => this.handleTextChange(e)}
						/>
						<div style={{ marginBottom: '20px' }}>
							<div style={{ marginBottom: '8px' }}>
								<label>Documents Attached as Proof</label>
							</div>
							<div style={{ display: 'flex' }}>
								<div style={{ marginRight: '24px' }}>
									<Checkbox
										name="cancelledCheck"
										onChange={e => this.handleSelectChange(e)}
										value="cancelledCheck"
										checked={this.state.cancelledCheck}
									>
										Cancelled Cheque
                                </Checkbox>
								</div>
								<div style={{ marginRight: '24px' }}>
									<Checkbox
										name="exciseLicense"
										onChange={e => this.handleSelectChange(e)}
										value="exciseLicense"
										checked={this.state.exciseLicense}
									>
										Excise License
                                </Checkbox>
								</div>
								<div style={{ marginRight: '24px' }}>
									<Checkbox
										name="outletPhoto"
										onChange={e => this.handleSelectChange(e)}
										value="outletPhoto"
										checked={this.state.outletPhoto}
									>
										Photo of the Outlet
                                </Checkbox>
								</div>
							</div>
						</div>
					</Form.FieldSet>
					<Form.FieldSet label="Outlet Contact Details">
						<Form.TextInput
							label="Outlet Address*"
							type="text"
							name="outletAddress"
							autoComplete="fefef"
							value={this.state.outletAddress}
							error={outletAddressErr.status ? outletAddressErr.value : ''}
							onChange={(e) => this.handleTextChange(e)}
						/>
						<Form.Select
							//disabled={true}
							label="State*"
							value={this.state.selectedStateIdx}
							name="selectedStateIdx"
							options={this.state.stateList}
							onChange={(e) => this.handleStateChange(e)}
						/>
						<Form.Select
							label="City*"
							value={this.state.selectedCityIdx}
							name="selectedCityIdx"
							options={this.state.cityList}
							onChange={(e) => this.handleChange(e)}
						/>
						<Form.TextInput
							label="Landline No*"
							type="text"
							name="landlineNo"
							autoComplete="fefef"
							error={landlineNoErr.status ? landlineNoErr.value : ''}
							value={this.state.landlineNo}
							onChange={(e) => this.handleTextChange(e)}
						/>
						<Form.TextInput
							label="Mobile No*"
							defaultValue={this.state.mobileNo}
							name="mobileNo"
							autoComplete="fefef"
							error={mobileNoErr.status ? mobileNoErr.value : ''}
							onKeyDown={(e) => { this.handleNumberChange(e) }}
							onKeyUp={(e) => { this.handleNumberChange(e) }}
						/>
						<Form.TextInput
							label="Email*"
							type="text"
							name="email"
							autoComplete="fefef"
							error={emailErr.status ? emailErr.value : ''}
							value={this.state.email}
							onChange={(e) => this.handleEmailChange(e)}
						/>
						<Form.TextInput
							placeholder="15.4935224,73.8340721"
							label="GPS Coordinates*"
							type="text"
							name="gpsCoordinates"
							autoComplete="fefef"
							error={gpsCoordinatesErr.status ? gpsCoordinatesErr.value : ''}
							value={this.state.gpsCoordinates}
							onChange={(e) => this.handleTextChange(e)}
						/>
						<Form.TextInput
							label="Pincode*"
							type="text"
							name="pincode"
							autoComplete="fefef"
							defaultValue={this.props.data ? this.props.data.pincode : ''}
							error={pincodeErr.status ? pincodeErr.value : ''}
							onKeyDown={(e) => this.handleNumberChange(e)}
							onKeyUp={(e) => this.handleNumberChange(e)}
						/>
						<ButtonGroup align="right">
							<CustomButton
								text="Save"
								handleClick={this.handleSave}
								disableSave={this.props.disableSave}
							/>
						</ButtonGroup>

					</Form.FieldSet>
				</Form>
			</div>
		)
	}
}

RetailerForm.propTypes = {
	organizationList: PropTypes.array,
	stateList: PropTypes.array,
	cityList: PropTypes.array,
	organizationMap: PropTypes.object,
	stateMap: PropTypes.object
}

export default RetailerForm
import React from 'react'
import Layout from 'Components/layout'
import Card from 'Components/card'
import { Form, Checkbox, Button, ButtonGroup } from '@auth0/cosmos'
import { validateOrganizationName } from 'Utils/validators'
//import { Form } from 'Styles/form-theme'

class CreateOrganization extends React.Component {
    constructor() {
        super()
        this.inputNameMap = {
            organizationName: 'OrganizationName',
            organizationType: 'OrganizationType',
            incorporationDate: 'IncorporationDate',
            cinNumber: 'CinNumber',
            panNumber: 'PanNumber',
            outletsCount: 'OutletsCount',
            // KYCVerified: '',
            // GSTNumber: '',
            organizationStatus: 'OrganizationStatus',
            organizationAddress: 'OrganizationAddress',
            city: 'City',
            state: 'State',
            pincode: 'Pincode',
            landlineNo: 'LandlineNo',
            authorizedPerson: 'AuthorizedPerson',
            mobileNo: 'MobileNo',
            emailId: 'EmailId',
        }
        this.state = {
            organizationName: '',
            organizationType: '',
            incorporationDate: '',
            cinNumber: '',
            panNumber: '',
            outletsCount: '',
            KYCVerified: '',
            GSTNumber: '',
            organizationStatus: '',
            organizationAddress: '',
            city: '',
            state: '',
            pincode: '',
            landlineNo: '',
            authorizedPerson: '',
            mobileNo: '',
            emailId: '',
            organizationNameErr: {
                value: '',
                status: false
            },
            organizationTypeErr: {
                value: '',
                status: false
            },
            incorporationDateErr: {
                value: '',
                status: false
            },
            cinNumberErr: {
                value: '',
                status: false
            },
            panNumberErr: {
                value: '',
                status: false
            },
            outletsCountErr: {
                value: '',
                status: false
            },
            KYCVerifiedErr: {
                value: '',
                status: false
            },
            GSTNumberErr: {
                value: '',
                status: false
            },
            organizationStatusErr: {
                value: '',
                status: false
            },
            organizationAddressErr: {
                value: '',
                status: false
            },
            cityErr: {
                value: '',
                status: false
            },
            stateErr: {
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
            authorizedPersonErr: {
                value: '',
                status: false
            },
            mobileNoErr: {
                value: '',
                status: false
            },
            emailIdErr: {
                value: '',
                status: false
            }
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        console.log("handle change", e.target.value, e.target.name, `validate${this.inputNameMap[e.target.name]}(${e.target.name})`)
        //this.setState({[e.target.name]: e.target.value})
        const errName = `${e.target.name}Err`
        const fnExp = eval(`validate${this.inputNameMap[e.target.name]}`)
        console.log("function", fnExp)
        this.setState({
            [e.target.name]: e.target.value,
            [errName]: fnExp(e.target.value)
        })
    }

    render() {
        const { organizationNameErr, 
                organizationTypeErr, 
                incorporationDateErr, 
                cinNumberErr, 
                panNumberErr, 
                outletsCountErr,
                KYCVerifiedErr,
                GSTNumberErr,
                organizationStatusErr,
                organizationAddressErr,
                cityErr,
                stateErr,
                pincodeErr,
                landlineNoErr,
                authorizedPersonErr,
                mobileNoErr,
                emailIdErr
        } = this.state
        return (
            <Layout title="Create Organization">
                <Card width="800px">
                    <Form layout="label-on-top">
                        <Form.FieldSet label="Organization Details">
                            <Form.TextInput
                                label="Organization Name*"
                                type="text"
                                name="organizationName"
                                value={this.state.organizationName}
                                error={organizationNameErr.status ? organizationNameErr.value : ''}
                                onChange={(e) => this.handleChange(e)}
                            />
                            <Form.TextInput
                                label="Date of Incorporation*"
                                type="text"
                                name="incorporationDate"
                                value={this.state.incorporationDate}
                                error={incorporationDateErr.status ? incorporationDateErr.value : ''}
                                onChange={(e) => this.handleChange(e)}
                            />
                            <div style={{marginBottom: '16px'}}>
                                <div style={{marginBottom: '8px'}}>
                                    <label>Organization Type*: </label>
                                </div>
                                <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                                    <Checkbox
                                        name="example"
                                        onChange={evt => this.handleChange(evt)}
                                        value="one"
                                        //checked={this.state.selected.indexOf('one') >= 0}
                                        align="vertical"
                                    >
                                        Proprietorship
                                    </Checkbox>
                                    <Checkbox
                                        name="example"
                                        onChange={evt => this.handleChange(evt)}
                                        value="one"
                                        //checked={this.state.selected.indexOf('one') >= 0}
                                        align="vertical"
                                    >
                                        Partnership
                                    </Checkbox>
                                    <Checkbox
                                        name="example"
                                        onChange={evt => this.handleChange(evt)}
                                        value="one"
                                        //checked={this.state.selected.indexOf('one') >= 0}
                                        align="vertical"
                                    >
                                        Pvt Ltd
                                    </Checkbox>
                                    <Checkbox
                                        name="example"
                                        onChange={evt => this.handleChange(evt)}
                                        value="one"
                                        //checked={this.state.selected.indexOf('one') >= 0}
                                        align="vertical"
                                    >
                                        Other(s)
                                    </Checkbox>
                                </div>
                            </div>
                            <Form.TextInput
                                label="PAN Number*"
                                type="text"
                                name="panNumber"
                                value={this.state.panNumber}
                                error={panNumberErr.status ? panNumberErr.value : ''}
                                onChange={(e) => this.handleChange(e)}
                            />
                            <Form.TextInput
                                label="CIN Number"
                                type="text"
                                name="cinNumber"
                                value={this.state.cinNumber}
                                error={cinNumberErr.status ? cinNumberErr.value : ''}
                                onChange={(e) => this.handleChange(e)}
                            />
                            <Form.TextInput
                                label="No of Outlets*"
                                type="text"
                                name="outletsCount"
                                value={this.state.outletsCount}
                                error={outletsCountErr.status ? outletsCountErr.value : ''}
                                onChange={(e) => this.handleChange(e)}
                            />
                            <Form.Select
                                label="KYC Verification Status*"
                                value={1}
                                options={[
                                    { text: 'Verified', value: '1' },
                                    { text: 'Not Verified', value: '2' },
                                ]}
                            />
                            {/* <Form.TextInput
                                label="KYC Verified*"
                                type="text"
                                name="KYCVerified"
                                value={this.state.KYCVerified}
                                onChange={(e) => this.handleChange(e)}
                            /> */}
                            <Form.Select
                                label="Organization Status*"
                                value={1}
                                options={[
                                    { text: 'Active', value: '1' },
                                    { text: 'Inactive', value: '2' },
                                ]}
                            />
                        </Form.FieldSet>
                        <Form.FieldSet label="Organization Contact Details">
                            <Form.TextArea 
                                label="Organization Address*" 
                                //placeholder="Add a lot of text here"
                                name="organizationAddress"
                                error={organizationAddressErr.status ? organizationAddressErr.value : ''}
                                value={this.state.organizationAddress}
                                onChange={(e) => this.handleChange(e)} 
                            />
                            <Form.TextInput
                                label="City*"
                                type="text"
                                name="city"
                                value={this.state.city}
                                error={cityErr.status ? cityErr.value : ''}
                                onChange={(e) => this.handleChange(e)}
                            />
                            <Form.TextInput
                                label="State*"
                                type="text"
                                name="state"
                                error={stateErr.status ? stateErr.value : ''}
                                value={this.state.state}
                                onChange={(e) => this.handleChange(e)}
                            />
                            <Form.TextInput
                                label="Pincode*"
                                type="text"
                                name="pincode"
                                value={this.state.pincode}
                                error={pincodeErr.status ? pincodeErr.value : ''}
                                onChange={(e) => this.handleChange(e)}
                            />
                            <Form.TextInput
                                label="Landline No*"
                                type="text"
                                name="landlineNo"
                                error={landlineNoErr.status ? landlineNoErr.value : ''}
                                value={this.state.landlineNo}
                                onChange={(e) => this.handleChange(e)}
                            />
                            <Form.TextInput
                                label="Authorized Person Name*"
                                type="text"
                                name="authorizedPerson"
                                error={authorizedPersonErr.status ? authorizedPersonErr.value : ''}
                                value={this.state.authorizedPerson}
                                onChange={(e) => this.handleChange(e)}
                            />
                            <Form.TextInput
                                label="Mobile No*"
                                type="text"
                                name="mobileNo"
                                error={mobileNoErr.status ? mobileNoErr.value : ''}
                                value={this.state.mobileNo}
                                onChange={(e) => this.handleChange(e)}
                            />
                            <Form.TextInput
                                label="Email*"
                                type="text"
                                name="emailId"
                                error={emailIdErr.status ? emailIdErr.value : ''}
                                value={this.state.emailId}
                                onChange={(e) => this.handleChange(e)}
                            />
                        </Form.FieldSet>
                        <ButtonGroup align="right">
                            <Button> Save </Button>
                            <Button> Download </Button>
                        </ButtonGroup>
                    </Form>
                </Card>
            </Layout>
        )
    }
}

export default CreateOrganization
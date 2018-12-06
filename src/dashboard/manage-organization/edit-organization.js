import React from 'react'
import Layout from 'Components/layout'
import OrganizationForm from './organization-form';
import Card from 'Components/card'
import { Form, Checkbox, Button, ButtonGroup } from '@auth0/cosmos'

class EditOrganization extends React.Component {
    constructor() {
        super()
        this.handleSave = this.handleSave.bind(this)
    }

    handleSave() {
        console.log("edited data", this.organizationDetailsForm.getData())
    }

    render() {
        //console.log("edit org", this.props.history.location.state)
        return (
            <Layout title="Edit Organization">
                <Card width="800px">
                    <OrganizationForm
                        ref={(node) => { this.organizationDetailsForm = node }}
                        data={this.props.history.location.state} 
                    />
                    <ButtonGroup align="right">
                        <Button onClick={() => this.handleSave()}> Save </Button>
                    </ButtonGroup>
                </Card>
            </Layout>
        )
    }
}

export default EditOrganization
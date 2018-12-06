import React from 'react'
import Layout from 'Components/layout'
import Card from 'Components/card'
import OrganizationForm from './organization-form'
import { Form, Checkbox, Button, ButtonGroup } from '@auth0/cosmos'

class CreateOrganization extends React.Component {
    constructor() {
        super()
      
        this.handleSave = this.handleSave.bind(this)
    }

    handleSave() {
        console.log("data", this.organizationDetailsForm.getData())
        //e.preventDefault()
    }

    render() {
        return (
            <Layout title="Create Organization">
                <Card width="800px">
                    <OrganizationForm
                        ref={(node) => { this.organizationDetailsForm = node }}
                    />
                    <ButtonGroup align="right">
                        <Button onClick={() => this.handleSave()}> Save </Button>
                        <Button> Download </Button>
                    </ButtonGroup>
                </Card> 
            </Layout>
        )
    }
}

export default CreateOrganization
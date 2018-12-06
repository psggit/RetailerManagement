import React from 'react'
import Layout from 'Components/layout'
import Card from 'Components/card'
import RetailerForm from './retailer-form'
import { Form, Checkbox, Button, ButtonGroup } from '@auth0/cosmos'

class CreateRetailer extends React.Component {
    constructor() {
        super()
        this.handleSave = this.handleSave.bind(this)
    }

    handleSave() {
        console.log("data", this.retailerDetailsForm.getData())
        //e.preventDefault()
    }

    render() {
        return (
            <Layout title="Create Retailer">
                <Card width="800px">
                    <RetailerForm
                        ref={(node) => { this.retailerDetailsForm = node }}
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

export default CreateRetailer
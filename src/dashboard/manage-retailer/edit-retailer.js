import React from 'react'
import Layout from 'Components/layout'
import RetailerForm from './retailer-form'
import Card from 'Components/card'
import { Form, Checkbox, Button, ButtonGroup } from '@auth0/cosmos'

class EditRetailer extends React.Component {
    constructor() {
        super()
        this.handleSave = this.handleSave.bind(this)
    }

    handleSave() {
        console.log("edited data", this.retailerDetailsForm.getData())
    }

    render() {
        //console.log("edit org", this.props.history.location.state)
        return (
            <Layout title="Edit Retailer">
                <Card width="800px">
                    <RetailerForm
                        ref={(node) => { this.retailerDetailsForm = node }}
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

export default EditRetailer
import React from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import Layout from 'Components/layout'
import { Form, Button, ButtonGroup } from '@auth0/cosmos'
import Card from 'Components/card'
import * as Api from './../api'

class GenerateReport extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedOrganizationIdx: 1,
            selectedStateIdx: 1,
            organizationList: [],
            organizationId: 1001
        }

        this.fetchOrganizationList = this.fetchOrganizationList.bind(this)
        this.formatOrganizationList = this.formatOrganizationList.bind(this)
        this.handleChange = this.handleChange.bind(this)
        //this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        this.setState({organizationList: []})
        this.fetchOrganizationList({}, this.formatOrganizationList)
    }

    handleChange(e) {
        //console.log("handle change", e.target.value, e.target.name, e.target.type)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    fetchOrganizationList(payloadOj, organizationListSuccessCallback) {
        Api.fetchOrganizationAndStateList(payloadOj, organizationListSuccessCallback)
    }

    formatOrganizationList(data) {
        console.log("Fetched org list with state details", data)
    }

    // handleClick() {
    //     console.log("handle download click")
    //     <a href="./../test.html" download />
    // }

    printDocument() {
        // html2canvas(document.querySelector("#root")).then(canvas => {
        //     document.body.appendChild(canvas)
        // })

        // const input = document.getElementById('pdf-root');
        // html2canvas(input)
        // .then((canvas) => {
        //     const imgData = canvas.toDataURL('image/png');
        //     const pdf = new jsPDF();
        //     pdf.addImage(imgData, 'JPEG', 0, 0);
        //     //pdf.output('dataurlnewwindow');
        //     pdf.save("download.pdf");
        // })
        // ;
        // var doc = new jsPDF();
        // var specialElementHandlers = {
        //     '#pdf-root': function (element, renderer) {
        //         return true;
        //     }
        // };
        // doc.fromHTML(('#root').html(), 15, 15, {
        //     'width': 700,
        //         'elementHandlers': specialElementHandlers
        // });
        // doc.save('file.pdf');
    }

    render() {
        return (
            <Layout title="Generate Report">
                <Card>
                    <Form layout="label-on-top">
                        <Form.Select
                            label="Organization Name*"
                            value={this.state.selectedOrganizationIdx}
                            name="selectedOrganizationIdx"
                            options={[
                                { text: 'Infinity Hospitality', value: '1' },
                                { text: 'M/S.Contessa Wines', value: '2' },
                            ]}
                            onChange={(e) => this.handleChange(e)}
                        />
                        <Form.Select
                            label="State"
                            disabled={true}
                            value={this.state.selectedStateIdx}
                            name="selectedStateIdx"
                            options={[
                                { text: 'Tamilnadu', value: '1' },
                                { text: 'Karnataka', value: '2' },
                            ]}
                            //onChange={(e) => this.handleChange(e)}
                        />
                    </Form>
                    {/* <ButtonGroup align="right"> */}
                    <a href={`/retailer-onboarding-form/${this.state.organizationId}`} target="_blank">
                        <Button> Download </Button>
                    </a>

                    {/* <Button onClick={this.printDocument}> Download</Button> */}
                       
                    {/* </ButtonGroup> */}
                </Card>
            </Layout>
        ) 
    }
}

export default GenerateReport
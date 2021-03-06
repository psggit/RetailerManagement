import React from 'react'
// import html2canvas from 'html2canvas'
// import jsPDF from 'jspdf'
import Layout from 'Components/layout'
import { Form } from '@auth0/cosmos'
import Card from 'Components/card'
import * as Api from './../api'
import { formatStateAndCityList, formatStateAndOrganizationList } from 'Utils/response-format-utils'
import CustomButton from 'Components/button'

class GenerateReport extends React.Component {
	constructor () {
		super()
		this.state = {
			selectedOrganizationIdx: 1,
			selectedStateIdx: 1,
			organizationList: [],
			stateList: [],
			organizationMap: {},
		}

		this.fetchOrganizationList = this.fetchOrganizationList.bind(this)
		this.formatOrganizationList = this.formatOrganizationList.bind(this)
		this.fetchStateAndCityList = this.fetchStateAndCityList.bind(this)
		this.formatResponse = this.formatResponse.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleClick = this.handleClick.bind(this)
	}

	componentDidMount () {
		this.fetchStateAndCityList({}, this.formatResponse)
		this.fetchOrganizationList({}, this.formatOrganizationList)
	}

	handleChange (e) {
		this.setState({
			selectedStateIdx: parseInt(this.state.organizationMap[e.target.value].state_id),
			[e.target.name]: e.target.value
		})
	}

	fetchOrganizationList (payloadOj, organizationListSuccessCallback) {
		Api.fetchOrganizationAndStateList(payloadOj, organizationListSuccessCallback)
	}

	formatOrganizationList (data) {
		const { organizationList, organizationMap } = formatStateAndOrganizationList(data.details)
		this.setState({ organizationList, organizationMap, selectedOrganizationIdx: organizationList[0].value })
	}

	fetchStateAndCityList (payload, stateListSuccessCallback) {
		Api.fetchStateAndCityList(payload, stateListSuccessCallback)
	}

	formatResponse (data) {
		const { stateList } = formatStateAndCityList(data.states)
		this.setState({ stateList, selectedStateIdx: stateList[0].value })
	}

	printDocument () {
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

	handleClick () {
		window.open(`/admin/retailer-onboarding-form/${this.state.selectedOrganizationIdx}`, '_blank')
	}

	render () {
		const { organizationList, stateList } = this.state
		return (
			<Layout title="Generate Report">
				<Card>
					<Form layout="label-on-top" style={{marginBottom: "20px"}}>
						<Form.Select
							label="Organization Name*"
							value={this.state.selectedOrganizationIdx}
							name="selectedOrganizationIdx"
							options={organizationList}
							onChange={(e) => this.handleChange(e)}
						/>
					</Form>
					<CustomButton text="Download" handleClick={this.handleClick} />
				</Card>
			</Layout>
		)
	}
}

export default GenerateReport
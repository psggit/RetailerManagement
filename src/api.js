//api.js
import { POST, GET } from 'Utils/fetch'
import Notify from 'Components/notify'

export function authChangePassword (req) {
	return POST({
		api: "/user/password/change",
		apiBase: "auth",
		data: req
	})
		.then(json => json)
}

export function uploadReport (req) {
	return POST({
		api: req.url,
		apiBase: "retailer",
		data: req.data,
		type: 'FormData'
	})
}

export function fetchOrganizationList (payloadObj, successCallback, failureCallback) {
	return POST({
		api: '/Api/listOrganisations',
		apiBase: 'retailer',
		data: payloadObj,
		handleError: true
	})
		.then((json) => {
			successCallback(json)
		})
		.catch(err => {
			console.log("Error in fetching organisation list", err)
			err.response.json().then(json => { Notify("danger", json.error) })
			failureCallback()
		})

}

export function fetchStateAndCityList (payloadObj, successCallback) {
	return POST({
		api: '/Api/listStates',
		apiBase: 'retailer',
		data: payloadObj,
		handleError: true
	})
		.then((response) => {
			successCallback(response)
		})
		.catch(err => {
			console.log("Error in fetching state and city map", err)
			err.response.json().then(json => { Notify("danger", json.message) })
		})
}

export function createOrganization (payloadObj, successCallback, failureCallback) {
	//console.log("api create org")
	return POST({
		api: '/Api/createOrganisation',
		apiBase: 'retailer',
		data: payloadObj,
		handleError: true
	})
		.then((json) => {
			Notify("success", "Successfully created organization")
			successCallback()
		})
		.catch(err => {
			console.log("Error in create organization", err)
			Notify("danger", "Error in creating organization")
			err.response.json().then(json => { Notify("danger", json.message) })
			failureCallback()
		})
}

export function updateOrganization (payloadObj, successCallback, failureCallback) {
	return POST({
		api: '/Api/updateOrganisation',
		apiBase: 'retailer',
		data: payloadObj,
		handleError: true
	})
		.then((json) => {
			Notify("success", "Successfully updated organization")
			successCallback(json)
		})
		.catch(err => {
			console.log("Error in updating organization", err)
			Notify("danger", "Error in updating organization")
			err.response.json().then(json => { Notify("danger", json.message) })
			failureCallback()
		})
}

export function fetchOrganizationAndStateList (payloadObj, successCallback) {
	return POST({
		api: '/Api/orgDetails',
		apiBase: 'retailer',
		data: payloadObj,
		handleError: true
	})
		.then((json) => {
			successCallback(json)
		})
		.catch(err => {
			console.log("Error in fetching organization and state map", err)
			err.response.json().then(json => { Notify("danger", json.message) })
		})

}

export function fetchRetailerList (payloadObj, successCallback, failureCallback) {
	return POST({
		api: '/Api/listRetailers',
		apiBase: 'retailer',
		data: payloadObj,
		handleError: true
	})
		.then((json) => {
			if (successCallback) {
				successCallback(json)
			}
			return json
		})
		.catch(err => {
			console.log("Error in fetching retailer list", err)
			err.response.json().then(json => { Notify("danger", json.message) })
			failureCallback()
		})
}

export function fetchDmoList (payloadObj) {
	return POST({
		api: '/Api/dmo/list',
		apiBase: 'retailer',
		data: payloadObj,
		handleError: true
	})
}

export function fetchDmoSoa (payloadObj) {
	return POST({
		api: '/Api/dmo/retailersoa',
		apiBase: 'retailer',
		data: payloadObj,
		handleError: true
	})
}

export function fetchDmoOrdersList (payloadObj) {
	return POST({
		api: '/Api/transactions/dmo/list',
		apiBase: 'retailer',
		data: payloadObj,
		handleError: true
	})
}

export function createOrUpdateStockPrice (payloadObj, successCallback, failureCallback) {
	return POST({
		api: '/Api/stockandprice/inventory/createorupdate',
		apiBase: 'retailer',
		data: payloadObj,
		handleError: true
	})
		.then((json) => {
			successCallback(json)
			Notify("success", "Successfully created or updated stock")
			setTimeout(() => {
				location.href = `/admin/stock-and-price/list?retailerId=${payloadObj.inventories[0].retailer_id}&outletName=${payloadObj.inventories[0].outlet_name}&stateId=${payloadObj.inventories[0].state_id}&selectedGenreIdx=${payloadObj.inventories[0].genre_id}`
			}, 500)
		})
		.catch(err => {
			console.log("Error in creating/updating stock and price", err)
			err.response.json().then(json => { Notify("danger", json.message) })
			failureCallback()
		})
}

export function fetchAccessLogs (payloadObj) {
	return POST({
		api: `/Api/stockandprice/inventory/accesslog`,
		apiBase: 'retailer',
		data: payloadObj,
		handleError: true
	})
}

export function fetchRetailers (payloadObj) {
	return POST({
		api: `/retailer/fetch`,
		apiBase: 'odin',
		data: payloadObj,
		handleError: true
	})
}

export function updateDeliveryFeeStatus(payloadObj) {
	return POST({
		api: `/retailer/api/1/enable/retailerdeliveryfeeslab`,
		apiBase: 'api',
		data: payloadObj,
		handleError: true
	})
}

export function downLoadAccessLogs (payloadObj) {
	return POST({
		api: `/Api/stockandprice/download/accesslog/report`,
		apiBase: 'retailer',
		data: {
			start_date: payloadObj.start_date,
			end_date: payloadObj.end_date
		},
		handleError: true,
		parseType: "text"
	})
}

export function fetchGenreList (payloadObj, successCallback) {
	return GET({
		api: `/Api/stockandprice/listing/genres/${payloadObj.state_id}`,
		apiBase: 'retailer',
		//data: payloadObj,
		handleError: true
	})
		.then((json) => {
			successCallback(json.genres)
		})
		.catch(err => {
			console.log("Error in fetching genre list", err)
			err.response.json().then(json => { Notify("danger", json.message) })
			//failureCallback()
		})
}

export function fetchRetailerInventory (payloadObj, successCallback, failureCallback) {
	return POST({
		api: '/Api/stockandprice/retailer/brands',
		apiBase: 'retailer',
		data: payloadObj,
		handleError: true
	})
		.then((json) => {
			successCallback(json)
		})
		.catch(err => {
			console.log("Error in fetching retailer inventory list", err)
			//err.response.json().then(json => { Notify("danger", json.message) })
			failureCallback()
		})
}

export function fetchDeviceList (payloadObj, successCallback, failureCallback) {
	return POST({
		api: '/Api/listDevices',
		apiBase: 'retailer',
		data: payloadObj,
		handleError: true
	})
		.then((json) => {
			successCallback(json)
		})
		.catch(err => {
			console.log("Error in fetching device list", err)
			err.response.json().then(json => { Notify("danger", json.message) })
			failureCallback()
		})
}

export function deactivateDevice (payloadObj, successCallback) {
	return POST({
		api: '/Api/changeDeviceStatus',
		apiBase: 'retailer',
		data: payloadObj,
		handleError: true
	})
		.then((json) => {
			successCallback(json)
		})
		.catch(err => {
			console.log("Error in updating device status", err)
			err.response.json().then(json => { Notify("danger", json.message) })
			//failureCallback()
		})
}

export function addDevice (payloadObj, successCallback, failureCallback) {
	return POST({
		api: '/Api/createDevice',
		apiBase: 'retailer',
		data: payloadObj,
		handleError: true
	})
		.then((json) => {
			Notify("success", "Successfully Added Device")
			successCallback(json)
		})
		.catch(err => {
			console.log("Error in adding device", err)
			err.response.json().then(json => { Notify("danger", json.message) })
			failureCallback()
		})
}

export function createRetailer (payloadObj, successCallback, failureCallback) {
	return POST({
		api: '/Api/createRetailer',
		apiBase: 'retailer',
		data: payloadObj,
		handleError: true
	})
		.then((json) => {
			Notify("success", "Successfully created retailer")
			successCallback(json)
		})
		.catch(err => {
			console.log("Error in create retailer", err)
			err.response.json().then(json => { Notify("danger", json.message) })
			failureCallback()
		})
}

export function updateRetailer (payloadObj, successCallback, failureCallback) {
	return POST({
		api: '/Api/updateRetailer',
		apiBase: 'retailer',
		data: payloadObj,
		handleError: true
	})
		.then((json) => {
			Notify("success", "Successfully updated retailer")
			successCallback(json)
		})
		.catch(err => {
			console.log("Error in updating retailer", err)
			Notify("danger", "Error in updating retailer")
			failureCallback()
		})
}

export function deactivateRetailer (payloadObj, callback) {
	return POST({
		api: '/Api/changeRetailerStatus',
		apiBase: 'retailer',
		data: payloadObj,
		handleError: true
	})
		.then((json) => {
			callback()
		})
		.catch(err => {
			console.log("Error in updating retailer status", err)
			Notify("danger", "Error in updating branch status")
			err.response.json().then(json => { Notify("danger", json.message) })
		})
}

export function deactivateDmo (payloadObj, callback) {
	return POST({
		api: '/Api/dmo/blockunblock',
		apiBase: 'retailer',
		data: payloadObj,
		handleError: true
	})
}

/** Notes Endpoints */
export function fetchRetailerNotes (req) {
	return POST({
		api: `/Api/listNotes`,
		apiBase: "retailer",
		data: req
	})
		.then(json => json)
}

export function createRetailerNote (req) {
	return POST({
		api: "/Api/createNote",
		apiBase: "retailer",
		data: req
	})
		.then(json => json)
}

export function fetchNoteIssues () {
	return POST({
		api: "/Api/listIssues",
		apiBase: "retailer"
	})
		.then(json => json)
}

export function fetchRetailerSOA (req) {
	return POST({
		api: "/Api/soa",
		apiBase: "retailer",
		data: req
	})
		.then(json => json)
}

export function fetchCreditDebitRetailers (req) {
	return POST({
		api: "/Api/listManualCreditDebit",
		apiBase: "retailer",
		data: req
	})
		.then(json => json)
}

export function fetchDmoCreditDebitRetailers (req) {
	return POST({
		api: "/Api/listDMOManualCreditDebit",
		apiBase: "retailer",
		data: req
	})
		.then(json => json)
}

export function fetchAccountManagers (payload) {
	return POST({
		api: "/Api/listAccountManager",
		apiBase: "retailer",
		data: payload
	})
}


export function createAccountManager (payload) {
	return POST({
		api: "/Api/addAccountManager",
		apiBase: "retailer",
		data: payload
	})
}

export function updateAccountManager (payload) {
	return POST({
		api: "/Api/editAccountManager",
		apiBase: "retailer",
		data: payload
	})
}

export function fetchTransactionCode (req) {
	return POST({
		api: "/Api/listTransactionCode",
		apiBase: "retailer",
		data: req
	})
		.then(json => json)
}

export function fetchDmoTransactionCode (req) {
	return POST({
		api: "/Api/listDMOTransactionCode",
		apiBase: "retailer",
		data: req
	})
		.then(json => json)
}

export function insertManualCreditDebit (req) {
	return POST({
		api: "/Api/insertManualCreditDebit",
		apiBase: "retailer",
		data: req
	})
		.then(json => json)
}

export function insertDmoManualCreditDebit (req) {
	return POST({
		api: "/Api/insertDMOManualCreditDebit",
		apiBase: "retailer",
		data: req
	})
		.then(json => json)
}

export function createDMO (payload) {
	return POST({
		api: "/Api/dmo/create",
		apiBase: "retailer",
		data: payload
	})
}

export function updateDMO (payload) {
	return POST({
		api: "/Api/dmo/edit",
		apiBase: "retailer",
		data: payload
	})
}

export function createDeliveryFee (payload) {
	return POST({
		api: "/retailer/api/1/create/retailerdeliveryfeeslab",
		apiBase: "api",
		data: payload
	})
}

export function updateDeliveryFee (payload) {
	return POST({
		api: "/retailer/api/1/update/retailerdeliveryfeeslab",
		apiBase: "api",
		data: payload
	})
}

export function listDeliveryFee (payload) {
	return POST({
		api: "/retailer/api/1/list/retailerdeliveryfeeslab",
		apiBase: "api",
		data: payload
	})
}
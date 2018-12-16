import { POST } from 'Utils/fetch'
import Notify from 'Components/notify'

export function fetchOrganizationList (payloadObj, successCallback, failureCallback) {
        return POST({
            api: '/Api/listOrganisations',
            apiBase: 'retailerMgmt',
            data: payloadObj,
            handleError: true
        })
        .then((json) => {
            //this.setState({
            //       data: json.data,
            //       count: json.count,
            //       loading: false
            //     })
            //Notify("success", "Successfully created organization")
            successCallback(json)
        })
        .catch(err => {
            err.response.json().then(json => { Notify("danger", json.error) })
            failureCallback()
        })
     
}

export function fetchStateAndCityList(payloadObj, successCallback) {
    return POST({
        api: '/Api/listStates',
        apiBase: 'retailerMgmt',
        data: payloadObj,
        handleError: true
    })
    .then((response) => {
        //this.setState({
        //       data: json.data,
        //       count: json.count,
        //       loading: false
        //     })
        //Notify("success", "Successfully created organization")
        //console.log("json states", response)
        successCallback(response)
    })
    .catch(err => {
        console.log("error", err)
        err.response.json().then(json => { Notify("danger", json.message) })
    })
 
}

export function createOrganization(payloadObj, successCallback, failureCallback) {
    console.log("api create org")
    return POST({
        api: '/Api/createOrganisation',
        apiBase: 'retailerMgmt',
        data: payloadObj,
        handleError: true
    })
    .then((json) => {
        //this.setState({
        //       data: json.data,
        //       count: json.count,
        //       loading: false
        //     })
        Notify("success", "Successfully created organization")
        successCallback()
    })
    .catch(err => {
        err.response.json().then(json => { Notify("danger", json.message) })
        failureCallback()
    })
}

export function updateOrganization(payloadObj, successCallback, failureCallback) {
    return POST({
        api: '/Api/updateOrganisation',
        apiBase: 'retailerMgmt',
        data: payloadObj,
        handleError: true
    })
    .then((json) => {
        //this.setState({
        //       data: json.data,
        //       count: json.count,
        //       loading: false
        //     })
        Notify("success", "Successfully updated organization")
        successCallback(json)
    })
    .catch(err => {
        err.response.json().then(json => { Notify("danger", json.message) })
        failureCallback()
    })
}

export function fetchOrganizationAndStateList (payloadObj, successCallback) {
    return POST({
        api: '/Api/orgDetails',
        apiBase: 'retailerMgmt',
        data: payloadObj,
        handleError: true
    })
    .then((json) => {
        //this.setState({
        //       data: json.data,
        //       count: json.count,
        //       loading: false
        //     })
        //Notify("success", "Successfully created organization")
        successCallback(json)
    })
    .catch(err => {
        err.response.json().then(json => { Notify("danger", json.message) })
    })
 
}

export function fetchRetailerList (payloadObj, successCallback, failureCallback) {
    return POST({
        api: '/Api/listRetailers',
        apiBase: 'retailerMgmt',
        data: payloadObj,
        handleError: true
    })
    .then((json) => {
        //this.setState({
        //       data: json.data,
        //       count: json.count,
        //       loading: false
        //     })
        //Notify("success", "Successfully created organization")
        successCallback(json)
    })
    .catch(err => {
        console.log("err", err)
        err.response.json().then(json => { Notify("danger", json.message) })
        failureCallback()
    })

    // if (response.status !== 200) {
 
}

export function createRetailer(payloadObj, successCallback, failureCallback) {
    console.log("id", payloadObj)
    return POST({
        api: '/Api/createRetailer',
        apiBase: 'retailerMgmt',
        data: payloadObj,
        handleError: true
    })
    .then((json) => {
        //this.setState({
        //       data: json.data,
        //       count: json.count,
        //       loading: false
        //     })
        Notify("success", "Successfully created retailer")
        successCallback(json)
    })
    .catch(err => {
        err.response.json().then(json => { Notify("danger", json.message) })
        console.log("err in update retailer", err)
        failureCallback()
    })
}

export function updateRetailer(payloadObj, successCallback, failureCallback) {
    return POST({
        api: '/Api/updateRetailer',
        apiBase: 'retailerMgmt',
        data: payloadObj,
        handleError: true
    })
    .then((json) => {
        //this.setState({
        //       data: json.data,
        //       count: json.count,
        //       loading: false
        //     })
        Notify("success", "Successfully updated retailer")
        successCallback(json)
    })
    .catch(err => {
        err.response.json().then(json => { Notify("danger", json.message) })
        failureCallback()
    })
}

export function deactivateRetailer(payloadObj, callback) {
    console.log("payload", payloadObj)
    return POST({
        api: '/Api/changeRetailerStatus',
        apiBase: 'retailerMgmt',
        data: payloadObj,
        handleError: true
    })
    .then((json) => {
       callback()
    })
    .catch(err => {
        err.response.json().then(json => { Notify("danger", json.message) })
        //failureCallback()
    })
}
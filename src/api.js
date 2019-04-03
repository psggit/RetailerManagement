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
            successCallback(json)
        })
        .catch(err => {
            console.log("Error in fetching organisation list", err)
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
        successCallback(response)
    })
    .catch(err => {
        console.log("Error in fetching state and city map", err)
        err.response.json().then(json => { Notify("danger", json.message) })
    })
 
}

export function createOrganization(payloadObj, successCallback, failureCallback) {
    //console.log("api create org")
    return POST({
        api: '/Api/createOrganisation',
        apiBase: 'retailerMgmt',
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

export function updateOrganization(payloadObj, successCallback, failureCallback) {
    return POST({
        api: '/Api/updateOrganisation',
        apiBase: 'retailerMgmt',
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
        apiBase: 'retailerMgmt',
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
        apiBase: 'retailerMgmt',
        data: payloadObj,
        handleError: true
    })
    .then((json) => {
        successCallback(json)
    })
    .catch(err => {
        console.log("Error in fetchRetailer", err)
        err.response.json().then(json => { Notify("danger", json.message) })
        failureCallback()
    })
}

export function fetchDeviceList (payloadObj, successCallback, failureCallback) {
    return POST({
        api: '/Api/listDevices',
        apiBase: 'retailerMgmt',
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
        api: '/Api/listDevices',
        apiBase: 'retailerMgmt',
        data: payloadObj,
        handleError: true
    })
    .then((json) => {
        successCallback(json)
    })
    .catch(err => {
        console.log("Error in fetching device list", err)
        err.response.json().then(json => { Notify("danger", json.message) })
        //failureCallback()
    })
}

export function createRetailer(payloadObj, successCallback, failureCallback) {
    return POST({
        api: '/Api/createRetailer',
        apiBase: 'retailerMgmt',
        data: payloadObj,
        handleError: true
    })
    .then((json) => {
        Notify("success", "Successfully created retailer")
        successCallback(json)
    })
    .catch(err => {
        console.log("Error in create retailer", err)
        Notify("danger", "Error in creating retailer")
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
        Notify("success", "Successfully updated retailer")
        successCallback(json)
    })
    .catch(err => {
        console.log("Error in updating retailer", err)
        Notify("danger", "Error in updating retailer")
        failureCallback()
    })
}

export function deactivateRetailer(payloadObj, callback) {
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
        console.log("Error in updating retailer status", err)
        Notify("danger", "Error in updating branch status")
        err.response.json().then(json => { Notify("danger", json.message) })
    })
}
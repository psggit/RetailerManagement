import { POST } from 'Utils/fetch'
import Notify from 'Components/notify'

export function fetchOrganizationList (payloadObj, successCallback) {
        return POST({
            api: '/deliveryStatus/liveOrders',
            apiBase: 'gremlinUrl',
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

export function fetchStateAndCityList(payloadObj, successCallback) {
    return POST({
        api: '/deliveryStatus/liveOrders',
        apiBase: 'gremlinUrl',
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

export function updateOrganization(payloadObj, successCallback) {
    return POST({
        api: '/deliveryStatus/liveOrders',
        apiBase: 'gremlinUrl',
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
        api: '/deliveryStatus/liveOrders',
        apiBase: 'gremlinUrl',
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

export function fetchRetailerList (payloadObj, successCallback) {
    return POST({
        api: '/deliveryStatus/liveOrders',
        apiBase: 'gremlinUrl',
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

export function createRetailer(payloadObj, successCallback) {
    return POST({
        api: '/deliveryStatus/liveOrders',
        apiBase: 'gremlinUrl',
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
        failureCallback()
    })
}

export function updateRetailer(payloadObj, successCallback) {
    return POST({
        api: '/deliveryStatus/liveOrders',
        apiBase: 'gremlinUrl',
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
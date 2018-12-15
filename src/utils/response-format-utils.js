export function formatStateAndCityList(data) {
    const list = data
    let cityList = [], stateList = [], stateMap = {}
    let index = 0;
    for(const i in list) {
        //state list
        let state = {}
        state.text = list[i].state_name
        state.value = list[i].state_id
        stateList[i] = state

        //city list
        for(const j in list[i].cities) {  
            let city = {}
            city.text = (list[i].cities[j].city_name)
            city.value = (list[i].cities[j].city_id)
            cityList[index] = city
            index = index + 1
        }
    }

    //Maps state to city
    for(const i in list) { 
        let cityList = []
        for(const j in list[i].cities) {
            let cityDetail = {}
            cityDetail.text = (list[i].cities[j].city_name)
            cityDetail.value = (list[i].cities[j].city_id)
            cityList[j] = cityDetail
        }
        stateMap[list[i].state_id] =  cityList
    }
    return {stateList, cityList, stateMap}
}

export function formatStateAndOrganizationList(data) {
    let organizationList = [], organizationMap = {}
    for(const i in data) {
        let organization={}
        // state.text = data[i].state_name
        // state.value = data[i].state_id

        //organization list
        organization.text = data[(i)].organisation_name,
        organization.value = data[(i)].org_id
        organizationList[i] = organization
        // stateList[i] = state

        //maps organization to state
        organizationMap[data[(i)].org_id] = {
            state_name: data[i].state_name,
            state_id: data[i].state_id
        }
    }

    return {organizationList, organizationMap}
}
//import {stateAndCityList} from './../mockData'

export function formatStateAndCityList(data) {
    const list = data
    let cityList = [], stateList = []
    //const {list, stateList, cityList} = this.state
    let index = 0;
    for(const i in list) {
        let state = {}
        state.text = list[i].state_name
        state.value = i
        stateList[i] = state

        for(const j in list[i].cities) {  
            let city = {}
            city.text = (list[i].cities[j].city_name)
            city.value = (list[i].cities[j].city_id)
            cityList[index] = city
            index = index + 1
        } 
    }
    console.log("state list", stateList, "city list", cityList)
    return {stateList, cityList}
}
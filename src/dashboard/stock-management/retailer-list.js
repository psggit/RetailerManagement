import React from "react"

class RetailerList extends React.Component {

  constructor () {
    super()

    this.listRetailerInventory = this.listRetailerInventory.bind(this)
  }

  renderOutlet (item) {
    return (
      <div className="retailer" onClick={() => this.listRetailerInventory(item)}>
        <div className="details">
          <p>{item.id}</p>
          <p>{item.outlet_name}</p>
        </div>
      </div>
    )
  }

  listRetailerInventory (item) {
    this.props.history.push(`/admin/stock-and-price/list?retailerId=${item.id}&outletName=${item.outlet_name}&stateId=${item.state_id}`, item)
  }

  render () {
    const {
      retailerData, 
      isCitySelected,
      loadingRetailerData,
      fetchingRetailers
    } = this.props
    return (
      <div className="retailer-list">
        {
          retailerData.length > 0 &&
          <div className="header">
            <h2>Retailer List</h2>
          </div>
        }
        {
          retailerData.length > 0 && retailerData.map((item) => (
            this.renderOutlet(item)
          ))
        }
        {
          isCitySelected && fetchingRetailers &&
          <p className="note">Loading Retailers ...</p>
        }
        {
          isCitySelected && !loadingRetailerData && retailerData.length === 0 &&
          <p className="note">No retailers found</p>
        }
        {
          !isCitySelected &&
          <p className="note">Please select city to list retailer</p>
        }
      </div>
    )
  }
}

export default RetailerList
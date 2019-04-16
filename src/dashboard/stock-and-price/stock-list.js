import React from "react"
import { Table } from '@auth0/cosmos'
import Pagination from 'Components/pagination'
import { Spinner } from '@auth0/cosmos'
import CustomButton from 'Components/button'

class StockList extends React.Component {
  constructor() {
    super()

    this.state = {
      stockList: [],
      stockMap: {},
      buttonLabel: "Edit",
      enableEdit: false
    }
    this.enableEdit = this.enableEdit.bind(this)
    this.handleCheckboxes = this.handleCheckboxes.bind(this)
    this.handlePriceChange = this.handlePriceChange.bind(this)
  }

  componentDidMount() {
    this.setState({
      stockList: this.props.stockData,
      stockMap: this.props.stockMap
    })
  }

  componentWillReceiveProps(newProps) {
    if(!newProps.isSavingDetails) {
      this.setState({enableEdit: false, buttonLabel: "Edit"})
    } else {
      this.setState({buttonLabel: "Save"})
    }
  }

  enableEdit() {
    this.setState({
      buttonLabel: "Save",
      enableEdit: true
    })
    if(this.state.enableEdit) {
      const selectedStockList = this.state.stockList.filter((item) => {
        if(item.is_modified) {
          return  item
        }
      })
      this.props.createOrUpdateStockAndPrice(selectedStockList)
    }
  }

  handleCheckboxes(e, skuPricingId) {
    let updatedMap = Object.assign({}, this.state.stockMap)
    updatedMap[skuPricingId].is_modified = (e.target.checked)
    this.setState({ stockMap: updatedMap, stockList: Object.values(updatedMap) })
  }

  handlePriceChange(e, skuPricingId) {
    e.stopPropagation()
    let updatedMap = Object.assign({}, this.state.stockMap)
    updatedMap[skuPricingId].price = parseInt(e.target.value)
    this.setState({stockMap: updatedMap, stockList: Object.values(updatedMap)})
  }

  render() {
    console.log("props", this.props, this.state)
    return (
      <React.Fragment>
      {
        Object.keys(this.state.stockList).length > 0 &&
        <div 
          style={{
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginTop: '40px'
          }}
        >
          <h4 style={{fontSize: '18px', fontWeight: '600'}}>Sku List</h4>
          <CustomButton 
            text={this.state.buttonLabel} 
            handleClick={this.enableEdit} 
            disabled={this.props.isSavingDetails}
          />
        </div>
      }
      {
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <Table
            emptyMessage={this.props.loadingStockList ? <Spinner /> : 'No stock found'}
            items={this.state.stockList}
            //onRowClick={(e, item) => this.handleRowClick(e, item)}
          >
            <Table.Column field="actions">
							{item => (
								// <input style={{width: '30px'}} onClick={this.handleInputEdit} />
                <input 
                  type="checkbox"
                  onChange={(e) => this.handleCheckboxes(e, item.sku_pricing_id)}
                  checked={this.state.stockMap[item.sku_pricing_id].is_modified}
                  name="isModified"
                  disabled={!this.state.enableEdit}
                />
							)}
						</Table.Column>
            <Table.Column field="sku_id" title="Sku Id" />
            <Table.Column field="sku_pricing_id" title="Sku Pricing Id" />
            <Table.Column field="actions" title="Price">
							{item => (
                <input 
                  style = {{ width: '60px', padding: '0 10px'}}
                  onChange={(e) => this.handlePriceChange(e, item.sku_pricing_id)} 
                  disabled={!this.state.stockMap[item.sku_pricing_id].is_modified}
                  type="number"
                  value={this.state.stockMap[(item.sku_pricing_id)].price} 
                />
							)}
						</Table.Column>
          </Table>
        </div>
      }
      </React.Fragment>
    )
  }
} 

export default StockList
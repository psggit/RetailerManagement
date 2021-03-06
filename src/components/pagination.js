import React from 'react'
//import ReactPagination from 'react-js-pagination'
import { PaginationToolbar } from '@auth0/cosmos'

class PaginationBar extends React.Component {
  constructor (props) {
    super(props)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.resetPagination = this.resetPagination.bind(this)
  }

  resetPagination () {
    this.props.setPage({
      activePage: 1,
      offset: 0
    })
  }

  handlePageChange (page) {
    const offset = this.props.itemsCountPerPage * (page - 1)
    this.props.setPage({
      activePage: page,
      offset
    })
  }

  render () {
    //console.log("pag props", this.props)
    return (
      <PaginationToolbar
          page={this.props.activePage} 
          perPage={this.props.itemsCountPerPage} 
          items={this.props.totalItemsCount ? this.props.totalItemsCount : 0} 
          onPageChanged={this.handlePageChange.bind(this)}
      />
    )
  }
}

export default PaginationBar

import React from 'react'
import Icon from "Components/icon"

class AccordianItem extends React.Component {
  render() {
    return (
      <div className={`accordian-item ${this.props.activeAccordian === this.props.id ? 'active' : '' }`}>
        <div id={this.props.id} onClick={this.props.handleClick} className="accordian-item__header">
          {
            this.props.showRadioButton ?
            this.props.activeAccordian === this.props.id 
              ? <span style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '10px', pointerEvents: "none" }}><Icon name="filledCircle" /></span> 
              : <span style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '10px', pointerEvents: "none"}}><Icon name="circle" /></span>
            : ''
          }
          <p className="os s7" style={{ display: 'inline-block'}}>{ this.props.title }</p>
          {
            this.props.icon &&
            <span style={{ pointerEvents: "none" }} className="icon">{this.props.icon}</span>
          }
        </div>
        <div className="accordian-item__body">
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default AccordianItem

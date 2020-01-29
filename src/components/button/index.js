import React from 'react'
import { Button } from '@auth0/cosmos'

class Button2 extends React.Component {
    constructor () {
        super()
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick (e) {
        if(this.props.handleClick){
            this.props.handleClick(e)
        }
    }

    render () {
        return (
            <Button 
                style={{border: '1px solid #757575', marginTop: "20px"}} 
                onClick={(e) => this.handleClick(e)}
                disabled={this.props.disableSave ? this.props.disableSave : false}
            >
                {this.props.text}
            </Button>
        )
    }
}

export default Button2
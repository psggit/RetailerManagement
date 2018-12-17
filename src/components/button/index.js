import React from 'react'
import { Button } from '@auth0/cosmos'

class Button2 extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <Button style={{border: '1px solid #757575'}} onClick={(e) => this.props.handleClick(e)}>{this.props.text}</Button>
        )
    }
}

export default Button2
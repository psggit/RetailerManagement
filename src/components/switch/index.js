import React from 'react'
import { Switch } from '@auth0/cosmos'

class Switch2 extends React.Component {

    constructor () {
        super()
        this.onToggle = this.onToggle.bind(this)
    }

    onToggle (toggleStatus) {
        this.props.onToggle(this.props.value, toggleStatus)
    }

    render () {
        return (
            <div>
                <Switch on={this.props.on} accessibleLabels={this.props.accessibleLabels} onToggle={this.onToggle}/>
            </div>
        )
    }
}

export default Switch2
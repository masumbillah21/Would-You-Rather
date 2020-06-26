import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Logout extends PureComponent {
    componentDidMount(){
        this.props.dispatch(setAuthedUser(null))
    }
    
    render() {
        return <Redirect to='/' />
    }
}

export default connect()(Logout);
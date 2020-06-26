import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRouter = ({ component: Component, ...rest }) => {
    const auth = !!rest.authedUser
    return(
        <Route 
            {...rest}
            render={props => auth 
                ? ( <Component { ...props } /> )
                : 
                (<Redirect 
                    to={{pathname: '/login/',
                    state: {from: props.location.pathname},
                    }}/>)
    }
        />
    )
    
}

const mapStateToPorps = ({authedUser}) => ({
    authedUser
})

export default connect(mapStateToPorps)(PrivateRouter)
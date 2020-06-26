import React, {PureComponent, Fragment} from 'react';
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class Nav extends PureComponent{
    
    render(){
        const { users, authedUser } = this.props
        return(            
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <NavLink className="navbar-brand" to="/">
                        <img 
                            src="/assets/logo.png" 
                            alt="Would you rather"
                            style={{width: 300 + 'px'}} />
                    </NavLink>
                    {authedUser ? 
                    <Fragment>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav navbar-center">
                            <li className="nav-item">
                                    <NavLink className="nav-link" to="/not-aswered">Unanswered</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/answered">Answered</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/add">Add</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/leader-board">LeaderBoard</NavLink>
                                </li>
                                
                            </ul>
                            <NavLink
                                style={{color: '#ffffff', weight: 800, fontSize: 18 + 'px'}}
                                className="ml-auto" to="/logout"> 
                                    <img style={{width: 30 + 'px', marginRight: 5 + 'px'}} src={users[authedUser].avatarURL} alt={users[authedUser].name}/>
                                    {
                                        users[authedUser].name
                                    }
                                    <img 
                                        style={{width: 25 + 'px', marginLeft: 5 + 'px'}}
                                        src="/assets/logout.png" alt={users[authedUser].name}/>
                            </NavLink>
                        </div>
                    </Fragment>
                    :
                    <NavLink 
                        style={{color: '#ffffff', weight: 800, fontSize: 18 + 'px'}}
                        className="ml-auto" to="/login">Login</NavLink>
                    }
                </div>
            </nav>
        )
    }
}

function mapStateToProps({ users, authedUser}){
    return {
        users,
        authedUser
    }
}

export default withRouter(connect(mapStateToProps)(Nav))
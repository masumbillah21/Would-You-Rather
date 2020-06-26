import React, { PureComponent } from 'react';
import { setAuthedUser } from '../actions/authedUser'
import {connect} from 'react-redux'
import { PropTypes } from 'prop-types'
import { withRouter } from 'react-router-dom'

class Login extends PureComponent {
    static propTypes = {
        users: PropTypes.object.isRequired,
        auth: PropTypes.func.isRequired
    }
    state = {
        userId: ''
    }

    handleChange = (e) => {
        this.setState({
            userId: e.target.value
        })        
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { userId } = this.state
        const { auth, location, history } = this.props
        if(userId){
            auth(userId)
        }
        const prePath  = location !== undefined && location.state !== undefined
        ? location.state.from
        : '/not-aswered'

        history.push(prePath)
    }
    render() {
        const { users } = this.props;
        const { userId } = this.state

        return (
            <div className="container">
                <div className="row justify-content-center mt-3">
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-header">
                                <h4>User Login</h4>					
                            </div>                                                          
                            <form onSubmit={this.handleSubmit}>
                                <div className="card-body">  
                                    <img className="mx-auto my-2 d-block"
                                        src={userId ? users[userId].avatarURL : '/assets/placeholder.png'} 
                                        alt={userId ? users[userId].name : 'would you rather'}
                                        style={{width: 200}} />

                                    <div className="form-group">                                        
                                        <select id="user" className="form-control" value={userId}
                                            onChange={this.handleChange}>
                                            <option value="" disabled>Select a user</option>
                                            {
                                                Object.keys(users).map(user =>
                                                <option key={user} value={user}>
                                                    {users[user].name}
                                                </option>)
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-block btn-primary">Login</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps ({ users }) {
    return {
      users
    }
}

function authentication(dispatch) {
    return {
      auth: (id) => {
        dispatch(setAuthedUser(id))
      }
    }
  }

export default withRouter(connect(mapStateToProps, authentication)(Login))
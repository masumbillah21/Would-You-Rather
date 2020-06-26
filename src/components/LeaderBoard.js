import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class LeaderBoard extends Component {
    render() {
        const { users, authedUser } = this.props
        if(!authedUser){
            return <Redirect to='/' />
        }
        return (
            <div className="container">
                <div className="row">
                    {Object.keys(users).map( user => (
                        <div className="col-lg-4 mt-5" key={user}>
                            <div className="card mb-4">
                                <div className="card-header">                                    
                                    <h4>{users[user].name} <span className="score">
                                        {
                                            Object.keys(users[user].answers).length + users[user].questions.length
                                        }
                                        </span>
                                    </h4>
                                    <img 
                                        style={{marginTop: 20, width: 300 }}
                                        src={users[user].avatarURL} 
                                        alt={users[user].name} />
                                    
                                </div>     
                                <div className="card-body">
                                    <p className="qestion">Question: <span className="float-right">{users[user].questions.length}</span></p>
                                    <hr/>
                                    <p className="answer">Answerd: <span className="float-right">{Object.keys(users[user].answers).length}</span></p>
                                    
                                </div> 
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div>
        );
    }
}

function mapStateToProps({ users, authedUser }){
    const uScore = user => Object.keys(user.answers).length + user.questions.length    
    return {
        users: Object.values(users).sort((a, b) => uScore(b) - uScore(a)),
        authedUser
    }
}

export default connect(mapStateToProps)(LeaderBoard);
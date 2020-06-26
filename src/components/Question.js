import React, { Component } from 'react';
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { withRouter } from 'react-router-dom'

class Question extends Component {
    static propTypes = {
        question: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    handleClick = (quesiotnId) => {
        let path = `/questions/${quesiotnId}`
        this.props.history.push(path)
    }
    render() {
        const { question, authedUser, users } = this.props
        const isAnswer = users[authedUser].answers.hasOwnProperty(question.id)
        
        return (
            <div className="card mb-3">	
                <div className="card-header">
                    
                    <img className="mx-auto d-block"
                        src={users[question.author].avatarURL} alt={users[question.author].name} />
                    <h4 className="text-center">{users[question.author].name}</h4>
                </div>			
                <div className="card-body">                    
                    <div className="question-wrap">
                        <h4>Would you rather</h4>
                        <hr/>
                        <p className="option">{ question.optionOne.text }</p>
                        <div className="separtor"><span>OR</span></div>
                        <p className="option">{ question.optionTwo.text }</p>
                    </div>
                </div>
                <div className="card-footer"><button 
                    className="btn btn-primary float-right" 
                    onClick={() => this.handleClick(question.id)}>
                        {isAnswer ? 'View' : 'Answer' }
                    </button>
                </div>
            </div>
        );
    }
}

function mapStateToProps( state, { id }){    
    const authedUser = state.authedUser
    const users = state.users
    const question = state.questions[id]
    return{
        authedUser,
        users,
        question
    }
}

export default withRouter(connect(mapStateToProps)(Question));
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Question from './Question' 
import { Redirect } from 'react-router-dom'


class NotAnswered extends Component {
    state = {  }
    static propTypes = {
        notAnswered: PropTypes.array
    }
    render() {
        const { notAnswered, authedUser } = this.props
        if(!authedUser){
            return <Redirect to='/' />
        }
        return (
            <div className="container">
                <div className="row mt-5">
                    {notAnswered.map( qid => 
                        <div key={qid} className="col-lg-4">
                            <Question id={qid} />
                        </div>
                        )}
                </div>
            </div>
        );
    }
}
function mapStateToProps ({ users, questions, authedUser}) {  
  
    let notAnswered = []
    
    if(authedUser){
        const answered = Object.keys(users[authedUser].answers)
    		.sort((a, b) => questions[b].timestamp - questions[a].timestamp)
        
        notAnswered = Object.keys(questions).filter(qid => !answered.includes(qid))
        .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    }
    return {
        notAnswered,
        authedUser  
    }
}
export default connect(mapStateToProps)(NotAnswered);
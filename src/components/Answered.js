import React, { Component } from 'react';
import { connect } from 'react-redux'
import { array } from 'prop-types'
import Question from './Question'
import { Redirect } from 'react-router-dom'

class Answered extends Component {

    static propTypes = {
        answered: array
    }
    render() {
        const { answered, authedUser } = this.props
        if(!authedUser){
            return <Redirect to='/' />
        }
        return (
            <div className="container">
                <div className="row mt-5">
                    {answered.map( qid => 
                        <div className="col-lg-4" key={qid}>
                            <Question id={qid} />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
function mapStateToProps ({ users, questions, authedUser}) {
    let answered = [] 
    if(authedUser){
        answered = Object.keys(users[authedUser].answers)
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    }
    return {
        answered,
        authedUser
    }
}
export default connect(mapStateToProps)(Answered);
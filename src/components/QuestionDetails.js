import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { handleAnswer } from '../actions/shared'
import NotFound from './NotFound';

class QuestionDetails extends PureComponent {
    
    state = {
        option: ''
    }

    optionChangeHandle = (e) => {
        this.setState({
            option: e.target.value
        })
    }
    

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.saveQuestionAnswer(this.state.option)
    }
    render() {
        
        const { question, answer, users, history, authedUser } = this.props
        const { option } = this.state

        if(!question){ return <NotFound/> } 

        const totalQuestions = question.optionOne.votes.length + question.optionTwo.votes.length
        const optionOneGot = question.optionOne.votes.length
        const optionTwoGot  = question.optionTwo.votes.length
        const scoreOne = Number.parseFloat(( optionOneGot / totalQuestions) * 100).toFixed(2)
        const scoreTwo  = Number.parseFloat((optionTwoGot / totalQuestions) * 100).toFixed(2)

        const optionOneSelected = question.optionOne.votes.includes(authedUser)
        const optionTwoSelected = question.optionTwo.votes.includes(authedUser)
           
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 my-5">
                        <div className="card">
                            <div className="card-header">                                
                                <img className="mx-auto d-block"
                                    style={{marginTop: 20 + 'px', width: 200 + 'px'}}
                                    src={users[question.author].avatarURL} alt={users[question.author].name}/>     
                                <h2 className="text-center">{users[question.author].name}</h2>                      
                            </div>
                            <div className="card-body">
                                <h4>Would you rather?</h4>
                                <hr/>                                
                                {answer ?
                                <div className="answer">                                    
                                    <div className="progress">
                                        <div className="progress-bar" 
                                            style={{width: scoreOne + '%', backgroundColor: scoreOne > scoreTwo ? 'green' : 'goldenrod'}}
                                            role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>                                    
                                    <p className={optionOneSelected ? 'answered' : ''}>{question.optionOne.text} <span className="float-right"> {optionOneGot === 1 ? 'Vote' : 'Votes'} - {optionOneGot} ({scoreOne}%)</span></p>
                                    
                                    <div className="progress">
                                        <div className="progress-bar " 
                                            style={{width: scoreTwo + '%', backgroundColor: scoreOne < scoreTwo ? 'green' : 'goldenrod'}}
                                            role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>                                    
                                    <p className={optionTwoSelected ? 'answered' : ''}>{question.optionTwo.text} <span className="float-right">{optionTwoGot === 1 ? 'Vote' : 'Votes'} - {optionTwoGot} ({scoreTwo}%)</span></p>
                                    <h5>Total votes: {totalQuestions}</h5>
                                </div>
                                :
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-check form-group">
                                        <input className="form-check-input" 
                                        type="radio" 
                                        name="option" 
                                        id="option-one" 
                                        value="optionOne"
                                        onChange={this.optionChangeHandle}/>

                                        <label className="form-check-label" htmlFor="option-one">
                                            {question.optionOne.text}
                                        </label>
                                    </div>
                                    <div className="form-check form-group">
                                        <input className="form-check-input" 
                                        type="radio" 
                                        name="option" 
                                        id="option-two" 
                                        value="optionTwo"
                                        onChange={this.optionChangeHandle}/>

                                        <label className="form-check-label" htmlFor="option-two">
                                            {question.optionTwo.text}
                                        </label>
                                    </div>
                                    <hr/>
                                    <button type="submit" className="btn btn-primary btn-block" disabled={option === ''}>Submit</button>
                                </form>}
                            </div>
                            {answer ? 
                            <div className="card-footer">
                                <button className="btn btn-danger float-right"
                                    onClick={() => history.push('/')}>
                                    Back
                                </button>
                            </div>
                            :
                            ''

                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ questions, users, authedUser}, props){

    let answer = ''
    const question = questions[props.match.params.id]

    if(question){
        const answers = users[authedUser].answers
        answer = answers.hasOwnProperty(question.id) ? answers[question.id] : ''
    }

    return{
        users,
        question,
        answer,
        authedUser   
    }
}

function dispatchToProps(dispatch, props){
    const { id } = props.match.params
    return{
        saveQuestionAnswer: (answer) => {
            dispatch(handleAnswer(id, answer))
        }
    }
}

export default connect(mapStateToProps, dispatchToProps)(QuestionDetails)
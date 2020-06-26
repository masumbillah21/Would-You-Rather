import { getInitialData } from '../utils/api'
import { addQuestion, saveQuestionAns, receiveQuestion } from './questions'
import { receiveUser, addUserToQuestion, userQestionAns } from './users'
import { _saveQuestion,  _saveQuestionAnswer } from '../utils/_DATA'


export function handleInitialData () {
    return (dispatch) => {
        
        return getInitialData()
        .then(({ users, questions }) => {
            dispatch(receiveUser(users))
            dispatch(receiveQuestion(questions))  
        })
    }
}

export function handleAddingQuestion (optionOneText, optionTwoText){
    return (dispatch, getState) => {
        const { authedUser } = getState()
        return _saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser
        })
        .then((question) => {
            dispatch(addQuestion(question))
            dispatch(addUserToQuestion(authedUser, question.id))
        })
    }
}

export function handleAnswer (qid, option){
    return (dispatch, getState) => {
        const { authedUser } = getState()
        const details = {
            authedUser,
            qid,
            answer: option
        }

        _saveQuestionAnswer(details)
        .then(()=>{
            dispatch(saveQuestionAns(authedUser, qid, option))
            dispatch(userQestionAns(authedUser, qid, option))
        })
    }
}
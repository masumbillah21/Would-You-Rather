import {ADD_QUESTION, SAVE_QUESTION_ANS, RECEIVE_QUESTION} from '../actions/questions'

export default function questions (state = {}, action){
    
    switch(action.type){
        case ADD_QUESTION:
            const { question } = action
            return {
                ...state,
                [question.id]: question
            }
        case SAVE_QUESTION_ANS:
            const { authedUser, qid, answer} = action
            return {
                ...state,
                [qid]:{
                    ...state[qid],
                    [answer]: {
                        ...state[qid][answer],
                        votes: state[qid][answer].votes.concat([authedUser])
                    }
                }
            }
        case RECEIVE_QUESTION:
            return{
                ...state,
                ...action.questions
            }
        default:
            return state
    }
}
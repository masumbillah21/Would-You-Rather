import { RECEIVE_USERS, ADD_USER_TO_QUESTION, USER_QUESTION_ANS} from '../actions/users'

export default function users(state = {}, action){
    switch(action.type){
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case ADD_USER_TO_QUESTION:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    questions: state[action.authedUser].questions.concat([action.questionId])
                }
            } 
            
        case USER_QUESTION_ANS:
            return {
                ...state,
                [action.auth]:{
                    ...state[action.auth],
                    answers: {
                        ...state[action.auth].answers,
                        [action.qid]: action.option
                    }
                    
                }
            }
        default:
            return state
    }
}
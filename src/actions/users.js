export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_USER_TO_QUESTION = 'ADD_USER_TO_QUESTION'
export const USER_QUESTION_ANS = 'USER_QUESTION_ANS'

export function receiveUser(users){
    return{
        type: RECEIVE_USERS,
        users
    }
}


export function addUserToQuestion(authedUser, qid) {
    return {
        type: ADD_USER_TO_QUESTION,
        authedUser,
        qid
    }
}

export function userQestionAns(auth, qid, option){
    return{
        type: USER_QUESTION_ANS,
        auth,
        qid,
        option
    }
}
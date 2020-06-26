export const ADD_QUESTION = 'ADD_QUESTION'
export const SAVE_QUESTION_ANS = 'SAVE_QUESTION_ANS'
export const RECEIVE_QUESTION = 'RECEIVE_QUESTION'

export function addQuestion(question){
    return{
        type: ADD_QUESTION,
        question
    }
}

export function saveQuestionAns(authedUser, qid, answer){
    return {
        type: SAVE_QUESTION_ANS,
        authedUser,
        qid,
        answer
    }
}

export function receiveQuestion(questions){
    return{
        type: RECEIVE_QUESTION,
        questions
    }

}
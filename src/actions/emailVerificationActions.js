export const FETCH_EMAILVERIFICATION = "FETCH_EMAILVERIFICATION";
export const FETCH_EMAILVERIFICATION_SUCCESS = "FETCH_EMAILVERIFICATION_SUCCESS";
export const FETCH_EMAILVERIFICATION_FAILURE = "FETCH_EMAILVERIFICATION_FAILURE";
export const ADD_EMAILVERIFICATION = "ADD_EMAILVERIFICATION";
export const UPDATE_EMAILVERIFICATION= "UPDATE_EMAILVERIFICATION";
export const DELETE_EMAILVERIFICATION = "DELETE_EMAILVERIFICATION";
export const EMAILVERIFICATION ="EMAILVERIFICATION";

export const getEmailVerifacationBeginAction = () => ({
    type: FETCH_EMAILVERIFICATION,
})
export const getEmailVerifacationSuccessAction = (data) => ({
    type: FETCH_EMAILVERIFICATION_SUCCESS,
    payload:data,
})
export const getEmailVerifacationFailureAction = (error) => ({
    type: FETCH_EMAILVERIFICATION_FAILURE,
    payload:{error},
})
export const addEmailVerifacationAction = (data) => ({
    type: ADD_EMAILVERIFICATION,
    payload: data,
})
export const emailVerifacationAction = (data) => ({
    type: EMAILVERIFICATION,
    payload: data,
})

export const updateEmailVerifacationAction = (data) => ({
    type: UPDATE_EMAILVERIFICATION,
    payload: data,
})
export const deleteEmailVerifacationAction = (data) => ({
    type: DELETE_EMAILVERIFICATION,
    payload: data,
})













export const FETCH_STATE = "FETCH_STATE";
export const FETCH_STATE_SUCCESS = "FETCH_STATE_SUCCESS";
export const FETCH_STATE_FAILURE = "FETCH_STATE_FAILURE";
export const ADD_STATE = "ADD_STATE";
export const UPDATE_STATE = "UPDATE_STATE";
export const DELETE_STATE = "DELETE_STATE";
export const STATE = "STATE";

export const getStateBeginAction = () => ({
    type: FETCH_STATE,
})
export const getStateSuccessAction = (data) => ({
    type: FETCH_STATE_SUCCESS,
    payload:data,
})
export const getStateFailureAction = (error) => ({
    type: FETCH_STATE_FAILURE,
    payload:{error},
})
export const addStateAction = (data) => ({
    type: ADD_STATE,
    payload: data,
})
export const stateAction = (data) => ({
    type: STATE,
    payload: data,
})

export const updateStateAction = (data) => ({
    type: UPDATE_STATE,
    payload: data,
})
export const deleteStateAction = (data) => ({
    type: DELETE_STATE,
    payload: data,
})













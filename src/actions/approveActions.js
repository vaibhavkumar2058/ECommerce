export const FETCH_APPROVE = "FETCH_APPROVE";
export const FETCH_APPROVE_SUCCESS = "FETCH_APPROVE_SUCCESS";
export const FETCH_APPROVE_FAILURE = "FETCH_APPROVE_FAILURE";
export const ADD_APPROVE = "ADD_APPROVE";
export const UPDATE_APPROVE = "UPDATE_APPROVE";
export const DELETE_APPROVE = "DELETE_APPROVE";
export const APPROVE = "APPROVE";

export const getApproveBeginAction = () => ({
    type: FETCH_APPROVE,
})
export const getApproveSuccessAction = (data) => ({
    type: FETCH_APPROVE_SUCCESS,
    payload:data,
})
export const getApproveFailureAction = (error) => ({
    type: FETCH_APPROVE_FAILURE,
    payload:{error},
})
export const addApproveAction = (data) => ({
    type: ADD_APPROVE,
    payload: data,
})
export const approveAction = (data) => ({
    type: APPROVE,
    payload: data,
})

export const updateApproveAction = (data) => ({
    type: UPDATE_APPROVE,
    payload: data,
})
export const deleteApproveAction = (data) => ({
    type: DELETE_APPROVE,
    payload: data,
})













export const FETCH_APPROVE_STATUS = "FETCH_APPROVE_STATUS";
export const FETCH_APPROVE_STATUS_SUCCESS = "FETCH_APPROVE_STATUS_SUCCESS";
export const FETCH_APPROVE_STATUS_FAILURE = "FETCH_APPROVE_STATUS_FAILURE";
export const ADD_APPROVE_STATUS = "ADD_APPROVE_STATUS";
export const UPDATE_APPROVE_STATUS = "UPDATE_APPROVE_STATUS";
export const DELETE_APPROVE_STATUS = "DELETE_APPROVE_STATUS";
export const APPROVE_STATUS = "APPROVE_STATUS   ";

export const getApproveStatusBeginAction = () => ({
    type: FETCH_APPROVE_STATUS,
})
export const getApproveStatusSuccessAction = (data) => ({
    type: FETCH_APPROVE_STATUS_SUCCESS,
    payload:data,
})
export const getApproveStatusFailureAction = (error) => ({
    type: FETCH_APPROVE_STATUS_FAILURE,
    payload:{error},
})
export const addApproveStatusAction = (data) => ({
    type: ADD_APPROVE_STATUS,
    payload: data,
})
export const approveStatusAction = (data) => ({
    type: APPROVE_STATUS,
    payload: data,
})

export const updateApproveStatusAction = (data) => ({
    type: UPDATE_APPROVE_STATUS,
    payload: data,
})
export const deleteApproveStatusAction = (data) => ({
    type: DELETE_APPROVE_STATUS,
    payload: data,
})













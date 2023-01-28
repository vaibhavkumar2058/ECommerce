export const FETCH_SECURITY = "FETCH_SECURITY";
export const FETCH_SECURITY_SUCCESS = "FETCH_SECURITY_SUCCESS";
export const FETCH_SECURITY_FAILURE = "FETCH_SECURITY_FAILURE";
export const ADD_SECURITY = "ADD_SECURITY";
export const UPDATE_SECURITY = "UPDATE_SECURITY";
export const DELETE_SECURITY = "DELETE_SECURITY";
export const SECURITY = "SECURITY";

export const getSecurityBeginAction = () => ({
    type: FETCH_SECURITY,
})
export const getSecuritySuccessAction = (data) => ({
    type: FETCH_SECURITY_SUCCESS,
    payload:data,
})
export const getSecurityFailureAction = (error) => ({
    type: FETCH_SECURITY_FAILURE,
    payload:{error},
})
export const addSecurityAction = (data) => ({
    type: ADD_SECURITY,
    payload: data,
})
export const securityAction = (data) => ({
    type: SECURITY,
    payload: data,
})

export const updateSecurityAction = (data) => ({
    type: UPDATE_SECURITY,
    payload: data,
})
export const deleteSecurityAction = (data) => ({
    type: DELETE_SECURITY,
    payload: data,
})













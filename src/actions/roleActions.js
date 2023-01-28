export const FETCH_ROLE = "FETCH_ROLE";
export const FETCH_ROLE_SUCCESS = "FETCH_ROLE_SUCCESS";
export const FETCH_ROLE_FAILURE = "FETCH_ROLE_FAILURE";
export const ADD_ROLE = "ADD_ROLE";
export const UPDATE_ROLE = "UPDATE_ROLE";
export const DELETE_ROLE = "DELETE_ROLE";
export const ROLE = "ROLE";

export const getRoleBeginAction = () => ({
    type: FETCH_ROLE,
})
export const getRoleSuccessAction = (data) => ({
    type: FETCH_ROLE_SUCCESS,
    payload:data,
})
export const getRoleFailureAction = (error) => ({
    type: FETCH_ROLE_FAILURE,
    payload:{error},
})
export const addRoleAction = (data) => ({
    type: ADD_ROLE,
    payload: data,
})
export const roleAction = (data) => ({
    type: ROLE,
    payload: data,
})

export const updateRoleAction = (data) => ({
    type: UPDATE_ROLE,
    payload: data,
})
export const deleteRoleAction = (data) => ({
    type: DELETE_ROLE,
    payload: data,
})













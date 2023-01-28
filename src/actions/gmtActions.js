export const FETCH_GMT = "FETCH_GMT";
export const FETCH_GMT_SUCCESS = "FETCH_GMT_SUCCESS";
export const FETCH_GMT_FAILURE = "FETCH_GMT_FAILURE";
export const ADD_GMT = "ADD_GMT";
export const UPDATE_GMT= "UPDATE_GMT";
export const DELETE_GMT = "DELETE_GMT";
export const GMT = "GMT";

export const getGMTBeginAction = () => ({
    type: FETCH_GMT,
})
export const getGMTSuccessAction = (data) => ({
    type: FETCH_GMT_SUCCESS,
    payload:data,
})
export const getGMTFailureAction = (error) => ({
    type: FETCH_GMT_FAILURE,
    payload:{error},
})
export const addGMTAction = (data) => ({
    type: ADD_GMT,
    payload: data,
})
export const gmtAction = (data) => ({
    type: GMT,
    payload: data,
})

export const updateGMTAction = (data) => ({
    type: UPDATE_GMT,
    payload: data,
})
export const deleteGMTAction = (data) => ({
    type: DELETE_GMT,
    payload: data,
})













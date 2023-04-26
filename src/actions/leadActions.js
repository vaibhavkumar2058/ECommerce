export const FETCH_LEAD = "FETCH_LEAD";
export const FETCH_LEAD_SUCCESS = "FETCH_LEAD_SUCCESS";
export const FETCH_LEAD_FAILURE = "FETCH_LEAD_FAILURE";
export const ADD_LEAD = "ADD_LEAD";
export const UPDATE_LEAD = "UPDATE_LEAD";
export const DELETE_LEAD = "DELETE_LEAD";
export const LEAD = "LEAD";

export const getLeadBeginAction = () => ({
    type: FETCH_LEAD,
})
export const getLeadSuccessAction = (data) => ({
    type: FETCH_LEAD_SUCCESS,
    payload:data,
})
export const getLeadFailureAction = (error) => ({
    type: FETCH_LEAD_FAILURE,
    payload:{error},
})
export const addLeadAction = (data) => ({
    type: ADD_LEAD,
    payload: data,
})
export const leadAction = (data) => ({
    type: LEAD,
    payload: data,
})

export const updateLeadAction = (data) => ({
    type: UPDATE_LEAD,
    payload: data,
})
export const deleteLeadAction = (data) => ({
    type: DELETE_LEAD,
    payload: data,
})













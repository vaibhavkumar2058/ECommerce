export const FETCH_AGENTTRACKING = "FETCH_AGENTTRACKING";
export const FETCH_AGENTTRACKING_SUCCESS = "FETCH_AGENTTRACKING_SUCCESS";
export const FETCH_AGENTTRACKING_FAILURE = "FETCH_AGENTTRACKING_FAILURE";
export const ADD_AGENTTRACKING = "ADD_AGENTTRACKING";
export const UPDATE_AGENTTRACKING = "UPDATE_AGENTTRACKING";
export const DELETE_AGENTTRACKING = "DELETE_AGENTTRACKING";
export const AGENTTRACKING = "AGENTTRACKING"

export const getAgentTrackingBeginAction = () => ({
    type : FETCH_AGENTTRACKING
})
export const getAgentTrackingSuccessAction = (data) => ({
    type: FETCH_AGENTTRACKING_SUCCESS,
    payload:data,
})
export const getAgentTrackingFailureAction = (error) => ({
    type: FETCH_AGENTTRACKING_FAILURE,
    payload:{error},
})
export const agentTrackingAction = (data) => ({
    type: AGENTTRACKING,
    payload: data,
})
export const addAgentTrackingAction = (data) => ({
    type: ADD_AGENTTRACKING,
    payload: data,
})
export const updateAgentTrackingAction = (data) => ({
    type: UPDATE_AGENTTRACKING,
    payload: data,
})
export const deleteAgentTrackingAction = (data) => ({
    type: DELETE_AGENTTRACKING,
    payload: data,
})

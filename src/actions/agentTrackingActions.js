export const FETCH_AGENTTRACKING = "FETCH_AGENTTRACKING";
export const FETCH_AGENTTRACKING_SUCCESS = "FETCH_AGENTTRACKING_SUCCESS";
export const FETCH_AGENTTRACKING_FAILURE = "FETCH_AGENTTRACKING_FAILURE";
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

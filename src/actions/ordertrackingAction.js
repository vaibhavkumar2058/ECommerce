export const FETCH_ORDERTRACKING = "FETCH_ORDERTRACKING";
export const FETCH_ORDERTRACKING_SUCCESS = "FETCH_ORDERTRACKING_SUCCESS";
export const FETCH_ORDERTRACKING_FAILURE = "FETCH_ORDERTRACKING_FAILURE";
export const ADD_ORDERTRACKING = "ADD_ORDERTRACKING";
export const UPDATE_ORDERTRACKING = "UPDATE_ORDERTRACKING";
export const DELETE_ORDERTRACKING = "DELETE_ORDERTRACKING";
export const ORDERTRACKING = "ORDERTRACKING";

export const getOrdertrackingBeginAction = () => ({
    type: FETCH_ORDERTRACKING,
})
export const getOrdertrackingSuccessAction = (data) => ({
    type: FETCH_ORDERTRACKING_SUCCESS,
    payload:data,
})
export const getOrdertrackingFailureAction = (error) => ({
    type: FETCH_ORDERTRACKING_FAILURE,
    payload:{error},
})
export const addOrdertrackingAction = (data) => ({
    type: ADD_ORDERTRACKING,
    payload: data,
})
export const ordertrackingAction = (data) => ({
    type: ORDERTRACKING,
    payload: data,
})

export const updateOrdertrackingAction = (data) => ({
    type: UPDATE_ORDERTRACKING,
    payload: data,
})
export const deleteOrdertrackingAction = (data) => ({
    type: DELETE_ORDERTRACKING,
    payload: data,
})













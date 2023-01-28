export const FETCH_ORDERTRACKING = "FETCH_ORDERTRACKING";
export const FETCH_ORDERTRACKING_SUCCESS = "FETCH_ORDERTRACKING_SUCCESS";
export const FETCH_ORDERTRACKING_FAILURE = "FETCH_ORDERTRACKING_FAILURE";
export const ADD_ORDERTRACKING = "ADD_ORDERTRACKING";
export const UPDATE_ORDERTRACKING = "UPDATE_ORDERTRACKING";
export const DELETE_ORDERTRACKING = "DELETE_ORDERTRACKING";
export const ORDERTRACKING = "ORDERTRACKING";

export const getOrderTrackingBeginAction = () => ({
    type: FETCH_ORDERTRACKING,
})
export const getOrderTrackingSuccessAction = (data) => ({
    type: FETCH_ORDERTRACKING_SUCCESS,
    payload:data,
})
export const getOrderTrackingFailureAction = (error) => ({
    type: FETCH_ORDERTRACKING_FAILURE,
    payload:{error},
})
export const addOrderTrackingAction = (data) => ({
    type: ADD_ORDERTRACKING,
    payload: data,
})
export const orderTrackingAction = (data) => ({
    type: ORDERTRACKING,
    payload: data,
})

export const updateOrderTrackingAction = (data) => ({
    type: UPDATE_ORDERTRACKING,
    payload: data,
})
export const deleteOrderTrackingAction = (data) => ({
    type: DELETE_ORDERTRACKING,
    payload: data,
})













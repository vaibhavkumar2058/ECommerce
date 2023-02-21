export const FETCH_ORDER_STATUS = "FETCH_ORDER_STATUS";
export const FETCH_ORDER_STATUS_SUCCESS = "FETCH_ORDER_STATUS_SUCCESS";
export const FETCH_ORDER_STATUS_FAILURE = "FETCH_ORDER_STATUS_FAILURE";
export const ADD_ORDER_STATUS = "ADD_ORDER_STATUS";
export const UPDATE_ORDER_STATUS = "UPDATE_ORDER_STATUS";
export const DELETE_ORDER_STATUS = "DELETE_ORDER_STATUS";
export const ORDER_STATUS = "ORDER_STATUS";

export const getOrderStatusBeginAction = () => ({
    type: FETCH_ORDER_STATUS,
})
export const getOrderStatusSuccessAction = (data) => ({
    type: FETCH_ORDER_STATUS_SUCCESS,
    payload:data,
})
export const getOrderStatusFailureAction = (error) => ({
    type: FETCH_ORDER_STATUS_FAILURE,
    payload:{error},
})
export const addOrderStatusAction = (data) => ({
    type: ADD_ORDER_STATUS,
    payload: data,
})
export const orderStatusAction = (data) => ({
    type: ORDER_STATUS,
    payload: data,
})

export const updateOrderStatusAction = (data) => ({
    type: UPDATE_ORDER_STATUS,
    payload: data,
})
export const deleteOrderStatusAction = (data) => ({
    type: DELETE_ORDER_STATUS,
    payload: data,
})













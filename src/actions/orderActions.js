export const FETCH_ORDER = "FETCH_ORDER";
export const FETCH_ORDER_SUCCESS = "FETCH_ORDER_SUCCESS";
export const FETCH_ORDER_FAILURE = "FETCH_ORDER_FAILURE";
export const ADD_ORDER = "ADD_ORDER";
export const UPDATE_ORDER = "UPDATE_ORDER";
export const DELETE_ORDER = "DELETE_ORDER";
export const ORDER = "ORDER";

export const getOrderBeginAction = () => ({
    type: FETCH_ORDER,
})
export const getOrderSuccessAction = (data) => ({
    type: FETCH_ORDER_SUCCESS,
    payload:data,
})
export const getOrderFailureAction = (error) => ({
    type: FETCH_ORDER_FAILURE,
    payload:{error},
})
export const addOrderAction = (data) => ({
    type: ADD_ORDER,
    payload: data,
})
export const orderAction = (data) => ({
    type: ORDER,
    payload: data,
})

export const updateOrderAction = (data) => ({
    type: UPDATE_ORDER,
    payload: data,
})
export const deleteOrderAction = (data) => ({
    type: DELETE_ORDER,
    payload: data,
})













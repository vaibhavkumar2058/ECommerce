export const FETCH_ORDERITEM = "FETCH_ORDERITEM";
export const FETCH_ORDERITEM_SUCCESS = "FETCH_ORDERITEM_SUCCESS";
export const FETCH_ORDERITEM_FAILURE = "FETCH_ORDERITEM_FAILURE";
export const ADD_ORDERITEM = "ADD_ORDERITEM";
export const UPDATE_ORDERITEM = "UPDATE_ORDERITEM";
export const DELETE_ORDERITEM = "DELETE_ORDERITEM";
export const ORDERITEM = "ORDERITEM";

export const getOrderItemBeginAction = () => ({
    type: FETCH_ORDERITEM,
})
export const getOrderItemSuccessAction = (data) => ({
    type: FETCH_ORDERITEM_SUCCESS,
    payload:data,
})
export const getOrderItemFailureAction = (error) => ({
    type: FETCH_ORDERITEM_FAILURE,
    payload:{error},
})
export const addOrderItemAction = (data) => ({
    type: ADD_ORDERITEM,
    payload: data,
})
export const orderItemAction = (data) => ({
    type: ORDERITEM,
    payload: data,
})

export const updateOrderItemAction = (data) => ({
    type: UPDATE_ORDERITEM,
    payload: data,
})
export const deleteOrderItemAction = (data) => ({
    type: DELETE_ORDERITEM,
    payload: data,
})













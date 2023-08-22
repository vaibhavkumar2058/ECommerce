export const FETCH_ITEMCOST = "FETCH_ITEMCOST";
export const FETCH_ITEMCOST_SUCCESS = "FETCH_ITEMCOST_SUCCESS";
export const FETCH_ITEMCOST_FAILURE = "FETCH_ITEMCOST_FAILURE";
export const ADD_ITEMCOST = "ADD_ITEMCOST";
export const UPDATE_ITEMCOST = "UPDATE_ITEMCOST";
export const DELETE_ITEMCOST = "DELETE_ITEMCOST";
export const ITEMCOST = "ITEMCOST";

export const getItemCostBeginAction = () => ({
    type: FETCH_ITEMCOST,
})
export const getItemCostSuccessAction = (data) => ({
    type: FETCH_ITEMCOST_SUCCESS,
    payload:data,
})
export const getItemCostFailureAction = (error) => ({
    type: FETCH_ITEMCOST_FAILURE,
    payload:{error},
})
export const addItemCostAction = (data) => ({
    type: ADD_ITEMCOST,
    payload: data,
})
export const itemCostAction = (data) => ({
    type: ITEMCOST,
    payload: data,
})
export const updateItemCostAction = (data) => ({
    type: UPDATE_ITEMCOST,
    payload: data,
})
export const deleteItemCostAction = (data) => ({
    type: DELETE_ITEMCOST,
    payload: data,
})













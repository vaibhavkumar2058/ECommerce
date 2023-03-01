export const FETCH_TAX = "FETCH_TAX";
export const FETCH_TAX_SUCCESS = "FETCH_TAX_SUCCESS";
export const FETCH_TAX_FAILURE = "FETCH_TAX_FAILURE";
export const ADD_TAX = "ADD_TAX";
export const UPDATE_TAX = "UPDATE_TAX";
export const DELETE_TAX = "DELETE_TAX";
export const TAX = "TAX";

export const getTaxBeginAction = () => ({
    type: FETCH_TAX,
})
export const getTaxSuccessAction = (data) => ({
    type: FETCH_TAX_SUCCESS,
    payload:data,
})
export const getTaxFailureAction = (error) => ({
    type: FETCH_TAX_FAILURE,
    payload:{error},
})
export const addTaxAction = (data) => ({
    type: ADD_TAX,
    payload: data,
})
export const taxAction = (data) => ({
    type: TAX,
    payload: data,
})

export const updateTaxAction = (data) => ({
    type: UPDATE_TAX,
    payload: data,
})
export const deleteTaxAction = (data) => ({
    type: DELETE_TAX,
    payload: data,
})













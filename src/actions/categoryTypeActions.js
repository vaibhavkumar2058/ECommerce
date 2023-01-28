export const FETCH_CATEGORYTYPE = "FETCH_CATEGORYTYPE";
export const FETCH_CATEGORYTYPE_SUCCESS = "FETCH_CATEGORYTYPE_SUCCESS";
export const FETCH_CATEGORYTYPE_FAILURE = "FETCH_CATEGORYTYPE_FAILURE";
export const ADD_CATEGORYTYPE = "ADD_CATEGORYTYPE";
export const UPDATE_CATEGORYTYPE = "UPDATE_CATEGORYTYPE";
export const DELETE_CATEGORYTYPE= "DELETE_CATEGORYTYPE";
export const CATEGORYTYPE = "CATEGORYTYPE";

export const getCategorytypeBeginAction = () => ({
    type: FETCH_CATEGORYTYPE,
})
export const getCategorytypeSuccessAction = (data) => ({
    type: FETCH_CATEGORYTYPE_SUCCESS,
    payload:data,
})
export const getCategorytypeFailureAction = (error) => ({
    type: FETCH_CATEGORYTYPE_FAILURE,
    payload:{error},
})
export const addCategorytypeAction = (data) => ({
    type: ADD_CATEGORYTYPE,
    payload: data,
})
export const categorytypeAction = (data) => ({
    type: CATEGORYTYPE,
    payload: data,
})

export const updateCategorytypeAction = (data) => ({
    type: UPDATE_CATEGORYTYPE,
    payload: data,
})
export const deleteCategorytypeAction = (data) => ({
    type: DELETE_CATEGORYTYPE,
    payload: data,
})













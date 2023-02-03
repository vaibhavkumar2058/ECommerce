export const FETCH_CATEGORYTYPE = "FETCH_CATEGORYTYPE";
export const FETCH_CATEGORYTYPE_SUCCESS = "FETCH_CATEGORYTYPE_SUCCESS";
export const FETCH_CATEGORYTYPE_FAILURE = "FETCH_CATEGORYTYPE_FAILURE";
export const ADD_CATEGORYTYPE = "ADD_CATEGORYTYPE";
export const UPDATE_CATEGORYTYPE = "UPDATE_CATEGORYTYPE";
export const DELETE_CATEGORYTYPE= "DELETE_CATEGORYTYPE";
export const CATEGORYTYPE = "CATEGORYTYPE";

export const getCategoryTypeBeginAction = () => ({
    type: FETCH_CATEGORYTYPE,
})
export const getCategoryTypeSuccessAction = (data) => ({
    type: FETCH_CATEGORYTYPE_SUCCESS,
    payload:data,
})
export const getCategoryTypeFailureAction = (error) => ({
    type: FETCH_CATEGORYTYPE_FAILURE,
    payload:{error},
})
export const addCategoryTypeAction = (data) => ({
    type: ADD_CATEGORYTYPE,
    payload: data,
})
export const categoryTypeAction = (data) => ({
    type: CATEGORYTYPE,
    payload: data,
})

export const updateCategoryTypeAction = (data) => ({
    type: UPDATE_CATEGORYTYPE,
    payload: data,
})
export const deleteCategoryTypeAction = (data) => ({
    type: DELETE_CATEGORYTYPE,
    payload: data,
})
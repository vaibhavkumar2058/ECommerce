export const FETCH_CUSTOM_TYPE = "FETCH_CUSTOM_TYPE";
export const FETCH_CUSTOM_TYPE_SUCCESS = "FETCH_CUSTOM_TYPE_SUCCESS";
export const FETCH_CUSTOM_TYPE_FAILURE = "FETCH_CUSTOM_TYPE_FAILURE";
export const ADD_CUSTOM_TYPE = "ADD_CUSTOM_TYPE";
export const UPDATE_CUSTOM_TYPE = "UPDATE_CUSTOM_TYPE";
export const DELETE_CUSTOM_TYPE = "DELETE_CUSTOM_TYPE";
export const CUSTOM_TYPE = "CUSTOM_TYPE   ";

export const getCustomTypeBeginAction = () => ({
    type: FETCH_CUSTOM_TYPE,
})
export const getCustomTypeSuccessAction = (data) => ({
    type: FETCH_CUSTOM_TYPE_SUCCESS,
    payload:data,
})
export const getCustomTypeFailureAction = (error) => ({
    type: FETCH_CUSTOM_TYPE_FAILURE,
    payload:{error},
})
export const addCustomTypeAction = (data) => ({
    type: ADD_CUSTOM_TYPE,
    payload: data,
})
export const customTypeAction = (data) => ({
    type: CUSTOM_TYPE,
    payload: data,
})

export const updateCustomTypeAction = (data) => ({
    type: UPDATE_CUSTOM_TYPE,
    payload: data,
})
export const deleteCustomTypeAction = (data) => ({
    type: DELETE_CUSTOM_TYPE,
    payload: data,
})













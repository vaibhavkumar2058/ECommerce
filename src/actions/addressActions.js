export const FETCH_ADDRESS = "FETCH_ADDRESS";
export const FETCH_ADDRESS_SUCCESS = "FETCH_ADDRESS_SUCCESS";
export const FETCH_ADDRESS_FAILURE = "FETCH_ADDRESS_FAILURE";
export const ADD_ADDRESS = "ADD_ADDRESS";
export const UPDATE_ADDRESS = "UPDATE_ADDRESS";
export const DELETE_ADDRESS = "DELETE_ADDRESS";
export const ADDRESS = "ADDRESS";

export const getAddressBeginAction = () => ({
    type: FETCH_ADDRESS,
})
export const getAddressSuccessAction = (data) => ({
    type: FETCH_ADDRESS_SUCCESS,
    payload:data,
})
export const getAddressFailureAction = (error) => ({
    type: FETCH_ADDRESS_FAILURE,
    payload:{error},
})
export const addAddressAction = (data) => ({
    type: ADD_ADDRESS,
    payload: data,
})
export const addressAction = (data) => ({
    type: ADDRESS,
    payload: data,
})
export const updateAddressAction = (data) => ({
    type: UPDATE_ADDRESS,
    payload: data,
})
export const deleteAddressAction = (data) => ({
    type: DELETE_ADDRESS,
    payload: data,
})

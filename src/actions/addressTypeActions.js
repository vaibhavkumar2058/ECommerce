export const FETCH_ADDRESS_TYPE = "FETCH_ADDRESS_TYPE";
export const FETCH_ADDRESS_TYPE_SUCCESS = "FETCH_ADDRESS_TYPE_SUCCESS";
export const FETCH_ADDRESS_TYPE_FAILURE = "FETCH_ADDRESS_TYPE_FAILURE";
export const ADD_ADDRESS_TYPE = "ADD_ADDRESS_TYPE";
export const UPDATE_ADDRESS_TYPE = "UPDATE_ADDRESS_TYPE";
export const DELETE_ADDRESS_TYPE = "DELETE_ADDRESS_TYPE";
export const ADDRESS_TYPE = "ADDRESS_TYPE   ";

export const getAddressTypeBeginAction = () => ({
    type: FETCH_ADDRESS_TYPE,
})
export const getAddressTypeSuccessAction = (data) => ({
    type: FETCH_ADDRESS_TYPE_SUCCESS,
    payload:data,
})
export const getAddressTypeFailureAction = (error) => ({
    type: FETCH_ADDRESS_TYPE_FAILURE,
    payload:{error},
})
export const addAddressTypeAction = (data) => ({
    type: ADD_ADDRESS_TYPE,
    payload: data,
})
export const addressTypeAction = (data) => ({
    type: ADDRESS_TYPE,
    payload: data,
})

export const updateAddressTypeAction = (data) => ({
    type: UPDATE_ADDRESS_TYPE,
    payload: data,
})
export const deleteAddressTypeAction = (data) => ({
    type: DELETE_ADDRESS_TYPE,
    payload: data,
})













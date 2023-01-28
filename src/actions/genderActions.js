export const FETCH_GENDER = "FETCH_GENDER";
export const FETCH_GENDER_SUCCESS = "FETCH_GENDER_SUCCESS";
export const FETCH_GENDER_FAILURE = "FETCH_GENDER_FAILURE";
export const ADD_GENDER = "ADD_GENDER";
export const UPDATE_GENDER = "UPDATE_GENDER";
export const DELETE_GENDER = "DELETE_GENDER";
export const GENDER = "GENDER";

export const getGenderBeginAction = () => ({
    type: FETCH_GENDER,
})
export const getGenderSuccessAction = (data) => ({
    type: FETCH_GENDER_SUCCESS,
    payload:data,
})
export const getGenderFailureAction = (error) => ({
    type: FETCH_GENDER_FAILURE,
    payload:{error},
})
export const addGenderAction = (data) => ({
    type: ADD_GENDER,
    payload: data,
})
export const genderAction = (data) => ({
    type: GENDER,
    payload: data,
})

export const updateGenderAction = (data) => ({
    type: UPDATE_GENDER,
    payload: data,
})
export const deleteGenderAction = (data) => ({
    type: DELETE_GENDER,
    payload: data,
})













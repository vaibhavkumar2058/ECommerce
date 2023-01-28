export const FETCH_COUNTRY = "FETCH_COUNTRY";
export const FETCH_COUNTRY_SUCCESS = "FETCH_COUNTRY_SUCCESS";
export const FETCH_COUNTRY_FAILURE = "FETCH_COUNTRY_FAILURE";
export const ADD_COUNTRY = "ADD_COUNTRY";
export const UPDATE_COUNTRY= "UPDATE_COUNTRY";
export const DELETE_COUNTRY = "DELETE_COUNTRY";
export const COUNTRY ="COUNTRY";

export const getCountryBeginAction = () => ({
    type: FETCH_COUNTRY,
})
export const getCountrySuccessAction = (data) => ({
    type: FETCH_COUNTRY_SUCCESS,
    payload:data,
})
export const getCountryFailureAction = (error) => ({
    type: FETCH_COUNTRY_FAILURE,
    payload:{error},
})
export const addCountryAction = (data) => ({
    type: ADD_COUNTRY,
    payload: data,
})
export const countryAction = (data) => ({
    type: COUNTRY,
    payload: data,
})

export const updateCountryAction = (data) => ({
    type: UPDATE_COUNTRY,
    payload: data,
})
export const deleteCountryAction = (data) => ({
    type: DELETE_COUNTRY,
    payload: data,
})













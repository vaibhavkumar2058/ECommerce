export const FETCH_MEASUREMENTVALUE = "FETCH_MEASUREMENTVALUE";
export const FETCH_MEASUREMENTVALUE_SUCCESS = "FETCH_MEASUREMENTVALUE_SUCCESS";
export const FETCH_MEASUREMENTVALUE_FAILURE = "FETCH_MEASUREMENTVALUE_FAILURE";
export const ADD_MEASUREMENTVALUE = "ADD_MEASUREMENTVALUE";
export const UPDATE_MEASUREMENTVALUE = "UPDATE_MEASUREMENTVALUE";
export const DELETE_MEASUREMENTVALUE = "DELETE_MEASUREMENTVALUE";
export const MEASUREMENTVALUE = "MEASUREMENTVALUE";

export const getMeasurementValueBeginAction = () => ({
    type: FETCH_MEASUREMENTVALUE,
})
export const getMeasurementValueSuccessAction = (data) => ({
    type: FETCH_MEASUREMENTVALUE_SUCCESS,
    payload:data,
})
export const getMeasurementValueFailureAction = (error) => ({
    type: FETCH_MEASUREMENTVALUE_FAILURE,
    payload:{error},
})
export const addMeasurementValueAction = (data) => ({
    type: ADD_MEASUREMENTVALUE,
    payload: data,
})
export const measurementValueAction = (data) => ({
    type: MEASUREMENTVALUE,
    payload: data,
})

export const updateMeasurementValueAction = (data) => ({
    type: UPDATE_MEASUREMENTVALUE,
    payload: data,
})
export const deleteMeasurementValueAction = (data) => ({
    type: DELETE_MEASUREMENTVALUE,
    payload: data,
})













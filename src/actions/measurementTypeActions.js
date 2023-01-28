export const FETCH_MEASUREMENTTYPE = "FETCH_MEASUREMENTTYPE";
export const FETCH_MEASUREMENTTYPE_SUCCESS = "FETCH_MEASUREMENTTYPE_SUCCESS";
export const FETCH_MEASUREMENTTYPE_FAILURE = "FETCH_MEASUREMENTTYPE_FAILURE";
export const ADD_MEASUREMENTTYPE = "ADD_MEASUREMENTTYPE";
export const UPDATE_MEASUREMENTTYPE = "UPDATE_MEASUREMENTTYPE";
export const DELETE_MEASUREMENTTYPE = "DELETE_MEASUREMENTTYPE";
export const MEASUREMENTTYPE = "MEASUREMENTTYPE";

export const getMeasurementTypeBeginAction = () => ({
    type: FETCH_MEASUREMENTTYPE,
})
export const getMeasurementTypeSuccessAction = (data) => ({
    type: FETCH_MEASUREMENTTYPE_SUCCESS,
    payload:data,
})
export const getMeasurementTypeFailureAction = (error) => ({
    type: FETCH_MEASUREMENTTYPE_FAILURE,
    payload:{error},
})
export const addMeasurementTypeAction = (data) => ({
    type: ADD_MEASUREMENTTYPE,
    payload: data,
})
export const measurementTypeAction = (data) => ({
    type: MEASUREMENTTYPE,
    payload: data,
})

export const updateMeasurementTypeAction = (data) => ({
    type: UPDATE_MEASUREMENTTYPE,
    payload: data,
})
export const deleteMeasurementTypeAction = (data) => ({
    type: DELETE_MEASUREMENTTYPE,
    payload: data,
})













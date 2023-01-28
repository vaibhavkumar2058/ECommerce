export const FETCH_RECORD_STATUS = "FETCH_RECORD_STATUS";
export const FETCH_RECORD_STATUS_SUCCESS = "FETCH_RECORD_STATUS_SUCCESS";
export const FETCH_RECORD_STATUS_FAILURE = "FETCH_RECORD_STATUS_FAILURE";
export const ADD_RECORD_STATUS = "ADD_RECORD_STATUS";
export const UPDATE_RECORD_STATUS = "UPDATE_RECORD_STATUS";
export const DELETE_RECORD_STATUS = "DELETE_RECORD_STATUS";
export const RECORD_STATUS = "RECORD_STATUS";

export const getRecordStatusBeginAction = () => ({
    type: FETCH_RECORD_STATUS,
})
export const getRecordStatusSuccessAction = (data) => ({
    type: FETCH_RECORD_STATUS_SUCCESS,
    payload:data,
})
export const getRecordStatusFailureAction = (error) => ({
    type: FETCH_RECORD_STATUS_FAILURE,
    payload:{error},
})
export const addRecordStatusAction = (data) => ({
    type: ADD_RECORD_STATUS,
    payload: data,
})
export const recordStatusAction = (data) => ({
    type: RECORD_STATUS,
    payload: data,
})

export const updateRecordStatusAction = (data) => ({
    type: UPDATE_RECORD_STATUS,
    payload: data,
})
export const deleteRecordStatusAction = (data) => ({
    type: DELETE_RECORD_STATUS,
    payload: data,
})













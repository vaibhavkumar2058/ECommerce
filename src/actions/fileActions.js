export const FETCH_FILE = "FETCH_FILE";
export const FETCH_FILE_SUCCESS = "FETCH_FILE_SUCCESS";
export const FETCH_FILE_FAILURE = "FETCH_FILE_FAILURE";
export const ADD_FILE = "ADD_FILE";
export const UPDATE_FILE = "UPDATE_FILE";
export const DELETE_FILE = "DELETE_FILE";
export const FILE = "FILE";

export const getFileBeginAction = () => ({
    type: FETCH_FILE,
})
export const getFileSuccessAction = (data) => ({
    type: FETCH_FILE_SUCCESS,
    payload:data,
})
export const getFileFailureAction = (error) => ({
    type: FETCH_FILE_FAILURE,
    payload:{error},
})
export const addFileAction = (data) => ({
    type: ADD_FILE,
    payload: data,
})
export const fileAction = (data) => ({
    type: FILE,
    payload: data,
})

export const updateFileAction = (data) => ({
    type: UPDATE_FILE,
    payload: data,
})
export const deleteFileAction = (data) => ({
    type: DELETE_FILE,
    payload: data,
})













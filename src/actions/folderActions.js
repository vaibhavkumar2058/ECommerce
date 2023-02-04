export const FETCH_FOLDER = "FETCH_FOLDER";
export const FETCH_FOLDER_SUCCESS = "FETCH_FOLDER_SUCCESS";
export const FETCH_FOLDER_FAILURE = "FETCH_FOLDER_FAILURE";
export const ADD_FOLDER = "ADD_FOLDER";
export const UPDATE_FOLDER = "UPDATE_FOLDER";
export const DELETE_FOLDER = "DELETE_FOLDER";
export const FOLDER = "FOLDER";

export const getFolderBeginAction = () => ({
    type: FETCH_FOLDER,
})
export const getFolderSuccessAction = (data) => ({
    type: FETCH_FOLDER_SUCCESS,
    payload:data,
})
export const getFolderFailureAction = (error) => ({
    type: FETCH_FOLDER_FAILURE,
    payload:{error},
})
export const addFolderAction = (data) => ({
    type: ADD_FOLDER,
    payload: data,
})
export const folderAction = (data) => ({
    type: FOLDER,
    payload: data,
})

export const updateFolderAction = (data) => ({
    type: UPDATE_FOLDER,
    payload: data,
})
export const deleteFolderAction = (data) => ({
    type: DELETE_FOLDER,
    payload: data,
})













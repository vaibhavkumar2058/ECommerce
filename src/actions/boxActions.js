export const FETCH_BOX = "FETCH_BOX";
export const FETCH_BOX_SUCCESS = "FETCH_BOX_SUCCESS";
export const FETCH_BOX_FAILURE = "FETCH_BOX_FAILURE";
export const ADD_BOX = "ADD_BOX";
export const UPDATE_BOX = "UPDATE_BOX";
export const DELETE_BOX = "DELETE_BOX";
export const BOX = "BOX";

export const getBoxBeginAction = () => ({
    type: FETCH_BOX,
})
export const getBoxSuccessAction = (data) => ({
    type: FETCH_BOX_SUCCESS,
    payload:data,
})
export const getBoxFailureAction = (error) => ({
    type: FETCH_BOX_FAILURE,
    payload:{error},
})
export const addBoxAction = (data) => ({
    type: ADD_BOX,
    payload: data,
})
export const boxAction = (data) => ({
    type: BOX,
    payload: data,
})

export const updateBoxAction = (data) => ({
    type: UPDATE_BOX,
    payload: data,
})
export const deleteBoxAction = (data) => ({
    type: DELETE_BOX,
    payload: data,
})










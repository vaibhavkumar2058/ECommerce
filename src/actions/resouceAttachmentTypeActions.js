export const FETCH_RESOURCEATTACHMENTTYPE = "FETCH_RESOURCEATTACHMENTTYPE";
export const FETCH_RESOURCEATTACHMENTTYPE_SUCCESS = "FETCH_RESOURCEATTACHMENTTYPE_SUCCESS";
export const FETCH_RESOURCEATTACHMENTTYPE_FAILURE = "FETCH_RESOURCEATTACHMENTTYPE_FAILURE";
export const ADD_RESOURCEATTACHMENTTYPE = "ADD_RESOURCEATTACHMENTTYPE";
export const UPDATE_RESOURCEATTACHMENTTYPE = "UPDATE_RESOURCEATTACHMENTTYPE";
export const DELETE_RESOURCEATTACHMENTTYPE = "DELETE_RESOURCEATTACHMENTTYPE";
export const RESOURCEATTACHMENTTYPE = "RESOURCEATTACHMENTTYPE";

export const getResouceAttachmentTypeBeginAction = () => ({
    type: FETCH_RESOURCEATTACHMENTTYPE,
})
export const getResouceAttachmentTypeSuccessAction = (data) => ({
    type: FETCH_RESOURCEATTACHMENTTYPE_SUCCESS,
    payload:data,
})
export const getResouceAttachmentTypeFailureAction = (error) => ({
    type: FETCH_RESOURCEATTACHMENTTYPE_FAILURE,
    payload:{error},
})
export const addResouceAttachmentTypeAction = (data) => ({
    type: ADD_RESOURCEATTACHMENTTYPE,
    payload: data,
})
export const resouceAttachmentTypeAction = (data) => ({
    type: RESOURCEATTACHMENTTYPE,
    payload: data,
})

export const updateResouceAttachmentTypeAction = (data) => ({
    type: UPDATE_RESOURCEATTACHMENTTYPE,
    payload: data,
})
export const deleteResouceAttachmentTypeAction = (data) => ({
    type: DELETE_RESOURCEATTACHMENTTYPE,
    payload: data,
})













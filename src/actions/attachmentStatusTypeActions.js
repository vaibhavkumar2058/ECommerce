export const FETCH_ATTACHMENTSTATUSTYPE = "FETCH_ATTACHMENTSTATUSTYPE";
export const FETCH_ATTACHMENTSTATUSTYPE_SUCCESS = "FETCH_ATTACHMENTSTATUSTYPE_SUCCESS";
export const FETCH_ATTACHMENTSTATUSTYPE_FAILURE = "FETCH_ATTACHMENTSTATUSTYPE_FAILURE";
export const ADD_ATTACHMENTSTATUSTYPE = "ADD_ATTACHMENTSTATUSTYPE";
export const UPDATE_ATTACHMENTSTATUSTYPE = "UPDATE_ATTACHMENTSTATUSTYPE";
export const DELETE_ATTACHMENTSTATUSTYPE = "DELETE_ATTACHMENTSTATUSTYPE";
export const ATTACHMENTSTATUSTYPE = "ATTACHMENTSTATUSTYPE";

export const getAttachmentStatusTypeBeginAction = () => ({
    type: FETCH_ATTACHMENTSTATUSTYPE,
})
export const getAttachmentStatusTypeSuccessAction = (data) => ({
    type: FETCH_ATTACHMENTSTATUSTYPE_SUCCESS,
    payload:data,
})
export const getAttachmentStatusTypeFailureAction = (error) => ({
    type: FETCH_ATTACHMENTSTATUSTYPE_FAILURE,
    payload:{error},
})
export const addAttachmentStatusTypeAction = (data) => ({
    type: ADD_ATTACHMENTSTATUSTYPE,
    payload: data,
})
export const attachmentStatusTypeAction = (data) => ({
    type: ATTACHMENTSTATUSTYPE,
    payload: data,
})

export const updateAttachmentStatusTypeAction = (data) => ({
    type: UPDATE_ATTACHMENTSTATUSTYPE,
    payload: data,
})
export const deleteAttachmentStatusTypeAction = (data) => ({
    type: DELETE_ATTACHMENTSTATUSTYPE,
    payload: data,
})













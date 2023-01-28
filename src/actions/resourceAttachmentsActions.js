export const FETCH_RESOURCE_ATTACHMENTS = "FETCH_RESOURCE_ATTACHMENTS";
export const FETCH_RESOURCE_ATTACHMENTS_SUCCESS = "FETCH_RESOURCE_ATTACHMENTS_SUCCESS";
export const FETCH_RESOURCE_ATTACHMENTS_FAILURE = "FETCH_RESOURCE_ATTACHMENTS_FAILURE";
export const ADD_RESOURCE_ATTACHMENTS = "ADD_RESOURCE_ATTACHMENTS";
export const UPDATE_RESOURCE_ATTACHMENTS = "UPDATE_RESOURCE_ATTACHMENTS";
export const DELETE_RESOURCE_ATTACHMENTS = "DELETE_RESOURCE_ATTACHMENTS";
export const RESOURCE_ATTACHMENTS = "RESOURCE_ATTACHMENTS";

export const getResourceAttachmentsBeginAction = () => ({
    type: FETCH_RESOURCE_ATTACHMENTS,
})
export const getResourceAttachmentsSuccessAction = (data) => ({
    type: FETCH_RESOURCE_ATTACHMENTS_SUCCESS,
    payload:data,
})
export const getResourceAttachmentsFailureAction = (error) => ({
    type: FETCH_RESOURCE_ATTACHMENTS_FAILURE,
    payload:{error},
})
export const addResourceAttachmentsAction = (data) => ({
    type: ADD_RESOURCE_ATTACHMENTS,
    payload: data,
})
export const resourceAttachmentsAction = (data) => ({
    type: RESOURCE_ATTACHMENTS,
    payload: data,
})

export const updateResourceAttachmentsAction = (data) => ({
    type: UPDATE_RESOURCE_ATTACHMENTS,
    payload: data,
})
export const deleteResourceAttachmentsAction = (data) => ({
    type: DELETE_RESOURCE_ATTACHMENTS,
    payload: data,
})













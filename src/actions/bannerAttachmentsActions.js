export const FETCH_BANNER_ATTACHMENTS = "FETCH_BANNER_ATTACHMENTS";
export const FETCH_BANNER_ATTACHMENTS_SUCCESS = "FETCH_BANNER_ATTACHMENTS_SUCCESS";
export const FETCH_BANNER_ATTACHMENTS_FAILURE = "FETCH_BANNER_ATTACHMENTS_FAILURE";
export const ADD_BANNER_ATTACHMENTS = "ADD_BANNER_ATTACHMENTS";
export const UPDATE_BANNER_ATTACHMENTS = "UPDATE_BANNER_ATTACHMENTS";
export const DELETE_BANNER_ATTACHMENTS = "DELETE_BANNER_ATTACHMENTS";
export const BANNER_ATTACHMENTS = "BANNER_ATTACHMENTS";

export const getBannerAttachmentsBeginAction = () => ({
    type: FETCH_BANNER_ATTACHMENTS,
})
export const getBannerAttachmentsSuccessAction = (data) => ({
    type: FETCH_BANNER_ATTACHMENTS_SUCCESS,
    payload:data,
})
export const getBannerAttachmentsFailureAction = (error) => ({
    type: FETCH_BANNER_ATTACHMENTS_FAILURE,
    payload:{error},
})
export const addBannerAttachmentsAction = (data) => ({
    type: ADD_BANNER_ATTACHMENTS,
    payload: data,
})
export const bannerAttachmentsAction = (data) => ({
    type: BANNER_ATTACHMENTS,
    payload: data,
})

export const updateBannerAttachmentsAction = (data) => ({
    type: UPDATE_BANNER_ATTACHMENTS,
    payload: data,
})
export const deleteBannerAttachmentsAction = (data) => ({
    type: DELETE_BANNER_ATTACHMENTS,
    payload: data,
})













export const FETCH_PRODUCT_ATTACHMENTS = "FETCH_PRODUCT_ATTACHMENTS";
export const FETCH_PRODUCT_ATTACHMENTS_SUCCESS = "FETCH_PRODUCT_ATTACHMENTS_SUCCESS";
export const FETCH_PRODUCT_ATTACHMENTS_FAILURE = "FETCH_PRODUCT_ATTACHMENTS_FAILURE";
export const ADD_PRODUCT_ATTACHMENTS = "ADD_PRODUCT_ATTACHMENTS";
export const UPDATE_PRODUCT_ATTACHMENTS = "UPDATE_PRODUCT_ATTACHMENTS";
export const DELETE_PRODUCT_ATTACHMENTS = "DELETE_PRODUCT_ATTACHMENTS";
export const PRODUCT_ATTACHMENTS = "PRODUCT_ATTACHMENTS";

export const getProductAttachmentsBeginAction = () => ({
    type: FETCH_PRODUCT_ATTACHMENTS,
})
export const getProductAttachmentsSuccessAction = (data) => ({
    type: FETCH_PRODUCT_ATTACHMENTS_SUCCESS,
    payload:data,
})
export const getProductAttachmentsFailureAction = (error) => ({
    type: FETCH_PRODUCT_ATTACHMENTS_FAILURE,
    payload:{error},
})
export const addProductAttachmentsAction = (data) => ({
    type: ADD_PRODUCT_ATTACHMENTS,
    payload: data,
})
export const productAttachmentsAction = (data) => ({
    type: PRODUCT_ATTACHMENTS,
    payload: data,
})

export const updateProductAttachmentsAction = (data) => ({
    type: UPDATE_PRODUCT_ATTACHMENTS,
    payload: data,
})
export const deleteProductAttachmentsAction = (data) => ({
    type: DELETE_PRODUCT_ATTACHMENTS,
    payload: data,
})













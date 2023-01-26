export const FETCH_ENQUIRY = "FETCH_ENQUIRY";
export const FETCH_ENQUIRY_SUCCESS = "FETCH_ENQUIRY_SUCCESS";
export const FETCH_ENQUIRY_FAILURE = "FETCH_ENQUIRY_FAILURE";
export const ADD_ENQUIRY = "ADD_ENQUIRY";
export const UPDATE_ENQUIRY = "UPDATE_ENQUIRY";
export const DELETE_ENQUIRY = "DELETE_ENQUIRY";
export const ENQUIRY = "ENQUIRY";

export const getEnquiryBeginAction = () => ({
    type: FETCH_ENQUIRY,
})
export const getEnquirySuccessAction = (data) => ({
    type: FETCH_ENQUIRY_SUCCESS,
    payload:data,
})
export const getEnquiryFailureAction = (error) => ({
    type: FETCH_ENQUIRY_FAILURE,
    payload:{error},
})
export const addEnquiryAction = (data) => ({
    type: ADD_ENQUIRY,
    payload: data,
})
export const enquiryAction = (data) => ({
    type: ENQUIRY,
    payload: data,
})

export const updateEnquiryAction = (data) => ({
    type: UPDATE_ENQUIRY,
    payload: data,
})
export const deleteEnquiryAction = (data) => ({
    type: DELETE_ENQUIRY,
    payload: data,
})













export const FETCH_INVOICE = "FETCH_INVOICE";
export const FETCH_INVOICE_SUCCESS = "FETCH_INVOICE_SUCCESS";
export const FETCH_INVOICE_FAILURE = "FETCH_INVOICE_FAILURE";
export const ADD_INVOICE = "ADD_INVOICE";
export const UPDATE_INVOICE = "UPDATE_INVOICE";
export const DELETE_INVOICE = "DELETE_INVOICE";
export const INVOICE = "INVOICE";

export const getInvoiceBeginAction = () => ({
    type: FETCH_INVOICE,
})
export const getInvoiceSuccessAction = (data) => ({
    type: FETCH_INVOICE_SUCCESS,
    payload:data,
})
export const getInvoiceFailureAction = (error) => ({
    type: FETCH_INVOICE_FAILURE,
    payload:{error},
})
export const addInvoiceAction = (data) => ({
    type: ADD_INVOICE,
    payload: data,
})
export const invoiceAction = (data) => ({
    type: INVOICE,
    payload: data,
})

export const updateInvoiceAction = (data) => ({
    type: UPDATE_INVOICE,
    payload: data,
})
export const deleteInvoiceAction = (data) => ({
    type: DELETE_INVOICE,
    payload: data,
})













export const FETCH_PRODUCT = "FETCH_PRODUCT";
export const FETCH_PRODUCT_SUCCESS = "FETCH_PRODUCT_SUCCESS";
export const FETCH_PRODUCT_FAILURE = "FETCH_PRODUCT_FAILURE";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const PRODUCT = "PRODUCT";

export const getProductBeginAction = () => ({
    type: FETCH_PRODUCT,
})
export const getProductSuccessAction = (data) => ({
    type: FETCH_PRODUCT_SUCCESS,
    payload:data,
})
export const getProductFailureAction = (error) => ({
    type: FETCH_PRODUCT_FAILURE,
    payload:{error},
})
export const addProductAction = (data) => ({
    type: ADD_PRODUCT,
    payload: data,
})
export const productAction = (data) => ({
    type: PRODUCT,
    payload: data,
})

export const updateProductAction = (data) => ({
    type: UPDATE_PRODUCT,
    payload: data,
})
export const deleteProductAction = (data) => ({
    type: DELETE_PRODUCT,
    payload: data,
})













export const FETCH_DISCOUNT = "FETCH_DISCOUNT";
export const FETCH_DISCOUNT_SUCCESS = "FETCH_DISCOUNT_SUCCESS";
export const FETCH_DISCOUNT_FAILURE = "FETCH_DISCOUNT_FAILURE";
export const ADD_DISCOUNT = "ADD_DISCOUNT";
export const UPDATE_DISCOUNT = "UPDATE_DISCOUNT";
export const DELETE_DISCOUNT = "DELETE_DISCOUNT";
export const DISCOUNT = "DISCOUNT";

export const getDiscountBeginAction = () => ({
    type: FETCH_DISCOUNT,
})

export const getDiscountSuccessAction = (data) => ({
    type: FETCH_DISCOUNT_SUCCESS,
    payload: data,
})

export const getDiscountFailureAction = (error) => ({
    type: FETCH_DISCOUNT_FAILURE,
    payload: { error },
})

export const addDiscountAction = (data) => ({
    type: ADD_DISCOUNT,
    payload: data,
})

export const discountAction = (data) => ({
    type: DISCOUNT,
    payload: data,
})

export const updateDiscountAction = (data) => ({
    type: UPDATE_DISCOUNT,
    payload: data,
})
export const deleteDiscountAction = (data) => ({
    type: DELETE_DISCOUNT,
    payload: data,
})

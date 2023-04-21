export const FETCH_DISCOUNTTYPE = "FETCH_DISCOUNTTYPE";
export const FETCH_DISCOUNTTYPE_SUCCESS = "FETCH_DISCOUNTTYPE_SUCCESS";
export const FETCH_DISCOUNTTYPE_FAILURE = "FETCH_DISCOUNTTYPE_FAILURE";
export const ADD_DISCOUNTTYPE = "ADD_DISCOUNTTYPE";
export const UPDATE_DISCOUNTTYPE = "UPDATE_DISCOUNTTYPE";
export const DELETE_DISCOUNTTYPE = "DELETE_DISCOUNTTYPE";
export const DISCOUNTTYPE = "DISCOUNTTYPE";

export const getDiscountTypeBeginAction = () => ({
    type: FETCH_DISCOUNTTYPE,
})
export const getDiscountTypeSuccessAction = (data) => ({
    type: FETCH_DISCOUNTTYPE_SUCCESS,
    payload:data,
})
export const getDiscountTypeFailureAction = (error) => ({
    type: FETCH_DISCOUNTTYPE_FAILURE,
    payload:{error},
})
export const addDiscountTypeAction = (data) => ({
    type: ADD_DISCOUNTTYPE,
    payload: data,
})
export const discountTypeAction = (data) => ({
    type: DISCOUNTTYPE,
    payload: data,
})

export const updateDiscountTypeAction = (data) => ({
    type: UPDATE_DISCOUNTTYPE,
    payload: data,
})
export const deleteDiscountTypeAction = (data) => ({
    type: DELETE_DISCOUNTTYPE,
    payload: data,
})













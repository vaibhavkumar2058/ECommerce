export const FETCH_DISCOUNT_TYPE = "FETCH_DISCOUNT_TYPE";
export const FETCH_DISCOUNT_TYPE_SUCCESS = "FETCH_DISCOUNT_TYPE_SUCCESS";
export const FETCH_DISCOUNT_TYPE_FAILURE = "FETCH_DISCOUNT_TYPE_FAILURE";
export const ADD_DISCOUNT_TYPE = "ADD_DISCOUNT_TYPE";
export const UPDATE_DISCOUNT_TYPE = "UPDATE_DISCOUNT_TYPE";
export const DELETE_DISCOUNT_TYPE = "DELETE_DISCOUNT_TYPE";
export const DISCOUNT_TYPE = "DISCOUNT_TYPE";
 
export const getDiscountTypeBeginAction = () => ({
    type: FETCH_DISCOUNT_TYPE,
})

export const getDiscountTypeSuccessAction = (data) => ({
    type: FETCH_DISCOUNT_TYPE_SUCCESS,
    payload: data,
})

export const getDiscountTypeFailureAction = (error) => ({
    type: FETCH_DISCOUNT_TYPE_FAILURE,
    payload: { error },
})

export const addDiscountTypeAction = (data) => ({
    type: ADD_DISCOUNT_TYPE,
    payload: data,
})

export const discountTypeAction = (data) => ({
    type: DISCOUNT_TYPE,
    payload: data,
})

export const updateDiscountTypeAction = (data) => ({
    type: UPDATE_DISCOUNT_TYPE,
    payload: data,
})
export const deleteDiscountTypeAction = (data) => ({
    type: DELETE_DISCOUNT_TYPE,
    payload: data,
})




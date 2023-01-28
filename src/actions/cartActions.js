export const FETCH_CART = "FETCH_CART";
export const FETCH_CART_SUCCESS = "FETCH_CART_SUCCESS";
export const FETCH_CART_FAILURE = "FETCH_CART_FAILURE";
export const ADD_CART = "ADD_CART";
export const UPDATE_CART = "UPDATE_CART";
export const DELETE_CART = "DELETE_CART";
export const CART = "CART";

export const getCartBeginAction = () => ({
    type: FETCH_CART,
})
export const getCartSuccessAction = (data) => ({
    type: FETCH_CART_SUCCESS,
    payload:data,
})
export const getCartFailureAction = (error) => ({
    type: FETCH_CART_FAILURE,
    payload:{error},
})
export const addCartAction = (data) => ({
    type: ADD_CART,
    payload: data,
})
export const cartAction = (data) => ({
    type: CART,
    payload: data,
})

export const updateCartAction = (data) => ({
    type: UPDATE_CART,
    payload: data,
})
export const deleteCartAction = (data) => ({
    type: DELETE_CART,
    payload: data,
})












